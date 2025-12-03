let res = document.getElementById('resListar');
let btnAtualizarProduto = document.getElementById('btnAtualizarProduto');
let usuarioLogado = document.getElementById('usuarioLogado');

// mostrar usuário
let nomeUser = sessionStorage.getItem('nome');
if (nomeUser) {
    usuarioLogado.innerHTML = `Olá, ${nomeUser}!`;
}

document.getElementById("btnLogout").addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.clear();
    location.href = "../index.html";
});

// ===================== LISTAR PRODUTOS =====================
window.onload = carregarProdutos;

function carregarProdutos() {
    const token = sessionStorage.getItem('token');

    fetch("http://localhost:3000/produto", {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(r => r.json())
    .then(dados => {
         document.getElementById("resListar").innerHTML = gerarTabela(dados)
    })
    .catch(err => console.error("Erro ao listar:", err));
}

// ===================== ATUALIZAR =====================
btnAtualizarProduto.addEventListener('click', (e) => {
    e.preventDefault()

    let id = Number(document.getElementById('id').value)
    let nome = document.getElementById('nome').value
    let descricao = document.getElementById('descricao').value
    let modelo = document.getElementById('modelo').value
    let preco = document.getElementById('preco').value
    let imagem_url = document.getElementById('imagem_url').value

    const dados = { nome, descricao, modelo, preco, imagem_url }

    // remove campos vazios
    for (let key in dados) {
        if (!dados[key]) delete dados[key]
    }

    const token = sessionStorage.getItem('token')

    fetch(`http://localhost:3000/produto/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dados)
    })
    .then(resp => resp.json())
    .then(() => {
        alert("Produto atualizado!")
        document.querySelector('form').reset()
        carregarProdutos()
    })
    .catch(err => console.error("Erro ao atualizar:", err))
})


// ===================== DELETE =====================
document.getElementById('formDelete').addEventListener('submit', async (e) => {
    e.preventDefault()

    let id = Number(document.getElementById('codDelete').value)
    const token = sessionStorage.getItem('token')

    try {
        const resp = await fetch(`http://localhost:3000/produto/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const resultado = await resp.json();

        if (!resp.ok) {
            // Mostra a mensagem de erro do backend
            alert(resultado.erro || "Erro ao apagar produto");
            return;
        }

        alert("Produto apagado com sucesso!");
        carregarProdutos();

    } catch (err) {
        console.error("Erro ao apagar:", err);
        alert("Erro inesperado ao apagar produto");
    }
});
function gerarTabela(dados) {
    let tabela = `
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Modelo</th>
                    <th>Preço</th>
                    <th>Imagem</th>
                </tr>
            </thead>
            <tbody>
    `;

    dados.forEach(item => {
        tabela += `
            <tr>
                <td>${item.codProduto}</td>
                <td>${item.nome}</td>
                <td>${item.descricao}</td>
                <td>${item.modelo}</td>
                <td>${item.preco}</td>
                <td><a href="${item.imagem_url}" target="_blank">Ver</a></td>
            </tr>
        `;
    });

    tabela += `
            </tbody>
        </table>
    `;

    return tabela;
}
