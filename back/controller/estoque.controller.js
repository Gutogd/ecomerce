const {
    listar,
    movimentar,
    atualizarMinimo
} = require('../service/estoque.service');

// =========================
//   LISTAR ESTOQUE
// =========================
async function listarEstoque(req, res) {
    try {
        const itens = await listar();

        // Garantir que está vindo array
        console.log("Resultado do listar():", itens);

        return res.status(200).json(itens);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ erro: err.message });
    }
}

// =========================
//   MOVIMENTAR ESTOQUE
// =========================
async function movimentarEstoque(req, res) {
    try {
        const { idProduto } = req.params;
        const { tipo, quantidade } = req.body;

        if (!tipo || !quantidade) {
            return res.status(400).json({ erro: "Dados incompletos!" });
        }

        const movimento = await movimentar(
            Number(idProduto),
            tipo,
            Number(quantidade)
        );

        return res.status(200).json({
            mensagem: movimento.message,
            movimento
        });

    } catch (err) {
        return res.status(500).json({ erro: err.message });
    }
}

// =========================
//   ATUALIZAR MÍNIMO
// =========================
async function atualizarMinimoEstoque(req, res) {
    try {
        const { idProduto } = req.params;
        const { quantidade_minima } = req.body;

        if (quantidade_minima === undefined) {
            return res.status(400).json({ erro: "Dados incompletos!" });
        }

        const atualizado = await atualizarMinimo(
            Number(idProduto),
            Number(quantidade_minima)
        );

        return res.status(200).json({
            mensagem: "Quantidade mínima atualizada!",
            estoque: atualizado
        });

    } catch (err) {
        return res.status(500).json({ erro: err.message });
    }
}

// === EXPORTAÇÃO CORRETA ===
module.exports = {
    listarEstoque,
    movimentarEstoque,
    atualizarMinimoEstoque
};