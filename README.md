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
