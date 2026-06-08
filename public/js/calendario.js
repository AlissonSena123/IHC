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

        console.log(agendamentos);

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
                alert(`
                Título: ${evento.title} 
                Paciente: ${evento.extendedProps.paciente}
                Status: ${evento.extendedProps.status} 
                Descrição: ${evento.extendedProps.descricao || "Sem descrição"}
                `);
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