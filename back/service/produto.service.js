const Produto = require('../models/Produto')

// ======================== CRIAR ========================
async function criarProduto(dados) {

    const { nome, descricao, modelo, preco, imagem_url, ativo } = dados

    if (!nome || !modelo || !preco) {
        throw new Error('Nome, modelo e preço são obrigatórios!')
    }

    const novoProduto = await Produto.create({
        nome,
        descricao,
        modelo,
        preco,
        imagem_url,
        ativo
    })

    return novoProduto
}

// ======================== LISTAR ========================
async function listarProdutos() {
    const produtos = await Produto.findAll()
    return produtos
}

// ======================== ATUALIZAR ========================
async function atualizarProduto(id, dados) {

    const produto = await Produto.findByPk(id)

    if (!produto) {
        throw new Error('Produto não encontrado!')
    }

    await produto.update(dados)

    return produto
}

// ======================== APAGAR ========================
async function apagarProduto(id) {

    const produto = await Produto.findByPk(id)

    if (!produto) {
        throw new Error('Produto não encontrado!')
    }

    await produto.destroy()

    return true
}

module.exports = { 
    criarProduto, 
    listarProdutos, 
    atualizarProduto, 
    apagarProduto 
}
