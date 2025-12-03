// =====================
// VALIDAÇÃO DE SESSÃO
// =====================
let token = sessionStorage.getItem('token');
let tipo = sessionStorage.getItem('tipo');

if (!token) location.href = '../index.html';
if (tipo !== 'CLIENTE') location.href = './home.html';

let usuarioLogado = document.getElementById("usuarioLogado");
let nome = sessionStorage.getItem("nome");

if (nome) {
    usuarioLogado.innerHTML = `Olá, ${nome}!`;
}


document.getElementById("btnLogout").addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.clear();
    location.href = "../index.html";
}); 

// =====================
// ELEMENTOS DE TELA
// =====================
const containerPedidos = document.getElementById("containerPedidos");
const tabelaBody = document.querySelector("#tabelaPedido tbody");
const totalPedidoSpan = document.getElementById("totalPedido");
const btnCatalogo = document.getElementById("btnCatalogo");

// =====================
// FUNÇÃO PARA CARREGAR TODOS OS PEDIDOS
// =====================
async function carregarPedidos() {
try {
const resp = await fetch("http://localhost:3000/pedido/meus", {
headers: {
"Authorization": `Bearer ${token}`  ,
"Content-Type": "application/json"
}
});

     if (!resp.ok) {
         const erro = await resp.json();
         throw new Error(erro.message || "Erro ao buscar pedidos");
     }

     const pedidos = await resp.json();

     if (pedidos.length === 0) {
         containerPedidos.innerHTML = "<p>Nenhum pedido encontrado.</p>";
         return;
     }

     // Limpar container
     containerPedidos.innerHTML = "";

     pedidos.forEach(pedido => {
         const divPedido = document.createElement("div");
         divPedido.classList.add("pedido");
         divPedido.innerHTML = `
             <h3>Pedido #${pedido.codPedido} - Total: R$ ${Number(pedido.valorTotal).toFixed(2)}</h3>
             <p>Data: ${pedido.dataPedido || ''}</p>
             <button class="btn-ver-itens" data-id="${pedido.codPedido}">Ver Itens</button>
         `;
         containerPedidos.appendChild(divPedido);
     });

     // Adicionar evento para cada botão "Ver Itens"
     document.querySelectorAll(".btn-ver-itens").forEach(btn => {
         btn.addEventListener("click", () => {
             const idPedido = btn.getAttribute("data-id");
             localStorage.setItem("idPedido", idPedido);
             carregarItensPedido(idPedido);
         });
     });

 } catch (err) {
     console.error("Erro ao carregar pedidos:", err);
     alert("Erro ao buscar pedidos!");
 }

}

// =====================
// FUNÇÃO PARA CARREGAR ITENS DE UM PEDIDO
// =====================
async function carregarItensPedido(idPedido) {
try {
const resp = await fetch(`http://localhost:3000/pedido/detalhes/${idPedido}`, {
headers: { "Authorization": `Bearer ${token}` }
});

     if (!resp.ok) throw new Error("Erro ao buscar pedido");

     const pedido = await resp.json();

     tabelaBody.innerHTML = "";
     let total = 0;

     pedido.itens.forEach(item => {
         const subtotal = Number(item.valorTotalItem);
         const tr = document.createElement("tr");
         tr.innerHTML = `
             <td>${item.nomeProduto}</td>
             <td>R$ ${(subtotal / Number(item.quantidade)).toFixed(2)}</td>
             <td>${item.quantidade}</td>
             <td>R$ ${subtotal.toFixed(2)}</td>
         `;
         tabelaBody.appendChild(tr);
         total += subtotal;
     });

     totalPedidoSpan.textContent = total.toFixed(2);

 } catch (err) {
     console.error("Erro:", err);
     alert("Não foi possível carregar os itens do pedido.");
 }

}

// =====================
// BOTÃO VOLTAR PARA CATÁLOGO
// =====================
btnCatalogo.addEventListener("click", () => {
window.location.href = "./catalogo.html";
});

// =====================
// INICIAR
// =====================
carregarPedidos();