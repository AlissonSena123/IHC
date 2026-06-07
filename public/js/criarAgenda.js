const form = document.getElementById("agendamentoForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = {
        titulo: document.getElementById("titulo").value,
        paciente_id: document.getElementById("paciente_id").value,
        psicologo_id: document.getElementById("psicologo_id").value,
        data_inicio: document.getElementById("data_inicio").value,
        data_fim: document.getElementById("data_fim").value,
        status: document.getElementById("status").value
    };

    const response = await fetch("/api/agendamentos", {
        method: "POST",
        headers: { "Content-Type":"application/json"},
        body: JSON.stringify(dados)
    });

    if (response.ok) {
        alert("Agendamento criado!");
        window.location.href = "/agendamentos";

    } else {
        const erro = await response.json();
        alert(erro.erro);
    }
});