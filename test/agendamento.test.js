const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')
const postAgendamento = require('../fixtures/postAgendamento.json')

describe('Agendamento', () => {
    let token

    beforeEach(async() => {
       token = await obterToken('sidinei', '654321') 
    })

    describe('POST /Agendamentos', () => {

        it('Deve retornar sucesso com 201 quando cadastrar agendamento com token de cliente', async () => {
            const bodyAgendamento = { ...postAgendamento };
            const resposta = await request(process.env.BASE_URL)
               .post('/agendamentos')
               .set('Authorization', `Bearer ${token}`)
               .set('Content-Type', 'application/json')
               .send(bodyAgendamento);  
            expect(resposta.status).to.equal(201);
            expect(resposta.body.id).to.be.a('number');
            expect(resposta.body.atendenteId).to.equal(bodyAgendamento.atendenteId);
            expect(resposta.body.data).to.equal(bodyAgendamento.data);
            expect(resposta.body.hora).to.equal(bodyAgendamento.hora);
        });

        it('Deve retornar falha com 403 quando cadastrar agendamento com token de prestador', async () => {
            tokenPrestador = await obterToken('triton', '123456')
            const bodyAgendamento = { ...postAgendamento };
            const resposta = await request(process.env.BASE_URL)
               .post('/agendamentos')
               .set('Authorization', `Bearer ${tokenPrestador}`)
               .set('Content-Type', 'application/json')
               .send(bodyAgendamento); 
            expect(resposta.status).to.equal(403);
            expect(resposta.error.text).to.contain('Acesso permitido apenas para cliente');
        });

        it('Deve retornar falha com 400 quando cadastrar agendamento com horário não disponível', async () => {
            const bodyAgendamento = { ...postAgendamento };
            bodyAgendamento.data = '2025-11-15';
            const resposta = await request(process.env.BASE_URL)
               .post('/agendamentos')
               .set('Authorization', `Bearer ${token}`)
               .set('Content-Type', 'application/json')
               .send(bodyAgendamento);  
            expect(resposta.status).to.equal(400);
            expect(resposta.error.text).to.contain('Horário não disponível para este atendente');
        });

        it('Deve retornar falha com 400 quando cadastrar agendamento com data no passado', async () => {
            const bodyAgendamento = { ...postAgendamento };
            bodyAgendamento.data = '2025-11-01';
            const resposta = await request(process.env.BASE_URL)
               .post('/agendamentos')
               .set('Authorization', `Bearer ${token}`)
               .set('Content-Type', 'application/json')
               .send(bodyAgendamento);   
            expect(resposta.status).to.equal(400);
            expect(resposta.error.text).to.contain('Não é permitido agendar em datas passadas');
        });

        it('Deve retornar falha com 409 quando cadastrar agendamento duplicados', async () => {
            const bodyAgendamento = { ...postAgendamento };
            const resposta = await request(process.env.BASE_URL)
               .post('/agendamentos')
               .set('Authorization', `Bearer ${token}`)
               .set('Content-Type', 'application/json')
               .send(bodyAgendamento);   
            expect(resposta.status).to.equal(409);
            expect(resposta.error.text).to.contain('Já existe agendamento para este atendente ou cliente neste horário');
        });

        it('Deve retornar falha com 404 quando cadastrar agendamento com atendente não cadastrado', async () => {
            const bodyAgendamento = { ...postAgendamento };
            bodyAgendamento.atendenteId = 9999;
            const resposta = await request(process.env.BASE_URL)
               .post('/agendamentos')
               .set('Authorization', `Bearer ${token}`)
               .set('Content-Type', 'application/json')
               .send(bodyAgendamento);    
            expect(resposta.status).to.equal(404);
            expect(resposta.error.text).to.contain('Atendente não encontrado');
        });

        it('Deve retornar falha com 400 quando cadastrar agendamento com os campos atendente, data ou hora vazio', async () => {
            const bodyAgendamento = { ...postAgendamento };
            bodyAgendamento.atendenteId = '';
            bodyAgendamento.data = '';
            bodyAgendamento.hora = '';
            const resposta = await request(process.env.BASE_URL)
               .post('/agendamentos')
               .set('Authorization', `Bearer ${token}`)
               .set('Content-Type', 'application/json')
               .send(bodyAgendamento); 
            expect(resposta.status).to.equal(400);
            expect(resposta.error.text).to.contain('Campos obrigatórios: atendenteId, data, hora');
        });        

        it('Deve retornar falha com 401 quando cadastrar agendamento sem token', async () => {
            const bodyAgendamento = { ...postAgendamento };
            const resposta = await request(process.env.BASE_URL)
               .post('/agendamentos')
               .set('Content-Type', 'application/json')
               .send(bodyAgendamento); 
            expect(resposta.status).to.equal(401);
            expect(resposta.error.text).to.contain('Token não fornecido');
        });  

        it('Deve retornar falha com 403 quando cadastrar agendamento token inválido', async () => {
            token = await obterToken('', '')
            const bodyAgendamento = { ...postAgendamento };
            const resposta = await request(process.env.BASE_URL)
               .post('/agendamentos')
               .set('Authorization', `Bearer ${token}`)
               .set('Content-Type', 'application/json')
               .send(bodyAgendamento); 
            expect(resposta.status).to.equal(403);
            expect(resposta.error.text).to.contain('Token inválido ou expirado');
        }); 
    });

    describe('GET /Agendamentos', () => {
        it('Deve retornar sucesso com 200 os dados do agendamento', async () => {
            const bodyAgendamento = { ...postAgendamento };
            const resposta = await request(process.env.BASE_URL)
               .get('/agendamentos')
               .set('Authorization', `Bearer ${token}`)
               .set('Content-Type', 'application/json'); 
            expect(resposta.status).to.equal(200);
            expect(resposta.body[0].atendenteId).to.equal(bodyAgendamento.atendenteId);
        });

        it('Deve retornar falha com 403 quando consultar agendamento com token de prestador', async () => {
            tokenPrestador = await obterToken('triton', '123456')
            const bodyAgendamento = { ...postAgendamento };
            const resposta = await request(process.env.BASE_URL)
               .get('/agendamentos')
               .set('Authorization', `Bearer ${tokenPrestador}`)
               .set('Content-Type', 'application/json')
               .send(bodyAgendamento); 
            expect(resposta.status).to.equal(403);
            expect(resposta.error.text).to.contain('Acesso permitido apenas para cliente');
        });

        it('Deve retornar falha com 401 quando consultar agendamento sem token', async () => {
            const bodyAgendamento = { ...postAgendamento };
            const resposta = await request(process.env.BASE_URL)
               .get('/agendamentos')
               .set('Content-Type', 'application/json')
               .send(bodyAgendamento); 
            expect(resposta.status).to.equal(401);
            expect(resposta.error.text).to.contain('Token não fornecido');
        });  

        it('Deve retornar falha com 403 quando consultar agendamento token inválido', async () => {
            token = await obterToken('', '')
            const bodyAgendamento = { ...postAgendamento };
            const resposta = await request(process.env.BASE_URL)
               .get('/agendamentos')
               .set('Authorization', `Bearer ${token}`)
               .set('Content-Type', 'application/json')
               .send(bodyAgendamento); 
            expect(resposta.status).to.equal(403);
            expect(resposta.error.text).to.contain('Token inválido ou expirado');
        });
    });
});