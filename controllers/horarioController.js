const banco = require('../model/bancoMemoria');
const HorarioDisponivel = require('../model/horarioDisponivel');

function cadastrarHorario(req, res) {
  const { atendenteId, data, hora } = req.body;
  if (!atendenteId || !data || !hora) {
    return res.status(400).json({ erro: 'Campos obrigatórios: atendenteId, data, hora' });
  }
  // Verifica se atendente existe
  if (!banco.atendentes.find(a => a.id == atendenteId)) {
    return res.status(404).json({ erro: 'Atendente não encontrado' });
  }
  // Não permite horários passados
  const hoje = new Date();
  const dataHora = new Date(`${data}T${hora}`);
  if (dataHora < hoje) {
    return res.status(400).json({ erro: 'Não é permitido cadastrar horários em datas passadas' });
  }
  // Não permite duplicidade
  if (banco.horarios_disponiveis.find(h => h.atendenteId == atendenteId && h.data === data && h.hora === hora)) {
    return res.status(409).json({ erro: 'Horário já cadastrado para este atendente' });
  }
  const id = banco.horarios_disponiveis.length + 1;
  const horario = new HorarioDisponivel(id, atendenteId, data, hora);
  banco.horarios_disponiveis.push(horario);
  res.status(201).json(horario);
}

function listarHorarios(req, res) {
  const { atendenteId } = req.query;
  let horarios = banco.horarios_disponiveis;
  if (atendenteId) {
    horarios = horarios.filter(h => h.atendenteId == atendenteId);
  }
  res.json(horarios);
}

module.exports = { cadastrarHorario, listarHorarios };
