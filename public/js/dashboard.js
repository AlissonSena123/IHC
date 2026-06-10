async function qtdPacientes() {
    const qtd = document.getElementById("countPacientes");

    try {
        const res = await fetch("/api/qtd/pacientes");
        const data = await res.json();

        qtd.innerHTML = data.count;

    } catch (error) {
        console.error("ERRO ao buscar pacientes: ", error);
        qtd.innerHTML = "--";
    }
}

async function qtdProntuarios() {
    const qtd = document.getElementById("countProntuarios");
    try {
        // Assumindo que existe esta rota baseada na estrutura do projeto
        const res = await fetch("/api/qtd/prontuarios");
        const data = await res.json();
        qtd.innerHTML = data.count || 0;
    } catch (error) {
        console.error("ERRO ao buscar prontuários: ", error);
        qtd.innerHTML = "--";
    }
}

async function carregarUsuario() {
    try {
        const response = await fetch("/auth/me", {
            credentials: 'include'
        });

        if (!response.ok) {
            window.location.href = "/";
            return;
        }

        const usuario = await response.json();
        const navWelcome = document.getElementById("navWelcomeText");
        const headerWelcome = document.getElementById("headerWelcomeText");
        if (navWelcome) navWelcome.textContent = `Olá, ${usuario.nome}`;
        if (headerWelcome) headerWelcome.textContent = `Olá, ${usuario.nome}`;

    } catch (error) {
        console.error("Erro na autenticação:", error);
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
        console.error("ERRO ao buscar agenda: ", error);
        qtd.innerHTML = "--";
    }
}

async function carregarResumoAgenda() {

    try {

        const response = await fetch("/api/dashboard");
        const data = await response.json();

        document.getElementById("countConfirmadas").innerHTML = data.confirmadas;

        document.getElementById("countPendentes").innerHTML = data.pendentes;

        document.getElementById("countCanceladas").innerHTML = data.canceladas;

        criarGrafico(data);

    } catch (error) {

        console.error(error);
    }
}

function criarGrafico(dados) {
    const ctx = document.getElementById("graficoStatus");

    new Chart(ctx, {
        type: "doughnut",

        data: {

            labels: [
                "Confirmadas",
                "Pendentes",
                "Canceladas"
            ],

            datasets: [{

                data: [

                    dados.confirmadas,

                    dados.pendentes,

                    dados.canceladas
                ],

                backgroundColor: [

                    "#198754",

                    "#ffc107",

                    "#dc3545"
                ]
            }]
        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom"
                }
            }
        }
    });
}

async function carregarAtividadesRecentes() {
    const lista = document.getElementById("listaRecentes");
    try {
        const res = await fetch("/api/agendamentos/recentes"); // Ajustar para sua rota real
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
                    <span class="badge ${atv.status === 'CONFIRMADA' ? 'bg-success' : 'bg-warning'} bg-opacity-10 ${atv.status === 'CONFIRMADA' ? 'text-success' : 'text-warning'} border ${atv.status === 'CONFIRMADA' ? 'border-success' : 'border-warning'}">
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

// Inicialização
carregarUsuario();
qtdAgenda();
qtdPacientes();
qtdProntuarios();
carregarAtividadesRecentes();
carregarResumoAgenda();

// Exibição da data atual
const dateDisplay = document.getElementById('currentDateDisplay');
if (dateDisplay) {
    dateDisplay.textContent = new Intl.DateTimeFormat('pt-BR', { 
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
    }).format(new Date());
}

document.getElementById("logoutBtn")?.addEventListener("click", () => {
    // Lógica de logout aqui
    window.location.href = "/";
});