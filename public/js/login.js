const form = document.getElementById("loginForm");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    mensagem.innerHTML = "";

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    try {

        const response = await fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                senha
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.erro || "Erro ao realizar login");
        }

        mensagem.innerHTML = `
            <div class="alert alert-success">
                Login realizado com sucesso!
            </div>
        `;

        setTimeout(() => {
            window.location.href =
                "/dashboard";
        }, 1000);

    } catch (error) {

        mensagem.innerHTML = `
            <div class="alert alert-danger">
                ${error.message}
            </div>
        `;
    }
});