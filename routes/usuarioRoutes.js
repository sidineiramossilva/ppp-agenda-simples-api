const express = require('express');
const router = express.Router();
const { cadastrarUsuario, loginUsuario } = require('../controllers/usuarioController');

router.post('/usuarios', cadastrarUsuario);
router.post('/login', loginUsuario);

module.exports = router;
