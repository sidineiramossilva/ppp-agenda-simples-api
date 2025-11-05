const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')
const postHorario = require('../fixtures/postHorario.json')

describe('Horarios', () => {
    let token

    beforeEach(async() => {
       token = await obterToken('triton', '123456') 
    })

    describe('POST /Horarios', () => {

        it('Deve retornar falha com 403 quando cadastrar horário com token de cliente', async () => {
            tokenCliente = await obterToken('sidinei', '654321')
            const bodyHorario = { ...postHorario };
            const resposta = await request(process.env.BASE_URL)
               .post('/horarios')
               .set('Authorization', `Bearer ${tokenCliente}`)
               .set('Content-Type', 'application/json')
               .send(bodyHorario); 
            expect(resposta.status).to.equal(403);
            expect(resposta.error.text).to.contain('Acesso permitido apenas para prestador');
        });

        it('Deve retornar falha com 400 quando cadastrar horário com atendente, data ou hora vazio', async () => {
            const bodyHorario = { ...postHorario };
            bodyHorario.atendenteId = '';
            bodyHorario.data = '';
            bodyHorario.hora = '';
            const resposta = await request(process.env.BASE_URL)
               .post('/horarios')
               .set('Authorization', `Bearer ${token}`)
               .set('Content-Type', 'application/json')
               .send(bodyHorario); 
            expect(resposta.status).to.equal(400);
            expect(resposta.error.text).to.contain('Campos obrigatórios: atendenteId, data, hora');
        });

        it('Deve retornar sucesso com 201 quando cadastrar horário com token de prestador', async () => {
            const bodyHorario = { ...postHorario };
            const resposta = await request(process.env.BASE_URL)
               .post('/horarios')
               .set('Authorization', `Bearer ${token}`)
               .set('Content-Type', 'application/json')
               .send(bodyHorario); 
            expect(resposta.status).to.equal(201);
            expect(resposta.body.id).to.be.a('number');
            expect(resposta.body.atendenteId).to.equal(bodyHorario.atendenteId);
            expect(resposta.body.data).to.equal(bodyHorario.data);
            expect(resposta.body.hora).to.equal(bodyHorario.hora);
        });

        it('Deve retornar falha com 400 quando cadastrar horário data no passado', async () => {
            const bodyHorario = { ...postHorario };
            bodyHorario.atendenteId = 1;
            bodyHorario.data = '2025-11-04';
            bodyHorario.hora = '10:00';
            const resposta = await request(process.env.BASE_URL)
               .post('/horarios')
               .set('Authorization', `Bearer ${token}`)
               .set('Content-Type', 'application/json')
               .send(bodyHorario); 
            expect(resposta.status).to.equal(400);
            expect(resposta.error.text).to.contain('Não é permitido cadastrar horários em datas passadas');
        });

        it('Deve retornar falha com 409 quando cadastrar horário já cadastrado, com data e hora para mesmo atendente', async () => {
            const bodyHorario = { ...postHorario };
            const resposta = await request(process.env.BASE_URL)
               .post('/horarios')
               .set('Authorization', `Bearer ${token}`)
               .set('Content-Type', 'application/json')
               .send(bodyHorario); 
            expect(resposta.status).to.equal(409);
            expect(resposta.error.text).to.contain('Horário já cadastrado para este atendente');
        });

        it('Deve retornar falha com 404 quando cadastrar horário para atendente não cadastrado', async () => {
            const bodyHorario = { ...postHorario };
            bodyHorario.atendenteId = 9999;
            const resposta = await request(process.env.BASE_URL)
               .post('/horarios')
               .set('Authorization', `Bearer ${token}`)
               .set('Content-Type', 'application/json')
               .send(bodyHorario); 
            expect(resposta.status).to.equal(404);
            expect(resposta.error.text).to.contain('Atendente não encontrado');
        });

        it('Deve retornar falha com 401 quando cadastrar horário sem token', async () => {
            const bodyHorario = { ...postHorario };
            const resposta = await request(process.env.BASE_URL)
               .post('/horarios')
               .set('Content-Type', 'application/json')
               .send(bodyHorario); 
            expect(resposta.status).to.equal(401);
            expect(resposta.error.text).to.contain('Token não fornecido');
        });  

        it('Deve retornar falha com 403 quando cadastrar cliente token inválido', async () => {
            token = await obterToken('', '')
            const bodyHorario = { ...postHorario };
            const resposta = await request(process.env.BASE_URL)
               .post('/horarios')
               .set('Authorization', `Bearer ${token}`)
               .set('Content-Type', 'application/json')
               .send(bodyHorario); 
            expect(resposta.status).to.equal(403);
            expect(resposta.error.text).to.contain('Token inválido ou expirado');
        }); 
    });

    describe('GET /Horários', () => {
        it('Deve retornar sucesso com 200 os dados do horário', async () => {
            const bodyHorario = { ...postHorario };
            const resposta = await request(process.env.BASE_URL)
               .get('/horarios')
               .set('Content-Type', 'application/json');
            expect(resposta.status).to.equal(200);
            expect(resposta.body[0].atendenteId).to.equal(bodyHorario.atendenteId);            
        });
    });
});