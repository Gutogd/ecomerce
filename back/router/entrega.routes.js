const express = require('express')
const router = express.Router()
const controller = require('../controller/entrega.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/:idPedido', authMiddleware, controller.cadastrarParaPedido)
router.get('/', authMiddleware, controller.listar)
router.get('/pedido/:idPedido', authMiddleware, controller.buscarPorPedido)
router.put('/:id', authMiddleware, controller.atualizarStatus)

module.exports = router
