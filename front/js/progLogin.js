let resLog = document.getElementById('resLog')
let btnLogin = document.getElementById('btnLogin')

btnLogin.addEventListener('click', (e)=>{
    e.preventDefault()

    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value

    const dados = {
        email : email,
        senha : senha
    }

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },body:JSON.stringify(dados)
    })

    .then(resp => resp.json())
    .then(valores => {
        sessionStorage.setItem('token', valores.token)
        resLog.innerHTML = "login realizado com sucesso"
        sessionStorage.setItem('nome', valores.usuario.nome)
        sessionStorage.setItem('tipo', valores.usuario.tipo)
    
        setTimeout(() => {
            // Redirecionar conforme tipo
            if (valores.usuario.tipo === 'ADMIN') {
                location.href = './html/produto.html'
            } else {
                location.href = './pages/cadastro.html'
            }
        }, 1500)
    })

    .catch((err)=>{
        console.error('erro ao fazer login', err)
    })
})



