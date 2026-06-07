async function carregar() {

    const response = await fetch("/api/agendamentos");

    const dados = await response.json();

    const tabela = document.getElementById("tabelaAgendamentos");

    tabela.innerHTML = "";

    dados.forEach(item => {
        tabela.innerHTML += `
        <tr>

            <td>${item.titulo}</td>

            <td>

                <span class="badge bg-${getCor(item.status)
            }">

                    ${item.status}

                </span>

            </td>

            <td>
                ${item.data_inicio}
            </td>

            <td>
                ${item.data_fim}
            </td>

            <td>

                <a
                href="/agendamento-editar?id=${item.id}"
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

window.excluir = async function (id) {
    const confirmar = confirm("Deseja excluir?");

    if (!confirmar)
        return;

    const response = await fetch(`/api/agendamentos/${id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        carregar();
    } else {
        alert(
            "Erro ao excluir"
        );
    }
};

carregar();