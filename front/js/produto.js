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