import PacienteService from "../services/pacienteService.js";

export default class PacienteController {
    static async listarPacientes(req, res) {
        try {
            const pacientes = await PacienteService.lista();
            res.json(pacientes);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async cadastrarPacientes(req, res) {
        try {
            const pacientes = await PacienteService.cadastro(req.body);

            if (pacientes) {
                res.status(201).json({ success: true });
            } else {
                res.status(400).json({ erro: "Não foi possível cadastrar o paciente." });
            }
        } catch (error) {
            res.status(400).json({
                erro: error.message
            });
        }
    }

    static async listarQuantidadeDePacientes(req, res) {
        try {
            const qtdPacientes = await PacienteService.quantPaciente();
            return res.status(200).json({ count: qtdPacientes });;
        } catch (error) {
            console.log("Erro: ", error);
            res.status(500).json({ erro: error.message });
        }
    }

    static async deletarPaciente(req, res) {
        try {
            await PacienteService.deletar(req.params.id);
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
}