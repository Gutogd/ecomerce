const { Estoque, Produto } = require('../models/rel');

// ==========================
// LISTAR ESTOQUE
// ==========================
async function listar() {
    return await Estoque.findAll({
        include: [
            {
                model: Produto,
                as: 'produtoEstoque'
            }
        ]
    });
}

// ==========================
// MOVIMENTAR ESTOQUE
// ==========================
async function movimentar(idProduto, tipo, quantidade) {
    try {

        let estoque = await Estoque.findOne({ where: { idProduto } });

        if (!estoque) {
            estoque = await Estoque.create({
                idProduto,
                quantidade_atual: 0,
                quantidade_minima: 5        // já cria com o mínimo de 5
            });
        }

        // força número
        estoque.quantidade_atual = Number(estoque.quantidade_atual);

        if (tipo === "entrada") {

            estoque.quantidade_atual = estoque.quantidade_atual + Number(quantidade);

        } else if (tipo === "saida") {

            if (estoque.quantidade_atual < quantidade) {
                throw new Error("Estoque insuficiente!");
            }

            estoque.quantidade_atual = estoque.quantidade_atual - Number(quantidade);

        } else {
            throw new Error("Tipo inválido");
        }

        // ⬇️ garante que quantidade mínima seja sempre 5
        estoque.quantidade_minima = 5;

        await estoque.save();

        // aviso crítico
        if (estoque.quantidade_atual <= estoque.quantidade_minima) {
            return {
                message: "⚠️ Atenção! Estoque crítico!",
                estoqueAtual: estoque.quantidade_atual,
                estoqueCritico: true,
                estoque
            };
        }

        return {
            message: "Movimentação realizada com sucesso!",
            estoqueAtual: estoque.quantidade_atual,
            estoqueCritico: false,
            estoque
        };

    } catch (error) {
        throw new Error(error.message); 
    }
}

// ==========================
// EXPORTAR FUNÇÕES
// ==========================
module.exports = {
    listar,
    movimentar
};
