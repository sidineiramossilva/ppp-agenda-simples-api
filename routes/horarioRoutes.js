const express = require('express');
const router = express.Router();
const { cadastrarHorario, listarHorarios } = require('../controllers/horarioController');
const { autenticarPrestador } = require('../middleware/authMiddleware');

router.post('/horarios', autenticarPrestador, cadastrarHorario);
router.get('/horarios', listarHorarios);

module.exports = router;
