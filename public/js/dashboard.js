/**
 * Carrega os dados do usuário logado e atualiza as saudações.
 */
async function carregarUsuario() {
    try {
        const response = await fetch("/auth/me", { credentials: 'include' });

        if (!response.ok) {
            window.location.href = "/";
            return;
        }

        const usuario = await response.json();
        const navWelcome = document.getElementById("navWelcomeText");
        const headerWelcome = document.getElementById("headerWelcomeText");
        
        const saudacao = `Olá, ${usuario.nome}`;
        if (navWelcome) navWelcome.textContent = saudacao;
        if (headerWelcome) headerWelcome.textContent = saudacao;

    } catch (error) {
        console.error("Erro na autenticação:", error);
        window.location.href = "/";
    }
}

/**
 * Busca a quantidade total de prontuários (esta informação não vem no resumo do dashboard).
 */
async function carregarQtdProntuario() {
    const el = document.getElementById("countProntuarios");
    try {
        const res = await fetch("/api/qtd/prontuario");
        const data = await res.json();
        if (el) el.textContent = data.count ?? 0;
    } catch (error) {
        console.error("Erro ao buscar prontuários:", error);
        if (el) el.textContent = "--";
    }
}

/**
 * Carrega o resumo estatístico (Pacientes, Agendas e Status) e inicializa o gráfico.
 */
async function carregarDadosDashboard() {
    try {
        const response = await fetch("/api/dashboard");
        const data = await response.json();

        // Helper para atualizar texto com segurança
        const updateText = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val ?? 0;
        };

        // Atualiza todos os cards com os dados retornados pelo serviço de dashboard
        updateText("countPacientes", data.totalPacientes);
        updateText("countAgendamentos", data.totalAgendamentos);
        updateText("countConfirmadas", data.confirmadas);
        updateText("countPendentes", data.pendentes);
        updateText("countCanceladas", data.canceladas);

        if (data.totalAgendamentos > 0) {
            criarGrafico(data);
        }
    } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
    }
}

function criarGrafico(dados) {
    const ctx = document.getElementById("graficoStatus");
    if (!ctx) return;

    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Confirmadas", "Pendentes", "Canceladas"],
            datasets: [{
                data: [dados.confirmadas, dados.pendentes, dados.canceladas],
                backgroundColor: ["#198754", "#ffc107", "#dc3545"]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: "bottom" }
            }
        }
    });
}

/**
 * Carrega as atividades recentes para a tabela.
 */
async function carregarAtividadesRecentes() {
    const lista = document.getElementById("listaRecentes");
    if (!lista) return;

    try {
        const res = await fetch("/api/agendamentos/recentes"); 
        const atividades = await res.json();

        if (!atividades || atividades.length === 0) {
            lista.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-muted">Nenhuma atividade agendada.</td></tr>`;
            return;
        }

        lista.innerHTML = atividades.slice(0, 5).map(atv => `
            <tr>
                <td class="ps-4 fw-medium">${atv.titulo}</td>
                <td class="align-middle">
                    <div class="small text-dark fw-bold">${new Date(atv.data_sessao).toLocaleDateString('pt-BR')}</div>
                    <div class="small text-muted">${atv.horario_inicio}</div>
                </td>
                <td>
                    <span class="badge ${atv.status === 'CONFIRMADA' ? 'bg-success text-success' : 'bg-warning text-warning'} bg-opacity-10 border">
                        ${atv.status}
                    </span>
                </td>
                <td class="text-end pe-4">
                    <a href="/listar/agendamento" class="btn btn-sm btn-light text-success">
                        <i class="ph ph-eye"></i>
                    </a>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        lista.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-danger small">Não foi possível carregar as atividades.</td></tr>`;
    }
}

/**
 * Inicializa todos os componentes do Dashboard de forma otimizada.
 */
function inicializar() {
    // Exibição da data atual
    const dateDisplay = document.getElementById('currentDateDisplay');
    if (dateDisplay) {
        dateDisplay.textContent = new Intl.DateTimeFormat('pt-BR', { 
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
        }).format(new Date());
    }

    // Dispara todas as buscas em paralelo para performance máxima
    Promise.allSettled([
        carregarUsuario(),
        carregarDadosDashboard(),
        carregarQtdProntuario(),
        carregarAtividadesRecentes()
    ]);
}

document.getElementById("logoutBtn")?.addEventListener("click", () => {
    window.location.href = "/";
});

// Inicia o processamento
inicializar();