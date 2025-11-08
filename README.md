# 💻 API de Agendamento Simples

Esta API permite o agendamento de horários entre **clientes** e **prestadores de serviço**.

---

## ⚙️ Funcionalidades
- Cadastro de usuário de login (prestador ou cliente)  
- Cadastro de atendente  
- Cadastro de cliente  
- Cadastro de horários disponíveis do atendente  
- Cadastro de agendamentos  
- Consulta de atendentes  
- Consulta de dados do cliente  

---

## 📌 Regras de Negócio
- Autenticação JWT obrigatória  
- Prestador pode cadastrar horários disponíveis  
- Cliente pode agendar apenas horários disponíveis  
- Não permite agendamentos em datas passadas  
- Não permite agendamentos duplicados para cliente ou atendente  
- Cliente só consulta seus próprios agendamentos  

---

## 📚 Documentação
A documentação Swagger está disponível no endpoint:  
[http://localhost:3000/docs](http://localhost:3000/docs)  
Também disponível no arquivo `recursos/swagger.yaml`.

---

## 💾 Banco de Dados
Utiliza **armazenamento em memória** (não persiste dados após reiniciar o servidor).

---

## 📁 Estrutura do Projeto
- `routes`  
- `controllers`  
- `middleware`  
- `service`  
- `model`  
- `recursos`  

---

## 🛠️ Como rodar
1. Instale as dependências:  
   ```bash
   npm install express jsonwebtoken swagger-ui-express js-yaml
   ```
2. Iniciei o servidor:  
   ```bash
   npm start
   ```   
---

## ▶️ Rodar os testes de API
Instale as dependências:

```
npm install mocha chai supertest mochawesome dotenv --save
```
Execute todos os testes:

```
npm test
```
---

## 📊 Geração automático do relatório HTML

- Após executar `npm test`, o relatório será gerado dentro da pasta `mochawesome-report/`.

---

## 📚 Dependências utilizadas e suas documentações
- [Mocha](https://mochajs.org/) - Framework de execução de testes
- [Chai](https://www.chaijs.com/) - Biblioteca de asserções
- [Supertest](https://github.com/forwardemail/supertest) - Biblioteca para chamadas HTTP
- [Mochawesome](https://github.com/adamgruber/mochawesome) - Geração de relatórios em HTML
- [Dotenv](https://github.com/motdotla/dotenv) - Gerenciamento de variáveis de ambiente

---

### ▶️ Rodar os testes de Performance com K6

```bash
k6 run performance/login.test.js
```
### 📊 Acompanhamento em Tempo Real + Exportação de Relatório

Você pode ativar o modo dashboard do K6 e exportar o relatório ao final do teste:

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run performance/login.test.js
```

Após a execução, o relatório estará salvo como `html-report.html`.

