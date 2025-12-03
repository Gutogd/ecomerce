const pedidoService = require('../service/pedido.service');

module.exports = {

    async finalizar(req, res) {
        try {
            const idUsuario = req.user.id;
            const dados = req.body;
            const pedido = await pedidoService.finalizarPedido(dados, idUsuario);
            return res.status(201).json(pedido);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },

    async listarDoUsuario(req, res) {
        try {
            const pedidos = await pedidoService.buscarPedidosDoUsuario(req.user.id);
            return res.status(200).json(pedidos);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },

    // 🔥 NOVO
    async detalhes(req, res) {
        try {
            const idPedido = req.params.id;
            const pedido = await pedidoService.buscarPedidoCompleto(idPedido);

            if (!pedido) {
                return res.status(404).json({ message: "Pedido não encontrado" });
            }

            return res.status(200).json(pedido);

        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }
};
