const entregaService = require('../service/entrega.service')

module.exports = {

   async cadastrarParaPedido(req, res) {
    try {
        const idPedido = req.params.idPedido;
        const dados = req.body;

        dados.idPedido = idPedido;

        const resultado = await entregaService.cadastrar(dados);

        return res.status(201).json(resultado);

    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}
,

    async listar(req, res) {
        try {
            const entregas = await entregaService.listar()
            return res.status(200).json(entregas)

        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },

    async buscarPorPedido(req, res) {
        try {
            const idPedido = req.params.idPedido
            const entrega = await entregaService.buscarPorPedido(idPedido)

            if (!entrega) {
                return res.status(404).json({ message: "Entrega não encontrada!" })
            }

            return res.status(200).json(entrega)

        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    },

    async atualizarStatus(req, res) {
        try {
            const idEntrega = req.params.id
            const { statusEntrega } = req.body

            const entrega = await entregaService.atualizarStatus(idEntrega, statusEntrega)

            return res.status(200).json(entrega)

        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
}
