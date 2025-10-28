const { verificarToken } = require('../service/authService');

function autenticarUsuario(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ erro: 'Token não fornecido' });
  const token = authHeader.split(' ')[1];
  const usuario = verificarToken(token);
  if (!usuario) return res.status(403).json({ erro: 'Token inválido ou expirado' });
  req.usuario = usuario;
  next();
}

function autenticarPrestador(req, res, next) {
  autenticarUsuario(req, res, () => {
    if (req.usuario.tipo !== 'prestador') {
      return res.status(403).json({ erro: 'Acesso permitido apenas para prestador' });
    }
    next();
  });
}

function autenticarCliente(req, res, next) {
  autenticarUsuario(req, res, () => {
    if (req.usuario.tipo !== 'cliente') {
      return res.status(403).json({ erro: 'Acesso permitido apenas para cliente' });
    }
    next();
  });
}

module.exports = { autenticarUsuario, autenticarPrestador, autenticarCliente };
