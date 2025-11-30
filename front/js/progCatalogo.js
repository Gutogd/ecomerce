// =========================
//   VALIDAÇÃO DE SESSÃO
// =========================
let token = sessionStorage.getItem('token')
let nome = sessionStorage.getItem('nome')
let tipo = sessionStorage.getItem('tipo')

// Se não tiver token, redireciona para login
if (!token) {
    location.href = '../index.html'
}

// Se não for cliente, volta para admin
if (tipo !== 'CLIENTE') {
    location.href = './home.html'
}

// =========================
//   UI
// =========================
let nomeUsuario = document.getElementById('nomeUsuario');
let btnLogout = document.getElementById('btnLogout');

if (nomeUsuario && nome) {
    nomeUsuario.textContent = 'Usuário: '+ nome
}

// Logout
btnLogout.addEventListener("click", (e) => {
    e.preventDefault()
    sessionStorage.clear()
    localStorage.clear()
    location.href = '../index.html'
})

// =========================
//   PRODUTOS TEMPORÁRIOS
// =========================
fetch('http://localhost:3000/produto', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
.then(resp => resp.json())
.then(produtos => {
    produtos.forEach(prod => {
        lista.innerHTML += `
            <article class="produto">
                <figure>
                    <img src="${prod.imagem_url}">
                    <h2>${prod.nome}</h2>

                    <p class="descricao">${prod.descricao}</p>

                    <p class="preco">R$ ${prod.preco}</p>
                </figure>

                <div class="controle-produto">
                    <input type="number" min="1" value="1" id="qtd-${prod.id}">
                    <button onclick="add(${prod.id})">Adicionar ao carrinho</button>
                </div>
            </article>
        `
    })
})



// =========================
//   RENDERIZAÇÃO DOS CARDS
// =========================
let lista = document.getElementById('listaProdutos');


// =========================
//   ADICIONAR AO CARRINHO
// =========================
function add(id) {

    let qtd = parseInt(document.getElementById(`qtd-${id}`).value)

    let produto = produtos.find(p => p.id === id)

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []

    // Adiciona item
    carrinho.push({
        id: produto.id,
        nome: produto.nome,
        qtd: qtd,
        preco: produto.preco
    })

    localStorage.setItem('carrinho', JSON.stringify(carrinho))

    alert("Produto adicionado ao carrinho!")
}