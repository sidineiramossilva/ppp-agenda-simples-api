class Agendamento {
  constructor(id, clienteId, atendenteId, data, hora) {
    this.id = id;
    this.clienteId = clienteId;
    this.atendenteId = atendenteId;
    this.data = data;
    this.hora = hora;
  }
}
module.exports = Agendamento;
