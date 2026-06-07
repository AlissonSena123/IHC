import PacienteService from "../services/pacienteService";

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
            res.status(201).json(paciente);
        } catch (error) {
            res.status(400).json({
                erro: error.message
            });
        }
    }
}