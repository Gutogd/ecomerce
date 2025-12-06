const { Estoque } = require('../models/rel');
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

        
        let estoque = await Estoque.findOne({ where: { idProduto } });

        if (!estoque) {
            // Cria um estoque novo se não existir
            estoque = await Estoque.create({
                idProduto,
                quantidade_atual: 0,
                quantidade_minima: 0
            });
        }

        if (tipo === 'ENTRADA') estoque.quantidade_atual += quantidade;
        else if (tipo === 'SAIDA') {
            if (estoque.quantidade_atual < quantidade) {
                return res.status(400).json({ erro: "Estoque insuficiente" });
            }
            estoque.quantidade_atual -= quantidade;
        }

        await estoque.save();
        res.status(200).json({ mensagem: "Estoque atualizado com sucesso", estoque });

    } catch (err) {
        res.status(500).json({ erro: err.message });
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