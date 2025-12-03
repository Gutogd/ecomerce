const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const pedidoController = require('../controller/pedido.controller');

// Finalizar pedido
router.post('/finalizar', auth, pedidoController.finalizar);

// Listar todos os pedidos do usuário
router.get('/meus', auth, pedidoController.listarDoUsuario);

// 🔥 NOVA ROTA → detalhes do pedido
router.get('/detalhes/:id', auth, pedidoController.detalhes);

module.exports = router;

