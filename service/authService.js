const jwt = require('jsonwebtoken');
const SECRET = 'segredo_super_secreto';

function gerarToken(usuario) {
  return jwt.sign({ id: usuario.id, tipo: usuario.tipo }, SECRET, { expiresIn: '2h' });
}

function verificarToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = { gerarToken, verificarToken };
