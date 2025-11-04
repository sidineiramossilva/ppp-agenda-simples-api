const request = require('supertest');
const { expect } = require('chai');
const postLogin = require('../fixtures/postUsuarios.json');
require('dotenv').config();

describe('Login', () => {
  it('Deve retornar sucesso com 200 quando realizar login com credenciais válidas', async () => {
    const bodyLogin = { ...postLogin}
    const resposta = await request(process.env.BASE_URL)
      .post('/login')
      .set('Content-Type', 'application/json')
      .send(bodyLogin.usuarioPrestador);
    expect(resposta.status).to.equal(200);
    expect(resposta.body.token).to.be.a('string');
  });

  it('Deve retornar falha com 401 quando realizar login com credenciais inválidas', async () => {
    const bodyLogin = { ...postLogin}
    bodyLogin.usuarioCliente.nome = 'usuarioInvalido';
    const resposta = await request(process.env.BASE_URL)
      .post('/login')
      .set('Content-Type', 'application/json')
      .send(bodyLogin.usuarioCliente);
    expect(resposta.status).to.equal(401);
    expect(resposta.error.text).to.contain('Usuário ou senha inválidos');
  });
});
