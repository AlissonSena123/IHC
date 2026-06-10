const cores = {
    PENDENTE: "#ffc107",
    CONFIRMADA: "#198754",
    CANCELADA: "#dc3545"
};

document.addEventListener("DOMContentLoaded", async () => {

    const calendarEl = document.getElementById("calendar");

    try {

        const response = await fetch("/api/listar/agendamentos");

        if (!response.ok) {
            throw new Error("Erro ao carregar agendamentos");
        }

        const agendamentos = await response.json();

        const eventos = agendamentos.map((agendamento) => ({
            id: agendamento.id,
            title: `${agendamento.titulo}`,
            start: `${agendamento.data_sessao}T${agendamento.horario_inicio}`,
            end: `${agendamento.data_sessao}T${agendamento.horario_fim}`,
            color: cores[agendamento.status] || "#0d6efd",
            extendedProps: {
                paciente: `${agendamento.paciente?.nome || ""} ${agendamento.paciente?.sobrenome || ""}`.trim(),
                status: agendamento.status,
                descricao: agendamento.descricao
            }
        }));

        const calendar = new FullCalendar.Calendar(calendarEl, {
            locale: "pt-br",
            initialView: "dayGridMonth",
            height: "auto",
            headerToolbar: {
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay"
            },
            events: eventos,
            eventClick(info) {
                const evento = info.event;
                const props = evento.extendedProps;

                // Preencher o modal com as informações do evento
                document.getElementById('infoTitulo').textContent = evento.title;
                document.getElementById('infoPaciente').textContent = props.paciente;
                document.getElementById('infoData').textContent = new Date(evento.start).toLocaleDateString('pt-BR');
                
                const options = { hour: '2-digit', minute: '2-digit' };
                const inicio = evento.start.toLocaleTimeString('pt-BR', options);
                const fim = evento.end ? evento.end.toLocaleTimeString('pt-BR', options) : '--:--';
                document.getElementById('infoHorario').textContent = `${inicio} - ${fim}`;

                const statusBadge = document.getElementById('infoStatus');
                statusBadge.textContent = props.status;
                statusBadge.className = 'badge';
                
                if (props.status === 'CONFIRMADA') statusBadge.classList.add('bg-success');
                else if (props.status === 'PENDENTE') statusBadge.classList.add('bg-warning', 'text-dark');
                else if (props.status === 'CANCELADA') statusBadge.classList.add('bg-danger');
                else statusBadge.classList.add('bg-secondary');

                document.getElementById('infoDescricao').textContent = props.descricao || 'Sem descrição';

                // Mostrar o modal usando a instância global do Bootstrap
                const modal = new bootstrap.Modal(document.getElementById('modalDetalhes'));
                modal.show();
            }
        });

        calendar.render();

    } catch (error) {

        console.error(error);

        calendarEl.innerHTML = `
            <div class="alert alert-danger">
                Erro ao carregar calendário.
            </div>
        `;
    }
});