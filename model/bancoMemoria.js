// Banco de dados em memória
module.exports = {
  usuarios: [], // { id, nome, senha, tipo }
  atendentes: [], // { id, nome }
  clientes: [], // { id, nome, telefone }
  horarios_disponiveis: [], // { id, atendenteId, data, hora }
  agendamentos: [] // { id, clienteId, atendenteId, data, hora }
};
