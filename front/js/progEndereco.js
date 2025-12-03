const formEndereco = document.querySelector("form");
const inputCEP = document.getElementById('cep');

const idPedido = localStorage.getItem('idPedido');

// =========================
//   VALIDAÇÃO DE SESSÃO
// =========================
let token = sessionStorage.getItem('token');
let nome = sessionStorage.getItem('nome');
let tipo = sessionStorage.getItem('tipo');

if (!token) location.href = '../index.html';
if (tipo !== 'CLIENTE') location.href = './home.html';

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
//   ELEMENTOS DE TELA
// =========================
let nomeUsuario = document.getElementById('nomeUsuario');
let btnLogout = document.getElementById('btnLogout');

if (nomeUsuario && nome) nomeUsuario.textContent = nome;

btnLogout.addEventListener("click", () => {
    sessionStorage.clear();
    localStorage.clear();
    location.href = '../index.html';
});

// =========================
//   BUSCAR CEP
// =========================
async function buscarCEP(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            alert("CEP não encontrado!");
            return;
        }

        document.getElementById("logradouro").value = data.logradouro;
        document.getElementById("bairro").value = data.bairro;
        document.getElementById("localidade").value = data.localidade;
        document.getElementById("uf").value = data.uf;

    } catch (err) {
        console.error("Erro ao consultar CEP:", err);
    }
}

inputCEP.addEventListener("blur", () => {
    const cep = inputCEP.value.replace(/\D/g, "");
    if (cep.length === 8) buscarCEP(cep);
});

// =========================
//   ENVIAR ENDEREÇO
// =========================
formEndereco.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = {
        cep: inputCEP.value,
        logradouro: document.getElementById("logradouro").value,
        numero: document.getElementById("numero").value,
        complemento: document.getElementById("complemento").value,
        bairro: document.getElementById("bairro").value,
        localidade: document.getElementById("localidade").value,
        uf: document.getElementById("uf").value
    };

    try {
        console.log("ENVIANDO ENDEREÇO:", dados);

        const resp = await fetch(`http://localhost:3000/entrega/${idPedido}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dados)
        });

        const resultado = await resp.json();

        if (!resp.ok) {
            alert(resultado.message || "Erro ao salvar endereço");
            return;
        }

        // -------------------------
        // Criar tela de escolha
        // -------------------------
        formEndereco.style.display = "none"; // Esconde o formulário

        const container = document.createElement("div");
        container.innerHTML = `
            <h2>Endereço cadastrado com sucesso! 🚚</h2>
            <button id="btnCatalogo">Voltar para o catálogo</button>
            <button id="btnPedido">Ir para meu pedido</button>
        `;
        document.body.appendChild(container);

        // Botões
        document.getElementById("btnCatalogo").addEventListener("click", () => {
            window.location.href = "./catalogo.html"; // Ajuste para sua página de catálogo
        });

       document.getElementById("btnPedido").addEventListener("click", () => {
    window.location.href = `./itemPedido.html?idPedido=${idPedido}`;
});

    } catch (err) {
        console.error("ERRO NO ENVIO:", err);
        alert("Erro ao cadastrar endereço!");
    }
});
