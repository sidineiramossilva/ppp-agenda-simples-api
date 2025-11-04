const request = require('supertest');
const { expect } = require('chai');
const postUsuarios = require('../fixtures/postUsuarios.json');
require ('dotenv').config();

describe('Cadastro de Usuario', () => {
  it('Deve retornar sucesso com 201 quando cadastrar usuário com nome, senha e tipo prestador', async () => {
    const bodyUsuario = { ...postUsuarios.usuarioPrestador };
    const resposta = await request(process.env.BASE_URL)
      .post('/usuarios')
      .send(bodyUsuario);
    expect(resposta.status).to.equal(201);
    expect(resposta.body.nome).to.equal('triton');
  });

  it('Deve retornar sucesso com 201 quando cadastrar usuário com nome, senha e tipo cliente', async () => {
    const bodyUsuario = { ...postUsuarios.usuarioCliente };
    const resposta = await request(process.env.BASE_URL)
      .post('/usuarios')
      .send(bodyUsuario);
    expect(resposta.status).to.equal(201);
    expect(resposta.body.nome).to.equal('sidinei');
  });

  it('Deve retornar falha com 409 quando cadastrar usuário com nome já existente', async () => {
    const bodyUsuario = { ...postUsuarios.usuarioCliente };
    const resposta = await request(process.env.BASE_URL)
      .post('/usuarios')
      .send(bodyUsuario);
    expect(resposta.status).to.equal(409);
    expect(resposta.error.text).to.contain('Usuário já existe');
  });

  it('Deve retornar falha com 400 quando cadastrar usuário com campos obrigatórios ausentes ou campo tipo diferente de prestador ou cliente', async () => {
    const bodyUsuario = { ...postUsuarios.usuarioPrestador };
    bodyUsuario.nome = '';
    bodyUsuario.senha = '';
    bodyUsuario.tipo = 'funcionario';
    const resposta = await request(process.env.BASE_URL)
      .post('/usuarios')
      .send(bodyUsuario);
    expect(resposta.status).to.equal(400);
    expect(resposta.error.text).to.contain('Campos obrigatórios: nome, senha, tipo (prestador ou cliente)');
  });

  it('Deve retornar falha com 400 quando cadastrar usuário com campo nome injeção de código', async () => {
    const bodyUsuario = { ...postUsuarios.usuarioCliente };
    bodyUsuario.nome = '<script>alert("teste")</script>';
    const resposta = await request(process.env.BASE_URL)
      .post('/usuarios')
      .send(bodyUsuario);
    expect(resposta.status).to.equal(400);
  });
});