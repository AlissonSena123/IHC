async function carregar() {

    const response = await fetch("/api/listar/agendamentos");
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

    const tabela = document.getElementById("tabelaAgendamentos");

    tabela.innerHTML = "";

    if (filtrados.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">
                    Nenhum agendamento encontrado
                </td>
            </tr>
        `;

        return;
    }

    filtrados.forEach(item => {

        tabela.innerHTML += `
        <tr>

            <td>${item.titulo}</td>

            <td>
                <span class="badge bg-${getCor(item.status)}">
                    ${item.status}
                </span>
            </td>

            <td>
                ${item.data_sessao}
            </td>

            <td>
                ${item.horario_inicio} - ${item.horario_fim}
            </td>

            <td>
                <a href="/agendamento-editar?id=${item.id}"
                    class="btn btn-warning btn-sm">
                    Editar
                </a>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="excluir('${item.id}')">
                    Excluir
                </button>
            </td>

        </tr>
        `;
    });
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
document.getElementById("filtroData")?.addEventListener("change", carregar);
window.excluir = excluir;
carregar();