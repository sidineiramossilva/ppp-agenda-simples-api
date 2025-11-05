const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')
const postAtendente = require('../fixtures/postAtendente.json')

describe('Atendente', () => {
    let token

    beforeEach(async() => {
       token = await obterToken('triton', '123456') 
    })

    describe('POST /Atendentes', () => {

        it('Deve retornar falha com 403 quando cadastrar atendente com token de cliente', async () => {
            tokenCliente = await obterToken('sidinei', '654321')
            const bodyAtendente = { ...postAtendente };
            const resposta = await request(process.env.BASE_URL)
               .post('/atendentes')
               .set('Authorization', `Bearer ${tokenCliente}`)
               .set('Content-Type', 'application/json')
               .send(bodyAtendente); 
            expect(resposta.status).to.equal(403);
            expect(resposta.error.text).to.contain('Acesso permitido apenas para prestador');
        });

        it('Deve retornar falha com 400 quando cadastrar atendente com nome vazio', async () => {
            const bodyAtendente = { ...postAtendente };
            bodyAtendente.nome = '';
            const resposta = await request(process.env.BASE_URL)
               .post('/atendentes')
               .set('Authorization', `Bearer ${token}`)
               .set('Content-Type', 'application/json')
               .send(bodyAtendente); 
            expect(resposta.status).to.equal(400);
            expect(resposta.error.text).to.contain('Campo nome obrigatório');
        });

        it('Deve retornar sucesso com 201 quando cadastrar atendente com token de prestador', async () => {
            const bodyAtendente = { ...postAtendente };
            const resposta = await request(process.env.BASE_URL)
               .post('/atendentes')
               .set('Authorization', `Bearer ${token}`)
               .set('Content-Type', 'application/json')
               .send(bodyAtendente); 
            expect(resposta.status).to.equal(201);
            expect(resposta.body.id).to.be.a('number');
            expect(resposta.body.nome).to.equal(bodyAtendente.nome);
        });

        it('Deve retornar falha com 401 quando cadastrar atendente sem token', async () => {
            const bodyAtendente = { ...postAtendente };
            const resposta = await request(process.env.BASE_URL)
               .post('/atendentes')
               .set('Content-Type', 'application/json')
               .send(bodyAtendente); 
            expect(resposta.status).to.equal(401);
            expect(resposta.error.text).to.contain('Token não fornecido');
        });  

        it('Deve retornar falha com 403 quando cadastrar atendente token inválido', async () => {
            semToken = await obterToken('', '')
            const bodyAtendente = { ...postAtendente };
            const resposta = await request(process.env.BASE_URL)
               .post('/atendentes')
               .set('Authorization', `Bearer ${semToken}`)
               .set('Content-Type', 'application/json')
               .send(bodyAtendente); 
            expect(resposta.status).to.equal(403);
            expect(resposta.error.text).to.contain('Token inválido ou expirado');
        }); 
    });

    describe('GET /Atendentes', () => {
        it('Deve retornar sucesso com 200 os dados do atendente', async () => {
            const bodyAtendente = { ...postAtendente };
            const resposta = await request(process.env.BASE_URL)
               .get('/atendentes')
               .set('Authorization', `Bearer ${token}`)
               .set('Content-Type', 'application/json');
            expect(resposta.status).to.equal(200);
            expect(resposta.body[0].nome).to.contain(bodyAtendente.nome);
        });
    });
});