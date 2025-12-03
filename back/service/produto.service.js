const Produto = require('../models/Produto')
const { ItemPedido } = require('../models/rel')
// ======================== CRIAR ========================
async function criarProduto(dados) {

    const { nome, descricao, modelo, preco, imagem_url } = dados

    if (!nome || !modelo || preco === undefined) {
        throw new Error('Nome, modelo e preço são obrigatórios!')
    }

    const novoProduto = await Produto.create({
        nome,
        descricao,
        modelo,
        preco,
        imagem_url
        // ativo = defaultValue: true (automático)
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
    if (!produto) throw new Error('Produto não encontrado!')

    // Checa se existem itens de pedido associados
    const itens = await ItemPedido.findAll({ where: { idProduto: id } })
    if (itens.length > 0) {
        throw new Error('Não é possível apagar este produto pois ele está em pedidos.')
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
