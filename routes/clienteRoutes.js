const express = require('express');
const router = express.Router();
const { cadastrarCliente, buscarCliente } = require('../controllers/clienteController');
const { autenticarCliente } = require('../middleware/authMiddleware');

router.post('/clientes', autenticarCliente, cadastrarCliente);
router.get('/clientes/:id', autenticarCliente, buscarCliente);

module.exports = router;
