// public/js/verProntuario.js

// Pega o paciente_id da URL (/ver/prontuario/5 → id = 5)
const pacienteId = window.location.pathname.split("/").pop();

async function carregarProntuario() {
    try {
        const response = await fetch(`/api/buscar/paciente/${pacienteId}`, {
            credentials: "include"
        });

        if (response.status === 404) {
            document.getElementById("dadosProntuario").classList.add("d-none");
            document.getElementById("semProntuario").classList.remove("d-none");
            return;
        }

        const prontuario = await response.json();

        document.getElementById("queixaPrincipal").textContent = prontuario.queixa_principal || "—";
        document.getElementById("historicoClinco").textContent = prontuario.historico_clinico || "—";
        document.getElementById("historicoFamiliar").textContent = prontuario.historico_familiar || "—";
        document.getElementById("medicamentos").textContent = prontuario.medicamentos || "—";
        document.getElementById("observacoes").textContent = prontuario.observacoes_gerais || "—";
        document.getElementById("statusProntuario").textContent = prontuario.status || "—";

    } catch (error) {
        console.error("Erro ao carregar prontuário:", error);
    }
}

async function carregarNomePaciente() {
    try {
        const response = await fetch(`/api/listar/pacientes`, {
            credentials: "include"
        });
        const pacientes = await response.json();
        const paciente = pacientes.find(p => p.id === Number(pacienteId));

        if (paciente) {
            document.getElementById("nomePaciente").textContent =
                `${paciente.nome} ${paciente.sobrenome}`;
        }
    } catch (error) {
        console.error("Erro ao carregar paciente:", error);
    }
}

async function carregarEvolucoes() {
    const lista = document.getElementById("listaEvolucoes");

    try {
        const response = await fetch(`/api/listar/evolucoes/${pacienteId}`, {
            credentials: "include"
        });
        const evolucoes = await response.json();

        if (!evolucoes || evolucoes.length === 0) {
            lista.innerHTML = `<p class="text-muted">Nenhuma evolução registrada ainda.</p>`;
            return;
        }

        lista.innerHTML = evolucoes.map(ev => `
            <div class="border-bottom p-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span class="fw-bold">${new Date(ev.data_sessao).toLocaleDateString("pt-BR")}</span>
                    <span class="badge ${ev.status_preenchimento === 'CONCLUIDO' ? 'bg-success' : 'bg-warning text-dark'}">
                        ${ev.status_preenchimento}
                    </span>
                </div>
                <p class="mb-0 text-secondary">${ev.observacoes}</p>
            </div>
        `).join("");

    } catch (error) {
        lista.innerHTML = `<p class="text-danger">Erro ao carregar evoluções.</p>`;
    }
}

document.getElementById("salvarEvolucao").addEventListener("click", async () => {
    const dados = {
        paciente_id: Number(pacienteId),
        data_sessao: document.getElementById("dataSessao").value,
        observacoes: document.getElementById("observacoesEvolucao").value,
        status_preenchimento: document.getElementById("statusEvolucao").value
    };

    if (!dados.data_sessao || !dados.observacoes) {
        alert("Preencha a data e as observações.");
        return;
    }

    try {
        const response = await fetch("/api/criar/evolucoes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            // Fecha o modal e recarrega as evoluções
            bootstrap.Modal.getInstance(document.getElementById("modalEvolucao")).hide();
            document.getElementById("dataSessao").value = "";
            document.getElementById("observacoesEvolucao").value = "";
            carregarEvolucoes();
        } else {
            const erro = await response.json();
            alert(erro.erro || "Erro ao salvar evolução.");
        }

    } catch (error) {
        alert("Erro ao conectar com o servidor.");
    }
});

// Inicia tudo
carregarProntuario();
carregarNomePaciente();
carregarEvolucoes();