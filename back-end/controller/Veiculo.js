import veiculo from "../model/VeiculoModel.js"

async function listar(req, res){
    await veiculo
    .findAll()
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function selecionar(req, res){
    await veiculo
    .findByPk(req.params.idveiculo)
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function criar(req, res){
    if (!req.body.marca)
        res.status(500).send("Parâmetro Marca é obrigatório.");
    else if (!req.body.modelo)
        res.status(500).send("Parâmetro Modelo é obrigatório.");
    else if (!req.body.datafabricacao)
        res.status(500).send("Parâmetro DataFabricação é obrigatório.");
    else if (!req.body.anomodelo)
        res.status(500).send("Parâmetro AnoModelo é obrigatório.");
    else if (!req.body.valorfipe)
        res.status(500).send("Parâmetro ValorFipe é obrigatório.");            
    else
        await veiculo
        .create({ 
            marca: req.body.marca,
            modelo: req.body.modelo,
            datafabricacao: req.body.datafabricacao,
            anomodelo: req.body.anomodelo,
            valorfipe: req.body.valorfipe,
            automatico: req.body.automatico,
            arcondicionado: req.body.arcondicionado,
            unicodono: req.body.unicodono,
            sinistros: req.body.sinistros
        })
        .then(resultado => { res.status(200).json(resultado)} )
        .catch(erro => { res.status(500).json(erro) });
};


async function alterar(req, res){
    await veiculo
    .update({ 
        marca: req.body.marca,
        modelo: req.body.modelo,
        datafabricacao: req.body.datafabricacao,
        anomodelo: req.body.anomodelo,
        valorfipe: req.body.valorfipe,
        automatico: req.body.automatico,
        arcondicionado: req.body.arcondicionado,
        unicodono: req.body.unicodono,
        sinistros: req.body.sinistros
    },
    {
        where:  {
            idveiculo: req.params.idveiculo}
    })
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function excluir(req, res){
    await veiculo
    .destroy(
    {
        where:  {
            idveiculo: req.params.idveiculo}
    })
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};


export default { listar, selecionar, criar, alterar, excluir };