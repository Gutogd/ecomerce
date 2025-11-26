const express = require('express')
const router = express.Router()

const { criar, listar, atualizar, apagar } = require('../controller/produto.controller')

// Middlewares
const authMiddleware = require('../middleware/auth.middleware')
const isAdminMiddleware = require('../middleware/isAdmin.middleware')

// POST /produto
router.post(
    '/',
    authMiddleware,    
    isAdminMiddleware,   
    criar
)

// GET – Listar produtos (qualquer usuário logado)
router.get(
'/',
authMiddleware,
listar
)

// Atualizar parcialmente produto (ADMIN)
router.patch(
'/:id',
authMiddleware,
isAdminMiddleware,
atualizar
)

// DELETE
router.delete(
    '/:id',
    authMiddleware,
    isAdminMiddleware,
    apagar
)

module.exports = router