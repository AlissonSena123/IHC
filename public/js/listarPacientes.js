async function carregarPacientes() {
    try {
        const res = await fetch("/listar/pacientes");
        const data = await res.json();

        const tabela = document.getElementById("tabelaPacientes");
        tabela.innerHTML = "";

        data.forEach(p => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <tr>
                    <td>${p.nome} ${p.sobrenome || ''}</td>
                    <td>${p.email}</td>
                    <td>${p.telefone || '---'}</td>
                    <td>${p.CPF || '---'}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-danger" data-id="${p.id}">
                            <i class="ph ph-trash"></i>
                        </button>
                    </td>
                </tr>
            `;

            tr.querySelector("button").addEventListener("click", () => excluirPaciente(p.id));
            tabela.appendChild(tr);
        });
    } catch (error) {
        console.error(error);
    }
}

async function excluirPaciente(id) {
    const confirmado = confirm("Tem certeza que deseja excluir este paciente?");
    
    if (!confirmado) return;

    const res = await fetch(`/deletar/paciente/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (data.success) {
        alert("Paciente excluído com sucesso!");
        carregarPacientes();
    } else {
        alert("Erro ao excluir paciente.");
    }
}

carregarPacientes();

