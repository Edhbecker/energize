
import produto from "../model/ProdutoModel.js";

async function listar(req, res) {
    try {
        const produtos = await produto.findAll();
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function selecionar(req, res) {
    try {
        const produtoEncontrado = await produto.findByPk(req.params.idproduto);
        if (!produtoEncontrado) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.json(produtoEncontrado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function criar(req, res) {
    try {
        const { nome, descricao, imagem, disponivel, categoria, preco } = req.body;
        
        if (!nome || !descricao || !imagem || !categoria) {
            return res.status(400).json({ error: 'Nome, descrição, imagem e categoria são obrigatórios' });
        }
        
        const novoProduto = await produto.create({
            nome,
            descricao,
            imagem,
            disponivel: disponivel !== undefined ? disponivel : true,
            categoria,
            preco
        });
        
        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function alterar(req, res) {
    try {
        const { nome, descricao, imagem, disponivel, categoria, preco } = req.body;
        
        if (!nome || !descricao || !imagem || !categoria) {
            return res.status(400).json({ error: 'Nome, descrição, imagem e categoria são obrigatórios' });
        }
        
        const [updated] = await produto.update({
            nome,
            descricao,
            imagem,
            disponivel,
            categoria,
            preco
        }, {
            where: { idproduto: req.params.idproduto }
        });
        
        if (updated) {
            const produtoAtualizado = await produto.findByPk(req.params.idproduto);
            res.json(produtoAtualizado);
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function excluir(req, res) {
    try {
        const deleted = await produto.destroy({
            where: { idproduto: req.params.idproduto }
        });
        
        if (deleted) {
            res.json({ message: 'Produto excluído com sucesso' });
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function listarPorCategoria(req, res) {
    try {
        const produtos = await produto.findAll({
            where: { categoria: req.params.categoria }
        });
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default { listar, selecionar, criar, alterar, excluir, listarPorCategoria };
