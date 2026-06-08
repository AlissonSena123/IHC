const prontuarioForm = document.getElementById("prontuarioForm");

async function carregarPacientes() {
    try {
        const response = await fetch("/api/listar/pacientes");

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

prontuarioForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const dados = {
        paciente_id: Number(document.getElementById("paciente").value),
        queixa_principal: document.getElementById("queixa_principal").value,
        historico_clinico: document.getElementById("historico_clinico").value,
        historico_familiar: document.getElementById("historico_social").value,
        medicamentos: document.getElementById("medicamentos").value,
        status: document.getElementById("status").value,
        observacoes_gerais: document.getElementById("observacoes").value
    };

    try {
        const response = await fetch("/api/criar/prontuarios", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(dados)
        });

        const resultado = await response.json();

        if (response.ok) {
            alert("Prontuario criado com sucesso!");
            prontuarioForm.reset();
            window.location.href = "/dashboard"
        } else {
            alert(resultado.erro || "Erro ao criar prontuario.");
        }

    } catch (error) {
        console.error(error);
        alert("Erro ao conectar com o servidor.");
    }
});