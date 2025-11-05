const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')
const postCliente = require('../fixtures/postCliente.json')

describe('Cliente', () => {
    let token

    beforeEach(async() => {
       token = await obterToken('sidinei', '654321') 
    })

    describe('POST /Clientes', () => {

        it('Deve retornar falha com 403 quando cadastrar atendente com token de prestador', async () => {
            tokenPrestador = await obterToken('triton', '123456')
            const bodyCliente = { ...postCliente };
            const resposta = await request(process.env.BASE_URL)
               .post('/clientes')
               .set('Authorization', `Bearer ${tokenPrestador}`)
               .set('Content-Type', 'application/json')
               .send(bodyCliente); 
            expect(resposta.status).to.equal(403);
            expect(resposta.error.text).to.contain('Acesso permitido apenas para cliente');
        });

        it('Deve retornar falha com 400 quando cadastrar cliente com nome ou telefone vazio', async () => {
            const bodyCliente = { ...postCliente };
            bodyCliente.nome = '';
            bodyCliente.telefone = '';
            const resposta = await request(process.env.BASE_URL)
               .post('/clientes')
               .set('Authorization', `Bearer ${token}`)
               .set('Content-Type', 'application/json')
               .send(bodyCliente); 
            expect(resposta.status).to.equal(400);
            expect(resposta.error.text).to.contain('Campos obrigatórios: nome, telefone');
        });

        it('Deve retornar sucesso com 201 quando cadastrar cliente com token de cliente', async () => {
            const bodyCliente = { ...postCliente };
            const resposta = await request(process.env.BASE_URL)
               .post('/clientes')
               .set('Authorization', `Bearer ${token}`)
               .set('Content-Type', 'application/json')
               .send(bodyCliente); 
            expect(resposta.status).to.equal(201);
            expect(resposta.body.id).to.be.a('number');
            expect(resposta.body.nome).to.equal(bodyCliente.nome);
            expect(resposta.body.telefone).to.equal(bodyCliente.telefone);
        });

        it('Deve retornar falha com 401 quando cadastrar cliente sem token', async () => {
            const bodyCliente = { ...postCliente };
            const resposta = await request(process.env.BASE_URL)
               .post('/clientes')
               .set('Content-Type', 'application/json')
               .send(bodyCliente); 
            expect(resposta.status).to.equal(401);
            expect(resposta.error.text).to.contain('Token não fornecido');
        });  

        it('Deve retornar falha com 403 quando cadastrar cliente token inválido', async () => {
            token = await obterToken('', '')
            const bodyCliente = { ...postCliente };
            const resposta = await request(process.env.BASE_URL)
               .post('/clientes')
               .set('Authorization', `Bearer ${token}`)
               .set('Content-Type', 'application/json')
               .send(bodyCliente); 
            expect(resposta.status).to.equal(403);
            expect(resposta.error.text).to.contain('Token inválido ou expirado');
        }); 
    });

    describe('GET /Clientes/{id}', () => {
        it('Deve retornar sucesso com 200 os dados do cliente', async () => {
            const bodyCliente = { ...postCliente };
            const resposta = await request(process.env.BASE_URL)
               .get('/clientes/1')
               .set('Authorization', `Bearer ${token}`)
               .set('Content-Type', 'application/json');
            expect(resposta.status).to.equal(200);
            expect(resposta.body.id).to.be.a('number');
            expect(resposta.body.nome).to.equal(bodyCliente.nome);
            expect(resposta.body.telefone).to.equal(bodyCliente.telefone);
        });

        it('Deve retornar falha com 403 quando consultar cliente com token de prestador', async () => {
            tokenPrestador = await obterToken('triton', '123456')
            const bodyCliente = { ...postCliente };
            const resposta = await request(process.env.BASE_URL)
               .get('/clientes/1')
               .set('Authorization', `Bearer ${tokenPrestador}`)
               .set('Content-Type', 'application/json')
               .send(bodyCliente); 
            expect(resposta.status).to.equal(403);
            expect(resposta.error.text).to.contain('Acesso permitido apenas para cliente');
        });

        it('Deve retornar falha com 404 quando consultar cliente não cadastrado', async () => {
            const bodyCliente = { ...postCliente };
            const resposta = await request(process.env.BASE_URL)
               .get('/clientes/9999')
               .set('Authorization', `Bearer ${token}`)
               .set('Content-Type', 'application/json')
               .send(bodyCliente); 
            expect(resposta.status).to.equal(404);
            expect(resposta.error.text).to.contain('Cliente não encontrado');
        });

        it('Deve retornar falha com 401 quando consultar cliente sem token', async () => {
            const bodyCliente = { ...postCliente };
            const resposta = await request(process.env.BASE_URL)
               .get('/clientes/1')
               .set('Content-Type', 'application/json')
               .send(bodyCliente); 
            expect(resposta.status).to.equal(401);
            expect(resposta.error.text).to.contain('Token não fornecido');
        });  

        it('Deve retornar falha com 403 quando consultar cliente token inválido', async () => {
            token = await obterToken('', '')
            const bodyCliente = { ...postCliente };
            const resposta = await request(process.env.BASE_URL)
               .get('/clientes/1')
               .set('Authorization', `Bearer ${token}`)
               .set('Content-Type', 'application/json')
               .send(bodyCliente); 
            expect(resposta.status).to.equal(403);
            expect(resposta.error.text).to.contain('Token inválido ou expirado');
        });
    });
});