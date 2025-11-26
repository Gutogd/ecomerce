let res = document.getElementById('res')
let btnUs = document.getElementById('btnUs')
<<<<<<< HEAD
let usuarioLogado = document.getElementById('usuarioLogado')

let nome = sessionStorage.getItem('nome')

if (nome) {
    usuarioLogado.innerHTML = `Olá, ${nome}!`
}
=======
>>>>>>> d7720b964a0260eeeb54fe668f85fdb2532f7d18

btnUs.addEventListener('click', (e)=>{
    e.preventDefault()

    let nome = document.getElementById('nome').value
    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value 
    let telefone = document.getElementById('telefone').value 
    let cpf = document.getElementById('cpf').value 
    



    const dados = {
        nome : nome,
        email : email,
        senha : senha,
        telefone : telefone,
        cpf : cpf
    }

    
    fetch('http://localhost:3000/usuario', {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },body: JSON.stringify(dados)
    })


    .then(resp => resp.json())
    .then(valores => {
        res.innerHTML = ``
        res.innerHTML += `Usuario cadastrado com sucesso!`
<<<<<<< HEAD
        setTimeout(()=>{
            window.location.href = "../index.html"
        }, 1000)
=======
>>>>>>> d7720b964a0260eeeb54fe668f85fdb2532f7d18

    })
    .catch((err)=>{
        console.error('erro ao cadastrar', err)
    })
})