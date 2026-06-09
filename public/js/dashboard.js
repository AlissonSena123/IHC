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

async function carregarUsuario() {
    try {
        const response = await fetch("/auth/me", {
            credentials: 'include'
        });

        if (!response.ok) {
            // Token inválido ou expirado, manda pro login
            window.location.href = "/";
            return;
        }

        const usuario = await response.json();

        // Usa os dados na tela
        document.getElementById("nomeUsuario").textContent = usuario.nome;
        document.getElementById("perfilUsuario").textContent = usuario.perfil;

    } catch (error) {
        window.location.href = "/";
    }
}

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

carregarUsuario();
qtdAgenda();
qtdPacientes();