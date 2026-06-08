const form = document.getElementById("agendamentoForm");

async function carregarPacientes() {
    try {
        const response = await fetch("/listar/pacientes");

        if (!response.ok) {
            throw new Error("Erro ao buscar pacientes");
        }

        const pacientes = await response.json();

        const select = document.getElementById("paciente");

        select.innerHTML = '<option value="">Selecione um paciente</option>';

        pacientes.forEach((paciente) => {
            select.innerHTML += `
                <option value="${paciente.id}">
                    ${paciente.nome + " " + paciente.sobrenome}
                </option>
            `;
        });

    } catch (error) {
        console.error(error);
        alert("Erro ao carregar pacientes.");
    }
}

carregarPacientes();

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const dados = {
        titulo: document.getElementById("titulo").value,
        paciente_id: Number(document.getElementById("paciente").value),
        data_sessao: document.getElementById("data_sessao").value,
        horario_inicio: document.getElementById("horario_inicio").value,
        horario_fim: document.getElementById("horario_fim").value,
        status: document.getElementById("status").value,
        descricao: document.getElementById("descricao").value
    };

    try {
        const response = await fetch("/api/criar/agendamentos", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(dados)
        });

        const resultado = await response.json();

        if (response.ok) {
            alert("Agendamento criado com sucesso!");
            form.reset();
        } else {
            alert(resultado.erro || "Erro ao criar agendamento.");
        }

    } catch (error) {
        console.error(error);
        alert("Erro ao conectar com o servidor.");
    }
});