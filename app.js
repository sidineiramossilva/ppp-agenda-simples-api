
const express = require('express');
const jwt = require('jsonwebtoken');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('js-yaml');

const app = express();
app.use(express.json());

// Carregar Swagger
const swaggerDocument = yaml.load(fs.readFileSync('./recursos/swagger.yaml', 'utf8'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Importar rotas
const usuarioRoutes = require('./routes/usuarioRoutes');
const atendenteRoutes = require('./routes/atendenteRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const horarioRoutes = require('./routes/horarioRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');

app.use(usuarioRoutes);
app.use(atendenteRoutes);
app.use(clienteRoutes);
app.use(horarioRoutes);
app.use(agendamentoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
