async function qtdPacientes() {
    const qtd = document.getElementById("countPacientes");

    try {
        const res = await fetch("/api/qtd/pacientes");
        const data = await res.json();

        qtd.innerHTML = data.count;

    } catch (error) {
        console.log("ERRO: ", error)
    }
}

async function qtdAgenda() {
    const qtd = document.getElementById("countAgendamentos");

    try {
        const res = await fetch("/api/qtd/agendamentos");
        const data = await res.json();

        qtd.innerHTML = data.count;

    } catch (error) {
        console.log("ERRO: ", error)
    }
}

qtdAgenda();
qtdPacientes();