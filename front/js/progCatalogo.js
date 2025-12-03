// =========================
//   VALIDAÇÃO DE SESSÃO
// =========================
let token = sessionStorage.getItem('token')
let nome = sessionStorage.getItem('nome')
let tipo = sessionStorage.getItem('tipo')


if (!token) {
    location.href = '../index.html'
}


if (tipo !== 'CLIENTE') {
    location.href = './home.html'
}


let nomeUsuario = document.getElementById('nomeUsuario');
let btnLogout = document.getElementById('btnLogout');

if (nomeUsuario && nome) {
    nomeUsuario.textContent = 'Usuário: '+ nome
}

btnLogout.addEventListener("click", (e) => {
    e.preventDefault()
    sessionStorage.clear()
    localStorage.clear()
    location.href = '../index.html'
})


    fetch('http://localhost:3000/produto', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
.then(resp => resp.json())
.then(data => {

    produtos = data; // <-- agora produtos é global

    data.forEach(prod => {
        lista.innerHTML += `
            <article class="produto">
                <figure>
                    <img src="${prod.imagem_url}">
                    <h2>${prod.nome}</h2>

                    <p class="descricao">${prod.descricao}</p>

                    <p class="preco">R$ ${prod.preco}</p>
                </figure>

                <div class="controle-produto">
                    <input type="number" min="1" value="1" id="qtd-${prod.codProduto}">
                    <button onclick="add(${prod.codProduto})">Adicionar ao carrinho</button>
                </div>
            </article>
        `   
    })
})



let lista = document.getElementById('listaProdutos');


function add(id) {

    let qtd = parseInt(document.getElementById(`qtd-${id}`).value);

    let produto = produtos.find(p => Number(p.codProduto) === Number(id));

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    carrinho.push({
        id: Number(produto.codProduto),
        nome: produto.nome,
        qtd: Number(qtd),
        preco: produto.preco,
        imagem: produto.imagem_url
    });

    // 🔥 AGRUPA ANTES DE SALVAR
    carrinho = agruparCarrinho(carrinho);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    alert('Produto adicionado ao carrinho!');
}


function agruparCarrinho(carrinho) {
    let agrupado = [];

    carrinho.forEach(item => {
        let existente = agrupado.find(p => Number(p.id) === Number(item.id));

        if (existente) {
            existente.qtd = Number(existente.qtd) + Number(item.qtd);
        } else {
            agrupado.push({
                ...item,
                id: Number(item.id),
                qtd: Number(item.qtd)
            });
        }
    });

    return agrupado;
}
