const banco = require('../model/bancoMemoria');
const Usuario = require('../model/usuario');
const { gerarToken } = require('../service/authService');

function cadastrarUsuario(req, res) {
  const { nome, senha, tipo } = req.body;
  if (!nome || !senha || !tipo || !['prestador', 'cliente'].includes(tipo)) {
    return res.status(400).json({ erro: 'Campos obrigatórios: nome, senha, tipo (prestador ou cliente)' });
  }
  if (banco.usuarios.find(u => u.nome === nome)) {
    return res.status(409).json({ erro: 'Usuário já existe' });
  }
  const id = banco.usuarios.length + 1;
  const usuario = new Usuario(id, nome, senha, tipo);
  banco.usuarios.push(usuario);
  res.status(201).json({ id: usuario.id, nome: usuario.nome, tipo: usuario.tipo });
}

function loginUsuario(req, res) {
  const { nome, senha } = req.body;
  const usuario = banco.usuarios.find(u => u.nome === nome && u.senha === senha);
  if (!usuario) {
    return res.status(401).json({ erro: 'Usuário ou senha inválidos' });
  }
  const token = gerarToken(usuario);
  res.json({ token });
}

module.exports = { cadastrarUsuario, loginUsuario };
