const express = require('express')
const cors = require('cors')

const app = express()

// ---- Middlewares globais ----
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// ---- Rotas ----
const usuarioRoutes = require('../router/usuario.routes')
const authRoutes = require('../router/auth.routes')
const estoqueRoutes = require('../router/estoque.router')
const produtoRoutes = require('../router/produto.routes')

app.use('/usuario', usuarioRoutes)
app.use('/', authRoutes)
app.use('/estoque', estoqueRoutes);

app.use('/produto',produtoRoutes);

app.get('/', (req, res) => {
    res.status(200).json({message: "Aplicação Rodando!"})
})

module.exports = app
