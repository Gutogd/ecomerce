const Estoque = require('../models/Estoque');
const Produto = require('../models/Produto');

module.exports = {
    
    async listar() {
        return await Estoque.findAll();
    },

    async movimentar(idProduto, tipo, quantidade) {
        const estoque = await Estoque.findOne({ where: { idProduto } });

        if (!estoque) throw new Error("Produto não encontrado no estoque!");

        if (tipo === "entrada") {
            estoque.quantidade_atual += quantidade;
        } else if (tipo === "saida") {
            if (estoque.quantidade_atual < quantidade) {
                throw new Error("Estoque insuficiente!");
            }
            estoque.quantidade_atual -= quantidade;
        } else {
            throw new Error("Tipo de movimento inválido!");
        }

        await estoque.save();
        return estoque;
    },

    async atualizarMinimo(idProduto, quantidade_minima) {
        const estoque = await Estoque.findOne({ where: { idProduto } });

        if (!estoque) throw new Error("Produto não encontrado no estoque!");

        estoque.quantidade_minima = quantidade_minima;
        await estoque.save();

        return estoque;
    }
};
