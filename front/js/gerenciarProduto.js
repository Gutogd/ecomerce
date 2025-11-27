let res = document.getElementById('resListar')
let btnAtualizarProduto = document.getElementById('btnAtualizarProduto')

let nome = sessionStorage.getItem('nome');
if (nome) {
    usuarioLogado.innerHTML = `Olá, ${nome}!`;
}

btnAtualizarProduto.addEventListener('click', (e) => {
    e.preventDefault()

    let id = Number(document.getElementById('id').value)
    let nome = document.getElementById('nome').value
    let descricao = document.getElementById('descricao').value
    let modelo = document.getElementById('modelo').value
    let preco = document.getElementById('preco').value
    let imagem_url = document.getElementById('imagem_url').value

    const dados = {
        nome: nome,
        descricao: descricao,
        modelo: modelo,
        preco: preco,
        imagem_url: imagem_url
    }

    for (let key in dados) {
        if (dados[key] === "" || dados[key] === null) {
            delete dados[key];
        }
    }

    fetch(`http://localhost:3000/produto/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dados)
    })
        .then(resp => {
            if (!resp.ok) {
                throw new Error("Erro ao atualizar!");
            }
            return resp.json();
        })

        .then(dados => {
            alert('Produto atualizado com sucesso!')
            document.querySelector('form').reset()
            onload()
        })
        .catch((err) => {
            console.error('Falha ao atualizar produto!', err)
            alert('Falha ao atualizar produto!')
        })
})

let btnDelete = document.getElementById('btnDelete')

document.getElementById('formDelete').addEventListener('submit', (e) => {
    e.preventDefault()

    let id = Number(document.getElementById('id').value)

    if (!id) {
        alert("Informe um código válido!")
        return
    }

    if (!confirm("Tem certeza que deseja excluir este produto?")) return

    fetch(`http://localhost:3000/produto/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(resp => {
            if (!resp.ok) throw new Error("Erro ao apagar!")
            return resp.json()
        })
        .then(() => {
            alert('Produto apagado com sucesso!')
            document.getElementById('formDelete').reset()
            onload() // atualiza a tabela
        })
        .catch(err => {
            console.error('Erro ao apagar produto!', err)
            alert('Falha ao apagar produto!')
        })
})

// Escrever nome na tela
if (nomeUsuario && nome) {
    nomeUsuario.innerHTML = `Usuário: ${nome}`
}

// Logout
btnLogout.addEventListener('click', (e) => {
    e.preventDefault()

    // Apagar sessão
    sessionStorage.clear()

    // Voltar para login
    location.href = '../index.html'
})


function gerarTabela(dados) {
    let tab = `
        <thead>
            <th>Código</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Modelo</th>
            <th>Preço</th>
            <th>Imagem (link)</th>
        </thead>
    `
tab += `<tbody>`
    dados.forEach(dad => {
        tab += `
            <tr>
                <td>${dad.codProduto}</td>
                <td>${dad.nome}</td>
                <td>${dad.descricao}</td>
                <td>${dad.modelo}</td>
                <td>${dad.preco}</td>
                <td>${dad.imagem_url}</td>
            </tr>
        `
    })
    tab += `</tbody>`

    return tab
}