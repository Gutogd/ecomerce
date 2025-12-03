// =========================
//   VALIDAÇÃO DE SESSÃO
// =========================
let token = sessionStorage.getItem('token');
let nome = sessionStorage.getItem('nome');
let tipo = sessionStorage.getItem('tipo');

if (!token) location.href = '../index.html';
if (tipo !== 'CLIENTE') location.href = './home.html';

document.getElementById('btnLogout').onclick = () => {
    sessionStorage.clear();
    localStorage.clear();
    location.href = '../index.html';
};

let usuarioLogado = document.getElementById("usuarioLogado");

if (nome) {
    usuarioLogado.innerHTML = `Olá, ${nome}!`;
}


document.getElementById("btnLogout").addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.clear();
    location.href = "../index.html";
});
// =========================
//   PEGAR ID DO PEDIDO
// =========================
const idPedido = localStorage.getItem('idPedido');

if (!idPedido) {
    alert("Nenhum pedido encontrado!");
    location.href = './catalogo.html';
}

// =========================
//   BUSCAR PEDIDO NO BACK
// =========================
async function carregarPedido() {
    try {
        const resp = await fetch(`http://localhost:3000/pedido/detalhes/${idPedido}`, {
            headers: { "Authorization": "Bearer " + token }
        });

        const dados = await resp.json();

        if (!resp.ok) {
            alert("Erro ao carregar detalhes do pedido!");
            return;
        }

        mostrarPedido(dados);

    } catch (err) {
        console.error("Erro ao buscar pedido:", err);
        alert("Erro inesperado ao buscar pedido!");
    }
}

function mostrarPedido(p) {
    document.getElementById("dadosPedido").innerHTML = `
        <h3>Pedido #${p.codPedido}</h3>
        <p><b>Status:</b> ${p.status}</p>
        <p><b>Subtotal:</b> R$ ${p.valorSubtotal}</p>
        <p><b>Total:</b> R$ ${p.valorTotal}</p>
        <p><b>Data:</b> ${new Date(p.dataPedido).toLocaleString()}</p>
        <hr>
        <h3>Itens</h3>
        ${p.itens.map(item => `
            <p>${item.nomeProduto} — Qtd: ${item.quantidade} — R$ ${item.valorTotalItem}</p>
        `).join("")}
    `;
}

// =========================
//   IR PARA O ENDEREÇO
// =========================
document.getElementById("btnEndereco").onclick = () => {
    window.location.href = "./endereco.html";
};

// Chama ao iniciar
carregarPedido();
