async function qtdPacientes() {
    const qtd = document.getElementById("countPacientes");

    try {
        const res = await fetch("/qtd/pacientes");
        const data = await res.json();

        qtd.innerHTML = data.count;

    } catch (error) {
        console.log("ERRO: ", error)
    }
}

qtdPacientes();