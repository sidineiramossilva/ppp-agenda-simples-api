const express = require('express');
const router = express.Router();
const { cadastrarAtendente, listarAtendentes } = require('../controllers/atendenteController');
const { autenticarPrestador } = require('../middleware/authMiddleware');

router.post('/atendentes', autenticarPrestador, cadastrarAtendente);
router.get('/atendentes', listarAtendentes);

module.exports = router;
