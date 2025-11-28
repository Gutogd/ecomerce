const express = require('express');
const router = express.Router();
const estoqueController = require('../controller/estoque.controller');

// LISTAR ESTOQUE
router.get('/', estoqueController.listarEstoque);

router.patch('/movimentar/:idProduto', estoqueController.movimentarEstoque);

router.patch('/minimo/:idProduto', estoqueController.atualizarMinimoEstoque);


module.exports = router;
