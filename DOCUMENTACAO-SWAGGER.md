# 🧾 Documentação Swagger - API de Agendamento Simples

## 🎯 Objetivo
Esta documentação descreve como utilizar o **Swagger** para testar e explorar a **API de Agendamento Simples**.

---

## 🌐 Como acessar no navegador
1. Certifique-se de que a API está rodando localmente.  
2. Acesse o endereço no navegador: http://localhost:3000/docs/

---

## 🧭 Como usar

### 1️⃣ Acessar o Swagger
- Abra o navegador.  
- Acesse:  
```
http://localhost:3000/docs/
```

### 2️⃣ Explorar Endpoints
- Navegue pelas categorias:  
**usuarios**, **login**, **atendentes**, **clientes**, **horarios** e **agendamentos**.  
- Clique no endpoint desejado para visualizar os detalhes.

### 3️⃣ Testar Endpoints sem autenticação
1. Clique na categoria do endpoint.  
2. Clique no botão **Try it out**.  
3. Preencha os parâmetros solicitados.  
4. Clique no botão **Execute** para enviar a requisição.

### 4️⃣ Testar Endpoints com autenticação
1. Cadastre um usuário através do endpoint **`/usuarios`**.  
2. Efetue o login utilizando o endpoint **`/login`**.  
3. Copie o **token** retornado na resposta.  
4. Clique no ícone de **cadeado 🔒** no Swagger.  
5. Informe o **token** e clique em **Authorize**.  
6. Após isso:
   - Clique em **Try it out**  
   - Preencha os parâmetros  
   - Clique em **Execute**

---

## 📚 Endpoints disponíveis

### 🧑‍💻 1. Usuários
- **POST `/usuarios`** → Cadastro de usuário (prestador ou cliente)  
- **POST `/login`** → Login de usuário (retorna token JWT)

### 👨‍🔧 2. Atendentes
- **POST `/atendentes`** → Cadastro de atendente *(requer autenticação como prestador)*  
- **GET `/atendentes`** → Listar atendentes

### 👤 3. Clientes
- **POST `/clientes`** → Cadastro de cliente *(requer autenticação como cliente)*  
- **GET `/clientes?id=ID`** → Buscar dados do cliente *(requer autenticação como cliente)*

### ⏰ 4. Horários
- **POST `/horarios`** → Cadastro de horário disponível do atendente *(requer autenticação como prestador)*  
- **GET `/horarios?atendenteId=ID`** → Listar horários disponíveis

### 📅 5. Agendamentos
- **POST `/agendamentos`** → Cadastro de agendamento *(requer autenticação como cliente)*  
- **GET `/agendamentos`** → Listar agendamentos do cliente *(requer autenticação como cliente)*

---

## 🧱 Esquemas

| Entidade | Campos | Campos obrigatórios |
|-----------|-------------------|----------------------|
| **Usuario** | id, nome, tipo, | nome, tipo, senha |
| **Atendente** | id, nome | nome |
| **Cliente** | id, nome, telefone | nome, telefone |
| **HorarioDisponivel** | id, atendenteId, data, hora | atendenteId, data, hora |
| **Agendamento** | id, clienteId, atendenteId, data, hora | clienteId, atendenteId, data, hora |

---

## 💡 Dicas importantes
- Consulte sempre o arquivo **`swagger.yaml`** para detalhes sobre parâmetros e respostas.  
- Use o endpoint **`/login`** para obter o **token JWT** antes de acessar endpoints protegidos.  
- Em caso de dúvidas sobre os **campos obrigatórios**, verifique a seção **`requestBody`** de cada endpoint no Swagger.

