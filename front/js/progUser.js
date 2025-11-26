let res = document.getElementById('res')
let btnUs = document.getElementById('btnUs')

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

    })
    .catch((err)=>{
        console.error('erro ao cadastrar', err)
    })
})