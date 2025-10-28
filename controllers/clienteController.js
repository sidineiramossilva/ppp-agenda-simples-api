const banco = require('../model/bancoMemoria');
const Cliente = require('../model/cliente');

function cadastrarCliente(req, res) {
  const { nome, telefone } = req.body;
  if (!nome || !telefone) {
    return res.status(400).json({ erro: 'Campos obrigatórios: nome, telefone' });
  }
  const id = banco.clientes.length + 1;
  const cliente = new Cliente(id, nome, telefone);
  banco.clientes.push(cliente);
  res.status(201).json(cliente);
}

function buscarCliente(req, res) {
  const { id } = req.params;
  const cliente = banco.clientes.find(c => c.id == id);
  if (!cliente) {
    return res.status(404).json({ erro: 'Cliente não encontrado' });
  }
  res.json(cliente);
}

module.exports = { cadastrarCliente, buscarCliente };
