// ==========================
// Exibir nome do usuário
// ==========================
let usuarioLogado = document.getElementById("usuarioLogado");
let nome = sessionStorage.getItem("nome");

if (nome) {
    usuarioLogado.innerHTML = `Olá, ${nome}!`;
}

// ==========================
// Logout
// ==========================
document.getElementById("btnLogout").addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.clear();
    location.href = "../index.html";
});

// ==========================
// Gerar tabela HTML
// ==========================
function gerarTabela(lista) {
    if (!lista || lista.length === 0) {
        return "<p>Nenhum item encontrado no estoque.</p>";
    }

    let tabela = `
        <table border="1" class="tabela-estoque">
          <thead>
    <tr>
        <th>Código</th>
        <th>ID Produto</th>
        <th>Nome do Produto</th>
        <th>Qtd Atual</th>
        <th>Qtd Mínima</th>
    </tr>
</thead>
            <tbody>
    `;

    lista.forEach(item => {
        tabela += `
        <tr>
            <td>${item.codEstoque}</td>
            <td>${item.idProduto}</td>
            <td>${item.produtoEstoque?.nome || "—"}</td>
            <td>${item.quantidade_atual}</td>
            <td>${item.quantidade_minima}</td>
        </tr>
    `;
    });

    tabela += `</tbody></table>`;
    return tabela;
}

// ==========================
// Carregar tabela ao abrir
// ==========================
function carregarTabela() {

    const token = sessionStorage.getItem("token");

    fetch("http://localhost:3000/estoque", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(resp => resp.json())
    .then(lista => {
        document.getElementById("tabelaEstoqueContainer").innerHTML =
            gerarTabela(lista);
    })
    .catch(err => {
        console.error("Erro ao carregar estoque", err);
        document.getElementById("tabelaEstoqueContainer").innerHTML =
            "<p>Erro ao carregar estoque.</p>";
    });

}

carregarTabela();

// ==========================
// Movimentação do estoque
// ==========================
let form = document.getElementById("formMovimentar");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let idProduto = Number(document.getElementById("idProduto").value)
    let tipo = document.getElementById("tipoMovimento").value;
    let quantidade = document.getElementById("quantidade").value;

    if (!idProduto || !quantidade) {
        alert("Preencha todos os campos!");
        return;
    }

    let dados = {
        tipo: tipo,
        quantidade: Number(quantidade)
    };

    let token = sessionStorage.getItem("token");

    fetch(`http://localhost:3000/estoque/movimentar/${idProduto}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(dados)
    })
    .then(resp => resp.json())
    .then(resultado => {

        if (resultado.erro) {
            alert("Erro: " + resultado.erro);
            return;
        }
        console.log(resultado)
        alert(resultado.mensagem);
        form.reset();
        carregarTabela();

    })
    .catch(err => {
        console.error("Erro ao movimentar estoque", err);
        alert("Erro ao movimentar estoque!");
    });
});
