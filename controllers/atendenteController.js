const banco = require('../model/bancoMemoria');
const Atendente = require('../model/atendente');

function cadastrarAtendente(req, res) {
  const { nome } = req.body;
  if (!nome) {
    return res.status(400).json({ erro: 'Campo nome obrigatório' });
  }
  const id = banco.atendentes.length + 1;
  const atendente = new Atendente(id, nome);
  banco.atendentes.push(atendente);
  res.status(201).json(atendente);
}

function listarAtendentes(req, res) {
  res.json(banco.atendentes);
}

module.exports = { cadastrarAtendente, listarAtendentes };
