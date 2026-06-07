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

    const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type":"application/json"},
        body: JSON.stringify({
            nome: nome.value,
            email: email.value,
            senha: senha.value,
            perfil: perfil.value
        })
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
});