let res = document.getElementById("res")
<<<<<<< HEAD
let btnCad = document.getElementById('btnCad')



let usuarioLogado = document.getElementById('usuarioLogado')

let nome = sessionStorage.getItem('nome')

if (nome) {
    usuarioLogado.innerHTML = `Olá, ${nome}!`
}


btnCad.addEventListener('click', (e)=>{
=======
let btnCadProd = document.getElementById('btnCadProd')
let tipo_usuario = localStorage.getItem('tipo_usuario')


if(tipo_usuario !== 'ADMIN'){
    btnCadProd.disable = true
    

}
btnCadProd.addEventListener('click', (e)=>{
>>>>>>> d7720b964a0260eeeb54fe668f85fdb2532f7d18
    e.preventDefault()

    let nome = document.getElementById('nome').value
    let descricao = document.getElementById('descricao').value
    let modelo = document.getElementById('modelo').value
    let preco = document.getElementById('preco').value
<<<<<<< HEAD
    let imagem_url = document.getElementById('img_url').value
=======
    let imagem_url = document.getElementById('imagem_url').value
>>>>>>> d7720b964a0260eeeb54fe668f85fdb2532f7d18

   const dados = {
        nome,
        descricao,
        modelo,
        preco,
        imagem_url
    }  

<<<<<<< HEAD
    fetch("http://localhost:3000/produto", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem('token') //"Bearer" é o tipo de autenticação padrão para tokens JWT, Ou seja: quem está "portando" (bearing) o token é autorizado.
    },
    body: JSON.stringify(dados)
})


    .then(resp => resp.json())
    .then(valores => {

        res.innerHTML = "Produto cadastrado com sucesso!"

    })

    .catch((err)=>{
        console.error('erro ao cadastrar produto', err)
=======
    fetch('http://localhost:3000/produto', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },body:JSON.stringify(dados)
>>>>>>> d7720b964a0260eeeb54fe668f85fdb2532f7d18
    })
})