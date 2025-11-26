let res = document.getElementById("res")
let btnCadProd = document.getElementById('btnCadProd')
let tipo_usuario = localStorage.getItem('tipo_usuario')


if(tipo_usuario !== 'ADMIN'){
    btnCadProd.disable = true
    

}
btnCadProd.addEventListener('click', (e)=>{
    e.preventDefault()

    let nome = document.getElementById('nome').value
    let descricao = document.getElementById('descricao').value
    let modelo = document.getElementById('modelo').value
    let preco = document.getElementById('preco').value
    let imagem_url = document.getElementById('imagem_url').value

   const dados = {
        nome,
        descricao,
        modelo,
        preco,
        imagem_url
    }  

    fetch('http://localhost:3000/produto', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },body:JSON.stringify(dados)
    })
})