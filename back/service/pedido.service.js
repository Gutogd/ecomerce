const { Pedido, ItemPedido, Produto, Usuario } = require('../models/rel')

const estoqueService = require('../service/estoque.service');

async function finalizarPedido(dados, idUsuario) {
    const { itens } = dados;

    if (!itens || itens.length === 0) {
        throw new Error("Carrinho vazio!");
    }

    const usuario = await Usuario.findByPk(idUsuario);
    if (!usuario) {
        throw new Error("Usuário não encontrado!");
    }

    let valorSubtotal = 0;

    for (let item of itens) {
        const produto = await Produto.findByPk(item.id);
        if (!produto) throw new Error(`Produto ${item.id} não encontrado!`);

        if (produto.estoque < item.qtd) {
            throw new Error(`Estoque insuficiente para ${produto.nome}. Disponível: ${produto.estoque}`);
        }

        valorSubtotal += produto.preco * item.qtd;
    }

    const pedido = await Pedido.create({
        idUsuario,
        valorSubtotal,
        valorFrete: 0,
        valorTotal: valorSubtotal
    });

    for (let item of itens) {
        const produto = await Produto.findByPk(item.id);

        await ItemPedido.create({
            idPedido: pedido.codPedido,
            idProduto: produto.codProduto,
            quantidade: item.qtd,
            precoUnitario: produto.preco,
            valorTotalItem: produto.preco * item.qtd
        });

        // ⬇️ CORREÇÃO AQUI!
        await estoqueService.movimentar(
            produto.codProduto,
            "saida",
            item.qtd
        );
    }

    return {
        message: "Pedido criado com sucesso!",
        codPedido: pedido.codPedido,
        valorTotal: pedido.valorTotal
    };
}


async function buscarPedidosDoUsuario(userId) {
    const pedidos = await Pedido.findAll({
        where: { idUsuario: userId },
        order: [['dataPedido', 'DESC']], // Último pedido primeiro
    })

    return pedidos
}
// 🔥 NOVA FUNÇÃO → Buscar pedido completo + itens
async function buscarPedidoCompleto(idPedido) {
    const pedido = await Pedido.findOne({
        where: { codPedido: idPedido },
        include: [
            {
                model: ItemPedido,
                as: "itensPedido", // <-- CORRETO AGORA
                include: [
                    {
                        model: Produto,
                        as: "produtoItem"
                    }
                ]
            }
        ]
    });

    if (!pedido) return null;

    return {
        codPedido: pedido.codPedido,
        status: pedido.status,
        valorSubtotal: pedido.valorSubtotal,
        valorTotal: pedido.valorTotal,
        dataPedido: pedido.dataPedido,
        itens: pedido.itensPedido.map(i => ({
            nomeProduto: i.produtoItem.nome,
            quantidade: i.quantidade,
            valorTotalItem: i.valorTotalItem
        }))
    };
}


module.exports = { finalizarPedido, buscarPedidosDoUsuario, buscarPedidoCompleto };