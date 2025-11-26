const jwt = require('jsonwebtoken')
const secret = 'secret123'

function gerarToken(payload){
    return jwt.sign(payload, secret, { expiresIn: '3h'})
}

function verificarToken(token){
    try{
        return jwt.verify(token,secret)
    }catch(err){
        console.error('Erro ao verificar o token')
        return null
    }
}

module.exports = { gerarToken, verificarToken }
