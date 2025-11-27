let res = document.getElementById("res")

let btnCad = document.getElementById('btnCad')

let usuarioLogado = document.getElementById('usuarioLogado')

let nome = sessionStorage.getItem('nome')

if (nome) {
    usuarioLogado.innerHTML = `Olá, ${nome}!`
}


btnCad.addEventListener('click', (e)=>{

    e.preventDefault()

    let nome = document.getElementById('nome').value
    let descricao = document.getElementById('descricao').value
    let modelo = document.getElementById('modelo').value
    let preco = document.getElementById('preco').value
    let imagem_url = document.getElementById('imagem_url').value  


    const dados = {
        nome : nome,
        descricao : descricao,
        modelo : modelo,
        preco : preco,
        imagem_url : imagem_url
    }   
    const token = sessionStorage.getItem('token')

    fetch('http://localhost:3000/produto', {
        method: "POST",
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        },body: JSON.stringify(dados)
    })  
    .then(resp => resp.json())
    .then(valores => {
        res.innerHTML = ``
        res.innerHTML += `Produto cadastrado com sucesso!`
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        

    })
    .catch((err)=>{
        console.error('erro ao cadastrar', err)
    })  
})