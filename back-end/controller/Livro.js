import livro from "../model/LivroModel.js"
import categoria from "../model/CategoriaModel.js"
import editora from "../model/EditoraModel.js"



async function listar(req, res){
    await livro
    .findAll({
        include: [
            { model: categoria, attributes: ['categoria'], as: 'categoria'},
            { model: editora, attributes: ['editora'], as: 'editora'}
        ]
    })
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function selecionar(req, res){
    await livro
    .findByPk(req.params.idlivro)
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function criar(req, res){
    if (!req.body.titulo)
        res.status(500).send("Parâmetro Título é obrigatório.");
    else if (!req.body.ano)
        res.status(500).send("Parâmetro Ano é obrigatório.");
    else if (!req.body.paginas)
        res.status(500).send("Parâmetro Páginas é obrigatório.");
    else if (!req.body.edicao)
        res.status(500).send("Parâmetro Edição é obrigatório.");
    else if (!req.body.idcategoria)
        res.status(500).send("Parâmetro idcategoria é obrigatório.");
    else if (!req.body.ideditora)
        res.status(500).send("Parâmetro ideditora é obrigatório.");    
    else
        await livro
        .create({ 
            titulo: req.body.titulo,
            ano: req.body.ano,
            paginas: req.body.paginas,
            edicao: req.body.edicao,
            resumo: req.body.resumo,
            emprestado: req.body.emprestado,
            idcategoria: req.body.idcategoria,
            ideditora: req.body.ideditora
        })
        .then(resultado => { res.status(200).json(resultado)} )
        .catch(erro => { res.status(500).json(erro) });
};


async function alterar(req, res){
    await livro
    .update({ 
        titulo: req.body.titulo,
        ano: req.body.ano,
        paginas: req.body.paginas,
        edicao: req.body.edicao,
        resumo: req.body.resumo,
        emprestado: req.body.emprestado,
        idcategoria: req.body.idcategoria,
        ideditora: req.body.ideditora
    },
    {
        where:  {
            idlivro: req.params.idlivro}
    })
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function excluir(req, res){
    await livro
    .destroy(
    {
        where:  {
            idlivro: req.params.idlivro}
    })
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};


async function listarporcategorias(req, res){
    await livro
    .findAll({
        include: [
            { model: categoria, attributes: ['categoria'], as: 'categoria'},
            { model: editora, attributes: ['editora'], as: 'editora'}
        ],
        where: {idcategoria: req.params.idcategoria}})
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};


export default { listar, selecionar, criar, alterar, excluir , listarporcategorias};