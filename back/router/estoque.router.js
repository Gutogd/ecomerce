const express = require('express');
const router = express.Router();
const estoqueController = require('../controller/estoque.controller');

// LISTAR ESTOQUE
router.get('/', estoqueController.listar);

// MOVIMENTAR ESTOQUE (entrada ou saída)
router.patch('/movimentar/:idProduto', estoqueController.movimentar);


// ATUALIZAR MÍNIMO DO PRODUTO
router.patch('/minimo/:idProduto', estoqueController.atualizarMinimo);

module.exports = router;
