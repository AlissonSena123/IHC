async function carregar() {
    const response = await fetch("/api/listar/agendamentos", { credentials: "include" });
    const dados = await response.json();

    const filtroTitulo =
        document.getElementById("filtroTitulo")?.value
            .toLowerCase()
            .trim() || "";

    const filtroStatus =
        document.getElementById("filtroStatus")?.value || "";

    const filtroData =
        document.getElementById("filtroData")?.value || "";

    const filtrados = dados.filter(item => {

        const tituloOk =
            !filtroTitulo ||
            item.titulo.toLowerCase().includes(filtroTitulo);

        const statusOk =
            !filtroStatus ||
            item.status === filtroStatus;

        const dataOk =
            !filtroData ||
            item.data_sessao === filtroData;

        return tituloOk && statusOk && dataOk;
    });

    // Atualizar Contadores do Relatório
    document.getElementById("totalGeral").textContent = filtrados.length;
    document.getElementById("totalConfirmadas").textContent = filtrados.filter(i => i.status === "CONFIRMADA").length;
    document.getElementById("totalPendentes").textContent = filtrados.filter(i => i.status === "PENDENTE").length;
    document.getElementById("totalCanceladas").textContent = filtrados.filter(i => i.status === "CANCELADA").length;

    const tabela = document.getElementById("tabelaAgendamentos");
    if (filtrados.length === 0) {
        tabela.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">Nenhum registro encontrado.</td></tr>`;
        return;
    }

    tabela.innerHTML = filtrados.map(item => {
        const pacienteNome = item.paciente ? `${item.paciente.nome} ${item.paciente.sobrenome}` : "Não Informado";
        const dataFormatada = new Date(item.data_sessao).toLocaleDateString('pt-BR');

        return `
            <tr>
                <td class="ps-4 fw-medium">${pacienteNome}</td>
                <td>${item.titulo}</td>
                <td class="text-center">
                    <span class="badge bg-${getCor(item.status)}">
                        ${item.status}
                    </span>
                </td>
                <td>${dataFormatada}</td>
                <td class="text-center">
                    ${item.horario_inicio} - ${item.horario_fim}
                </td>
                <td class="text-center no-print">
                    <div class="btn-group">
                        <a href="/agendamento-editar?id=${item.id}"
                            class="btn btn-warning btn-sm shadow-sm">
                            <i class="ph ph-pencil"></i>
                        </a>
                        <button
                            class="btn btn-danger btn-sm shadow-sm"
                            onclick="excluir('${item.id}')">
                            <i class="ph ph-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function getCor(status) {

    switch (status) {

        case "CONFIRMADA":
            return "success";

        case "PENDENTE":
            return "warning";

        case "CANCELADA":
            return "danger";

        case "REALIZADA":
            return "primary";

        default:
            return "secondary";
    }
}

async function excluir(id) {
    const confirmar = confirm("Deseja excluir essa agenda?")

    if (!confirmar) return;

    try {
        const res = await fetch(`/api/deletar/agendamentos/${id}`, {
            method: "DELETE"
        });

        const data = await res.json();

        if (data.success) {
            alert(data.mensagem);
            carregar();
        } else {
            alert("Erro ao excluir")
        }
    } catch (error) {
        console.error(error);
    }
}

document.getElementById("filtroTitulo")?.addEventListener("input", carregar);
document.getElementById("filtroStatus")?.addEventListener("change", carregar);
document.getElementById("filtroData")?.addEventListener("input", carregar);

document.getElementById("btnLimpar")?.addEventListener("click", () => {
    document.getElementById("filtroTitulo").value = "";
    document.getElementById("filtroStatus").value = "";
    document.getElementById("filtroData").value = "";
    carregar();
});

window.excluir = excluir;
carregar();