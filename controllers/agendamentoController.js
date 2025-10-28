const banco = require('../model/bancoMemoria');
const Agendamento = require('../model/agendamento');

function cadastrarAgendamento(req, res) {
  const { atendenteId, data, hora } = req.body;
  const clienteId = req.usuario.id;
  if (!atendenteId || !data || !hora) {
    return res.status(400).json({ erro: 'Campos obrigatórios: atendenteId, data, hora' });
  }
  // Verifica se atendente existe
  if (!banco.atendentes.find(a => a.id == atendenteId)) {
    return res.status(404).json({ erro: 'Atendente não encontrado' });
  }
  // Não permite agendamento em datas passadas
  const hoje = new Date();
  const dataHora = new Date(`${data}T${hora}`);
  if (dataHora < hoje) {
    return res.status(400).json({ erro: 'Não é permitido agendar em datas passadas' });
  }
  // Verifica se horário está disponível
  if (!banco.horarios_disponiveis.find(h => h.atendenteId == atendenteId && h.data === data && h.hora === hora)) {
    return res.status(400).json({ erro: 'Horário não disponível para este atendente' });
  }
  // Não permite duplicidade para atendente ou cliente
  if (banco.agendamentos.find(a => (a.atendenteId == atendenteId || a.clienteId == clienteId) && a.data === data && a.hora === hora)) {
    return res.status(409).json({ erro: 'Já existe agendamento para este atendente ou cliente neste horário' });
  }
  const id = banco.agendamentos.length + 1;
  const agendamento = new Agendamento(id, clienteId, atendenteId, data, hora);
  banco.agendamentos.push(agendamento);
  res.status(201).json(agendamento);
}

function listarAgendamentosCliente(req, res) {
  const clienteId = req.usuario.id;
  const agendamentos = banco.agendamentos.filter(a => a.clienteId == clienteId);
  res.json(agendamentos);
}

module.exports = { cadastrarAgendamento, listarAgendamentosCliente };
