// public/js/listarProntuarios.js

async function carregarProntuarios() {
    const tabela = document.getElementById("tabelaProntuarios");
    const loadingMessage = document.getElementById("loadingMessage");

    loadingMessage.textContent = "Carregando prontuários...";
    loadingMessage.parentNode.classList.remove("d-none"); // Mostra a linha de carregamento

    const filtroNomePaciente = document.getElementById("filtroNomePaciente")?.value.toLowerCase().trim() || "";
    const filtroStatus = document.getElementById("filtroStatus")?.value || "";

    try {
        // Busca todos os pacientes
        const responsePacientes = await fetch("/api/listar/pacientes", {
            credentials: "include"
        });
        const pacientes = await responsePacientes.json();

        const linhasPromises = pacientes.map(async (p) => {
            // Filtra por nome do paciente
            const nomeCompleto = `${p.nome} ${p.sobrenome}`.toLowerCase();
            if (filtroNomePaciente && !nomeCompleto.includes(filtroNomePaciente)) {
                return null;
            }

            const resPront = await fetch(`/api/buscar/paciente/${p.id}`, {
                credentials: "include"
            });

            // Se não tem prontuário, ou erro 404, pula
            if (resPront.status === 404) return null;

            const prontuario = await resPront.json();
            if (!prontuario) return null;

            // Filtra por status do prontuário
            if (filtroStatus && prontuario.status !== filtroStatus) {
                return null;
            }

            let badgeHtml = '';
            switch (prontuario.status) {
                case "ATIVO":
                    badgeHtml = `<span class="badge bg-success">Ativo</span>`;
                    break;
                case "ARQUIVADO":
                    badgeHtml = `<span class="badge bg-secondary">Arquivado</span>`;
                    break;
                case "EM_ANALISE":
                    badgeHtml = `<span class="badge bg-warning text-dark">Em Análise</span>`;
                    break;
                default:
                    badgeHtml = `<span class="badge bg-info">${prontuario.status || 'N/A'}</span>`;
            }

            return `
                <tr>
                    <td class="ps-4">${p.nome} ${p.sobrenome}</td>
                    <td>${prontuario.queixa_principal || "—"}</td>
                    <td>${badgeHtml}</td>
                    <td class="text-center pe-4">
                        <a href="/ver/prontuario/${p.id}" class="btn btn-outline-success btn-sm">
                            <i class="ph ph-eye"></i> Visualizar
                        </a>
                    </td>
                </tr>`;
        });

        const linhas = await Promise.all(linhasPromises);
        const linhasFiltradas = linhas.filter(l => l !== null);

        // Extrair dados para os contadores do relatório
        const prontuariosData = [];
        // Re-executar um processamento simples para contagem ou usar o resultado das promises
        // Para este relatório, vamos contar baseado no que foi renderizado ou nos objetos reais
        // Como o código atual é focado em UI, vamos extrair os status dos resultados válidos

        if (linhasFiltradas.length > 0) {
            tabela.innerHTML = linhasFiltradas.join("");
        } else {
            tabela.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-muted">Nenhum prontuário encontrado com os filtros aplicados.</td></tr>`;
        }

        // Atualiza os contadores no topo da página
        document.getElementById("totalProntuarios").textContent = linhasFiltradas.length;
        document.getElementById("totalAtivos").textContent = linhasFiltradas.filter(l => l.includes('bg-success')).length;
        document.getElementById("totalAnalise").textContent = linhasFiltradas.filter(l => l.includes('bg-warning')).length;
        document.getElementById("totalArquivados").textContent = linhasFiltradas.filter(l => l.includes('bg-secondary')).length;

    } catch (error) {
        console.error("Erro ao carregar prontuários:", error);
        tabela.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-danger">Erro ao carregar prontuários.</td></tr>`;
    } finally {
        loadingMessage.parentNode.classList.add("d-none"); // Esconde a linha de carregamento
    }
}

async function carregarUsuario() {
    try {
        const response = await fetch("/auth/me", { credentials: 'include' });
        if (!response.ok) {
            window.location.href = "/";
            return;
        }
        const usuario = await response.json();
        document.getElementById("navWelcomeText").textContent = `Olá, ${usuario.nome}`;
    } catch (error) {
        console.error("Erro na autenticação:", error);
        window.location.href = "/";
    }
}

// Event Listeners para os filtros
document.getElementById("filtroNomePaciente")?.addEventListener("input", carregarProntuarios);
document.getElementById("filtroStatus")?.addEventListener("change", carregarProntuarios);
document.getElementById("btnLimparFiltros")?.addEventListener("click", () => {
    document.getElementById("filtroNomePaciente").value = "";
    document.getElementById("filtroStatus").value = "";
    carregarProntuarios();
});

// Inicialização
carregarUsuario();
carregarProntuarios();