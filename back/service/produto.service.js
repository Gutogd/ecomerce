const Estoque = require('../models/Estoque')

async function listarEstoque() {
    const lista = await Estoque.findAll()
    return lista
}

async function movimentarEstoque(idProduto, dados) {

    const { tipo, quantidade } = dados

    if (!tipo || !quantidade) {
        throw new Error("Tipo e quantidade são obrigatórios!")
    }

    const estoque = await Estoque.findOne({
        where: { idProduto }
    })

    if (!estoque) {
        throw new Error("Produto não encontrado no estoque!")
    }

    // Lógica de movimentação
    if (tipo === "entrada") {
        estoque.quantidade_atual += quantidade
    } 
    else if (tipo === "saida") {

        if (estoque.quantidade_atual < quantidade) {
            throw new Error("Estoque insuficiente!")
        }

        estoque.quantidade_atual -= quantidade
    } 
    else {
        throw new Error("Tipo de movimento inválido! Use 'entrada' ou 'saida'.")
    }

    await estoque.save()

    return estoque
}

async function atualizarMinimo(idProduto, dados) {

    const { quantidade_minima } = dados

    if (quantidade_minima === undefined) {
        throw new Error("Quantidade mínima deve ser informada!")
    }

    const estoque = await Estoque.findOne({
        where: { idProduto }
    })

    if (!estoque) {
        throw new Error("Produto não encontrado no estoque!")
    }

    await estoque.update({ quantidade_minima })

    return estoque
}


module.exports = {
    listarEstoque,
    movimentarEstoque,
    atualizarMinimo
}
