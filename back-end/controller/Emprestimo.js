import emprestimo from "../model/EmprestimoModel.js";
import livro from "../model/LivroModel.js";
import pessoa from "../model/PessoaModel.js";
import banco from "../banco.js";
import moment from 'moment';
import { Op } from 'sequelize'; 



async function alterar(req, res){
    if (!req.body.idlivro)
        res.status(500).send("Parâmetro idlivro é obrigatório.");
    else if (!req.body.idpessoa)
        res.status(500).send("Parâmetro idpessoa é obrigatório.");
    else if (!req.body.emprestimo) 
        res.status(500).send("Parâmetro emprestimo é obrigatório.");
    else if (!req.body.vencimento)
        res.status(500).send("Parâmetro Vencimento é obrigatório.");
    else
    
        await emprestimo
        .update({ 
            idlivro: req.body.idlivro,
            idpessoa: req.body.idpessoa,
            emprestimo: req.body.emprestimo,
            vencimento: req.body.vencimento,
            devolucao: req.body.devolucao
        },
        {
            where:  {
                idemprestimo: req.params.idemprestimo}
        })
        .then(resultado => { res.status(200).json(resultado)} )
        .catch(erro => { res.status(500).json(erro) });
};


async function selecionar(req, res){
    await emprestimo
    .findByPk(req.params.idemprestimo)
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};


async function listarTodos(req, res) {
    await emprestimo
        .findAll({
            include: [
                { model: livro, attributes: ['titulo'], as: 'livro' },
                { model: pessoa, attributes: ['pessoa'], as: 'pessoa' }
            ],
            order: [['emprestimo', 'ASC']] // Ordena por emprestimo em ordem ascendente (ASC)
        })
        .then(resultado => { res.status(200).json(resultado)} )
        .catch(erro => { res.status(500).json(erro) });
};




async function emprestar(req, res) {
    //Pegando a data atual
    let hoje = moment().format("YYYY-MM-DD");

    //Calculando a data de vencimento, acrescentando 15 dias na data atual
    let venc = moment().add(7, 'days').format('YYYY-MM-DD');

    const emprestimosAtivos = await emprestimo.count({
        where: {
            idpessoa: req.body.idpessoa,
            devolucao: null
        }
    });
    
    if (emprestimosAtivos >= 3) {
        return res.status(400).json({ "mensagem": "Esta pessoa já atingiu o limite de 3 empréstimos ativos." });
    }

    //Validar se o livro já está emprestado
    const livroSelecionado = await livro.findByPk(req.body.idlivro);
    if (livroSelecionado.emprestado) {
        res.status(400).json({ "mensagem": "Este livro já está emprestado." });
        return;
    }

    const emprestimosAtrasados = await emprestimo.findAll({
        where: {
            idpessoa: req.body.idpessoa,
            devolucao: null,
            vencimento: {
                [Op.lt]: hoje
            }
        }
    });

    if (emprestimosAtrasados.length > 0) {
        return res.status(400).json({ "mensagem": "Esta pessoa possui empréstimos em atraso e não pode realizar novos empréstimos." });
    }


    //Iniciando uma transação no banco de dados
    const t = await banco.transaction();

    try {

        //Inserindo emprestimo
        await emprestimo.create({
            emprestimo: hoje,
            vencimento: venc,
            idlivro: req.body.idlivro,
            idpessoa: req.body.idpessoa
        },
            {
                transaction: t
            });

        //Alterando status do livro para emprestado
        await livro.update({
            emprestado: true
        },
            {
                where: { idlivro: req.body.idlivro }
            },
            {
                transaction: t
            });

        //Confirmando a transação no banco de dados
        await t.commit();
        res.json({ "mensagem": "Empréstimo realizado com sucesso." });

    } catch (error) {

        //Desfazendo todas as operações da transação no banco de dados
        await t.rollback();
        res.status(400).json(error);
    }
};

async function devolver(req, res) {
    //Pegando a data atual
    let devolucao = moment().format("YYYY-MM-DD");

    //Validar se o empréstimo já foi devolvido
    const emprestimoSelecionado = await emprestimo.findByPk(req.body.idemprestimo);
    if (emprestimoSelecionado.devolucao != null) {
        res.status(400).json({ "mensagem": "Este empréstimo já foi devolvido." });
        return;
    }


    //Iniciando uma transação no banco de dados
    const t = await banco.transaction();

    try {

        //Localizar o emprestimo
        const e = await emprestimo.findByPk(req.body.idemprestimo);

        //Pegar o código do livro emprestado
        const idlivro = e.idlivro;

        //Gravando a data de devolução no emprestimo
        await emprestimo.update({
            devolucao: devolucao
        },
            {
                where: { idemprestimo: req.body.idemprestimo }
            },
            {
                transaction: t
            });

        //Alterando status do livro para disponível
        await livro.update({
            emprestado: false
        },
            {
                where: { idlivro: idlivro }
            },
            {
                transaction: t
            });

        //Confirmando a transação no banco de dados
        await t.commit();
        res.json({ "mensagem": "Devolução realizada com sucesso." });

    } catch (error) {
        //Desfazendo todas as operações da transação no banco de dados
        await t.rollback();
        res.status(400).json(error);
    }
};

async function listarpendentes(req, res) {
    const dados = await emprestimo
    .findAll(
        {
            include: [
                { model: livro, attributes: ['titulo'], as: 'livro' },
                { model: pessoa, attributes: ['pessoa'], as: 'pessoa' }
            ],
            where: { devolucao: null },
            order: [['emprestimo', 'ASC']] // Ordena por emprestimo em ordem ascendente (ASC)
        }
    );
    return res.json(dados);
};

async function listarporpessoa(req, res) {
    const dados = await emprestimo
    .findAll(
        {
             include: [
                { model: livro, attributes: ['titulo'], as: 'livro'}
            ],
            where: { idpessoa: req.params.idpessoa }
        });
    return res.json(dados);
};

async function listarAtrasados(req, res) {
    let hoje = moment().format("YYYY-MM-DD");

    const dados = await emprestimo.findAll({
        where: {
            devolucao: null,
            vencimento: {
                [Op.lt]: hoje
            }
        }
    });
    return res.json(dados);
};


async function marcarEmprestimosAtrasados(req, res) {
    try {
        // Executa a stored procedure no banco para marcar empréstimos em atraso
        await banco.query('exec MarcarEmprestimosAtrasados()');

        return res.json({ "mensagem": "Empréstimos em atraso marcados com sucesso." });
    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro ao marcar empréstimos em atraso.", "erro": error.message });
    }
}


export default {emprestar, devolver, listarpendentes, listarporpessoa, listarAtrasados, marcarEmprestimosAtrasados, alterar, selecionar, listarTodos};