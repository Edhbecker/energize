import funcionario from "../model/FuncionarioModel.js"

async function listar(req, res){
    await funcionario
    .findAll()
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function selecionar(req, res){
    await funcionario
    .findByPk(req.params.idfuncionario)
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function criar(req, res){
    if (!req.body.nome)
        res.status(500).send("Parâmetro Descrição é obrigatório.");
    else if (!req.body.email)
        res.status(500).send("Parâmetro CodigoBarras é obrigatório.");          
    else
        await funcionario
        .create({ 
            nome: req.body.nome,
            email: req.body.email
        })
        .then(resultado => { res.status(200).json(resultado)} )
        .catch(erro => { res.status(500).json(erro) });
};


async function alterar(req, res){
    await funcionario
    .update({ 
        nome: req.body.nome,
        email: req.body.email
    },
    {
        where:  {
            idfuncionario: req.params.idfuncionario}
    })
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function excluir(req, res){
    await funcionario
    .destroy(
    {
        where:  {
            idfuncionario: req.params.idfuncionario}
    })
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};


export default { listar, selecionar, criar, alterar, excluir };