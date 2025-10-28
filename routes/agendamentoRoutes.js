const express = require('express');
const router = express.Router();
const { cadastrarAgendamento, listarAgendamentosCliente } = require('../controllers/agendamentoController');
const { autenticarCliente } = require('../middleware/authMiddleware');

router.post('/agendamentos', autenticarCliente, cadastrarAgendamento);
router.get('/agendamentos', autenticarCliente, listarAgendamentosCliente);

module.exports = router;
