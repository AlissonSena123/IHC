const form = document.getElementById("cadastroForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (senha.value !== confirmarSenha.value) {
        mensagem.innerHTML = `
            <div class="alert alert-danger">
                As senhas não coincidem.
            </div>
            `;

        return;
    }

    const body = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
        telefone: document.getElementById("telefone").value,
        perfil: document.getElementById("perfil").value
    };

    const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    mensagem.innerHTML =
        response.ok

            ? `
        <div class="alert alert-success">
            Cadastro realizado!
        </div>
        `

            : `
        <div class="alert alert-danger">
            ${data.erro}
        </div>
        `;

    if(response.ok){
        setTimeout(() => {
            window.location.href = "/"
        }, 3000);
    }
});