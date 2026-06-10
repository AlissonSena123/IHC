// public/js/verProntuario.js

// Pega o paciente_id da URL (/ver/prontuario/5 → id = 5)
const pacienteId = window.location.pathname.split("/").pop();

async function carregarProntuario() {
    const loadingProntuario = document.getElementById("loadingProntuario");
    const prontuarioContent = document.getElementById("prontuarioContent");
    const semProntuario = document.getElementById("semProntuario");
    const statusProntuarioBadge = document.getElementById("statusProntuarioBadge");

    loadingProntuario.classList.remove("d-none");
    prontuarioContent.classList.add("d-none");
    semProntuario.classList.add("d-none");

    try {
        const response = await fetch(`/api/buscar/paciente/${pacienteId}`, {
            credentials: "include"
        });

        if (response.status === 404) {
            semProntuario.classList.remove("d-none");
            loadingProntuario.classList.add("d-none");
            return;
        }

        const prontuario = await response.json();

        document.getElementById("queixaPrincipal").textContent = prontuario.queixa_principal || "—";
        document.getElementById("historicoClinco").innerHTML = prontuario.historico_clinico ? prontuario.historico_clinico.replace(/\n/g, '<br>') : "—";
        document.getElementById("historicoFamiliar").innerHTML = prontuario.historico_familiar ? prontuario.historico_familiar.replace(/\n/g, '<br>') : "—";
        document.getElementById("medicamentos").textContent = prontuario.medicamentos || "—";
        document.getElementById("observacoes").innerHTML = prontuario.observacoes_gerais ? prontuario.observacoes_gerais.replace(/\n/g, '<br>') : "—";
        
        let badgeClass = '';
        switch (prontuario.status) {
            case 'ATIVO': badgeClass = 'bg-success'; break;
            case 'ARQUIVADO': badgeClass = 'bg-secondary'; break;
            case 'EM_ANALISE': badgeClass = 'bg-warning text-dark'; break;
            default: badgeClass = 'bg-info'; break;
        }
        statusProntuarioBadge.textContent = prontuario.status || "N/A";
        statusProntuarioBadge.className = `badge ${badgeClass}`;

        loadingProntuario.classList.add("d-none");
        prontuarioContent.classList.remove("d-none");

    } catch (error) {
        console.error("Erro ao carregar prontuário:", error);
        loadingProntuario.textContent = "Erro ao carregar prontuário.";
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
    const loadingEvolucoes = document.getElementById("loadingEvolucoes");

    loadingEvolucoes.classList.remove("d-none");

    try {
        const response = await fetch(`/api/listar/evolucoes/${pacienteId}`, {
            credentials: "include"
        });
        const evolucoes = await response.json();

        if (!evolucoes || evolucoes.length === 0) {
            lista.innerHTML = `<p class="text-center text-muted py-4 mb-0">Nenhuma evolução registrada ainda.</p>`;
            loadingEvolucoes.classList.add("d-none");
            return;
        }

        lista.innerHTML = evolucoes.map(ev => `
            <div class="list-group-item list-group-item-action py-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span class="fw-bold text-dark">${new Date(ev.data_sessao).toLocaleDateString("pt-BR")}</span>
                    <span class="badge ${ev.status_preenchimento === 'CONCLUIDO' ? 'bg-success' : 'bg-warning text-dark'}">
                        ${ev.status_preenchimento}
                    </span>
                </div>
                <p class="mb-0 text-muted small">${ev.observacoes}</p>
            </div>
        `).join("");

        loadingEvolucoes.classList.add("d-none");

    } catch (error) {
        lista.innerHTML = `<p class="text-danger">Erro ao carregar evoluções.</p>`;
        loadingEvolucoes.classList.add("d-none");
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