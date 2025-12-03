// =========================
//   VALIDAÇÃO DE SESSÃO
// =========================
let token = sessionStorage.getItem('token');
let nome = sessionStorage.getItem('nome');
let tipo = sessionStorage.getItem('tipo');

if (!token) {
    location.href = '../index.html';
}

if (tipo !== 'CLIENTE') {
    location.href = './home.html';
}

// Mostrar nome do usuário
let usuarioLogado = document.getElementById('usuarioLogado');
if (usuarioLogado && nome) {
    usuarioLogado.textContent = `Usuário: ${nome}`;
}

// Logout
document.getElementById('btnLogout').addEventListener('click', () => {
    sessionStorage.clear();
    localStorage.clear();
    location.href = '../index.html';
});

// =========================
//   PEGAR ELEMENTOS DO HTML
// =========================
let listaCarrinho = document.getElementById('listaCarrinho');
let totalItens = document.getElementById('totalItens');
let valorTotal = document.getElementById('valorTotal');
let btnFinalizar = document.getElementById('btnFinalizar');

// =========================
//   FUNÇÃO PARA AGRUPAR ITENS IGUAIS
// =========================
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

// =========================
//   LIMPAR CARRINHO
// =========================
document.getElementById('btnLimpar').addEventListener('click', () => {
    if (confirm("Tem certeza que deseja limpar todo o carrinho?")) {
        localStorage.removeItem('carrinho');   // Remove tudo
        carregarCarrinho();                    // Atualiza a tela
        alert("Carrinho limpo!");
    }
});

// =========================
//   CARREGAR CARRINHO
// =========================
function carregarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Agrupa antes de exibir
    let carrinhoAgrupado = agruparCarrinho(carrinho);

    if (carrinhoAgrupado.length === 0) {
        listaCarrinho.innerHTML = `<p>Seu carrinho está vazio.</p>`;
        totalItens.textContent = "0";
        valorTotal.textContent = "0.00";
        return;
    }

    listaCarrinho.innerHTML = "";
    let total = 0;
    let itens = 0;

    carrinhoAgrupado.forEach((item, index) => {

        listaCarrinho.innerHTML += `
            <article class="item-carrinho">
                <img src="${item.imagem}" alt="${item.nome}" class="img-carrinho">

                <div class="info-carrinho">
                    <h3>${item.nome}</h3>
                    <p>Quantidade: ${item.qtd}</p>
                    <p>Preço unitário: R$ ${item.preco}</p>
                    <p>Subtotal: R$ ${item.preco * item.qtd}</p>

                    <button onclick="removerItem(${item.id})" class="btn-remover">Remover</button>
                </div>
            </article>
        `;

        total += item.preco * item.qtd;
        itens += item.qtd;
    });

    totalItens.textContent = itens;
    valorTotal.textContent = total.toFixed(2);
}

// =========================
//   REMOVER ITEM
// =========================
function removerItem(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Remove TODOS os itens com esse ID
    carrinho = carrinho.filter(item => item.id !== id);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}

// =========================
//   FINALIZAR COMPRA
// =========================
btnFinalizar.addEventListener('click', async () => {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    try {
        const resp = await fetch("http://localhost:3000/pedido/finalizar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
            body: JSON.stringify({ itens: carrinho })
        });

        const resultado = await resp.json();

        if (!resp.ok) {
            alert(resultado.message || "Erro ao finalizar compra!");
            return;
        }

        // Salva codPedido no localStorage
        localStorage.setItem("idPedido", resultado.codPedido);

        // Limpa o carrinho
        localStorage.removeItem("carrinho");

        // Redireciona para a página de endereço/pedido
        window.location.href = "./pedido.html";

    } catch (error) {
        console.error("Erro ao finalizar compra:", error);
        alert("Erro inesperado ao finalizar a compra!");
    }
});

// Carregar ao iniciar
carregarCarrinho();
