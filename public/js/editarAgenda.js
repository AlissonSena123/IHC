// Pega o id da URL (/agendamento-editar?id=5 → id = 5)
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Se não tiver id na URL, volta pra lista
if (!id) window.location.href = "/listar/agendamento";

async function carregarAgendamento() {
    try {
        const response = await fetch("/api/listar/agendamentos", {
            credentials: "include"
        });
        const agendamentos = await response.json();

        // Acha o agendamento pelo id
        const agendamento = agendamentos.find(a => String(a.id) === String(id));

        if (!agendamento) {
            alert("Agendamento não encontrado.");
            window.location.href = "/listar/agendamento";
            return;
        }

        // Preenche o formulário com os dados atuais
        document.getElementById("titulo").value = agendamento.titulo;
        document.getElementById("status").value = agendamento.status;
        document.getElementById("data_sessao").value = agendamento.data_sessao;
        document.getElementById("horario_inicio").value = agendamento.horario_inicio;
        document.getElementById("horario_fim").value = agendamento.horario_fim;

    } catch (error) {
        console.error("Erro ao carregar agendamento:", error);
    }
}

document.getElementById("btnSalvar").addEventListener("click", async () => {
    const dados = {
        titulo: document.getElementById("titulo").value,
        status: document.getElementById("status").value,
        data_sessao: document.getElementById("data_sessao").value,
        horario_inicio: document.getElementById("horario_inicio").value,
        horario_fim: document.getElementById("horario_fim").value
    };

    if (!dados.titulo || !dados.data_sessao || !dados.horario_inicio || !dados.horario_fim) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    try {
        const response = await fetch(`/api/atualizar/agendamentos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            alert("Agendamento atualizado com sucesso!");
            window.location.href = "/listar/agendamento";
        } else {
            const erro = await response.json();
            alert(erro.erro || "Erro ao atualizar agendamento.");
        }

    } catch (error) {
        alert("Erro ao conectar com o servidor.");
    }
});

carregarAgendamento();