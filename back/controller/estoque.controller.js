const {
    listarEstoque,
    movimentarEstoque,
    atualizarMinimoEstoque
} = require('../service/estoque.service');

// =========================
//   LISTAR ESTOQUE
// =========================
async function listar(req, res) {
    try {
        const itens = await listarEstoque();
        return res.status(200).json(itens);

    } catch (err) {
        return res.status(500).json({ erro: err.message });
    }
}


// =========================
//   MOVIMENTAR ESTOQUE
// =========================
async function movimentar(req, res) {
    try {
        const { idProduto } = req.params;
        const { tipo, quantidade } = req.body;

        if (!tipo || !quantidade) {
            return res.status(400).json({ erro: "Dados incompletos!" });
        }

        if (!["entrada", "saida"].includes(tipo)) {
            return res.status(400).json({
                erro: "O tipo deve ser 'entrada' ou 'saida'"
            });
        }

        const movimento = await movimentarEstoque(Number(idProduto), tipo, Number(quantidade));

        return res.status(200).json({
            mensagem: "Movimentação realizada com sucesso!",
            movimento
        });

    } catch (err) {
        return res.status(500).json({ erro: err.message });
    }
}


// =========================
//   ATUALIZAR QUANTIDADE MÍNIMA
// =========================
async function atualizarMinimo(req, res) {
    try {
        const { idProduto } = req.params;
        const { quantidade_minima } = req.body;

        if (quantidade_minima === undefined) {
            return res.status(400).json({ erro: "Dados incompletos!" });
        }

        const atualizado = await atualizarMinimoEstoque(
            Number(idProduto),
            Number(quantidade_minima)
        );

        return res.status(200).json({
            mensagem: "Quantidade mínima atualizada com sucesso!",
            estoque: atualizado
        });

    } catch (err) {
        return res.status(500).json({ erro: err.message });
    }
}


// EXPORTA NO MESMO PADRÃO DO PRODUTO
module.exports = {
    listar,
    movimentar,
    atualizarMinimo
};
