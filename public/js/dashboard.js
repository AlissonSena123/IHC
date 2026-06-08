async function qtdPacientes() {
    const qtd = document.getElementById("countPacientes");

    try {
        const res = await fetch("/api/qtd/pacientes");
        const data = await res.json();

        qtd.innerHTML = data.count;

    } catch (error) {
        console.log("ERRO: ", error)
    }
}

<<<<<<< HEAD
async function carregarUsuario() {
    try {
        const response = await fetch("/auth/me", {
            credentials: 'include'
        });

        if (!response.ok) {
            // Token inválido ou expirado, manda pro login
            window.location.href = "/login";
            return;
        }

        const usuario = await response.json();

        // Usa os dados na tela
        document.getElementById("nomeUsuario").textContent = usuario.nome;
        document.getElementById("perfilUsuario").textContent = usuario.perfil;

    } catch (error) {
        window.location.href = "/login";
    }
}

carregarUsuario();
=======
async function qtdAgenda() {
    const qtd = document.getElementById("countAgendamentos");

    try {
        const res = await fetch("/api/qtd/agendamentos");
        const data = await res.json();

        qtd.innerHTML = data.count;

    } catch (error) {
        console.log("ERRO: ", error)
    }
}

qtdAgenda();
>>>>>>> c7f6288fef35e2d3f92eea395db01c254b6b4244
qtdPacientes();