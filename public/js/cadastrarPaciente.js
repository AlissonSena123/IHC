const pacienteForm = document.getElementById("pacienteForm");

pacienteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const pacienteInfo = {
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        CPF: document.getElementById("cpf").value,
        data: document.getElementById("data_nascimento").value,
        endereco: document.getElementById("endereco").value
    }

    if (!pacienteInfo.nome || !pacienteInfo.email || !pacienteInfo.CPF) {
        alert("Preencha todos os campos");
        return;
    }

    try {
        const res = await fetch("/cadastrar/paciente", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(pacienteInfo)
        });

        const data = await res.json();

        if (data.success) {
            alert("Paciente cadastrado com sucesso");
            setTimeout(() => {
                window.location.href = "/dashboard"
            }, 3000);
        } else {
            alert("Erro ao cadastrar paciente");
        }
    } catch (error) {
        console.error(error);
    }
})