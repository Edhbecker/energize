import colaborador from "../model/ColaboradorModel.js"

async function listar(req, res){
    await colaborador
    .findAll()
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function selecionar(req, res){
    await colaborador
    .findByPk(req.params.idcolaborador)
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function criar(req, res){
    if (!req.body.nome)
        res.status(500).send("Parâmetro Nome é obrigatório.");
    else if (!req.body.cpf)
        res.status(500).send("Parâmetro CPF é obrigatório.");
    else if (!req.body.nascimento)
        res.status(500).send("Parâmetro Nascimento é obrigatório.");
    else if (!req.body.salario)
        res.status(500).send("Parâmetro Salário é obrigatório."); 
    else if (!req.body.filhos)
        res.status(500).send("Parâmetro Filhos é obrigatório.");       
    else
        await colaborador
        .create({ 
            nome: req.body.nome,
            cpf: req.body.cpf,
            nascimento: req.body.nascimento,
            salario: req.body.salario,
            casado: req.body.casado,
            filhos: req.body.filhos,
            observacoes: req.body.observacoes
        })
        .then(resultado => { res.status(200).json(resultado)} )
        .catch(erro => { res.status(500).json(erro) });
};


async function alterar(req, res){
    await colaborador
    .update({ 
        nome: req.body.nome,
        cpf: req.body.cpf,
        nascimento: req.body.nascimento,
        salario: req.body.salario,
        casado: req.body.casado,
        filhos: req.body.filhos,
        observacoes: req.body.observacoes
    },
    {
        where:  {
            idcolaborador: req.params.idcolaborador}
    })
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function excluir(req, res){
    await colaborador
    .destroy(
    {
        where:  {
            idcolaborador: req.params.idcolaborador}
    })
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};


export default { listar, selecionar, criar, alterar, excluir };