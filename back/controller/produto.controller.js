const { criarProduto, listarProdutos, atualizarProduto, apagarProduto } = require('../service/produto.service')

async function criar(req, res) {
    try {

        const produto = await criarProduto(req.body)

        return res.status(201).json({
            mensagem: "Produto criado com sucesso!",
            produto
        })

    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

async function listar(req, res) {
    try {
        const produtos = await listarProdutos()

        return res.status(200).json(produtos)

    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}


async function atualizar(req, res) {
    try {
        const { id } = req.params
        const dados = req.body

        const produtoAtualizado = await atualizarProduto(id, dados)

        return res.status(200).json({
            mensagem: "Produto atualizado com sucesso!",
            produto: produtoAtualizado
        })

    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }

}

// DELETE - apagar
async function apagar(req, res) {
    try {
        const { id } = req.params

        await apagarProduto(id)

        return res.status(200).json({ mensagem: 'Produto apagado com sucesso' })

    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}


module.exports = { criar, listar, atualizar, apagar }
