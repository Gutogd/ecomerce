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
<<<<<<< HEAD
const produtoRoutes = require('../router/produto.routes')

=======
>>>>>>> d7720b964a0260eeeb54fe668f85fdb2532f7d18

app.use('/usuario', usuarioRoutes)
app.use('/', authRoutes)

<<<<<<< HEAD
app.use('/produto',produtoRoutes);
=======
>>>>>>> d7720b964a0260eeeb54fe668f85fdb2532f7d18
app.get('/', (req, res) => {
    res.status(200).json({message: "Aplicação Rodando!"})
})

module.exports = app
