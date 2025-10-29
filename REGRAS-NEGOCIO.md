# Documentação das Regras de Negócio

## Épicos

### 1. Gestão de Usuários
- Cadastro e autenticação de usuários (prestador, cliente)
- Permissões de acesso por tipo de usuário

### 2. Gestão de Atendentes
- Cadastro de atendentes
- Consulta de atendentes

### 3. Gestão de Clientes
- Cadastro de clientes
- Consulta de dados do cliente

### 4. Gestão de Horários Disponíveis
- Cadastro de horários disponíveis pelo prestador
- Consulta de horários disponíveis

### 5. Gestão de Agendamentos
- Cadastro de agendamentos
- Consulta de agendamentos do cliente

---

## User Stories e Critérios de Aceite

### Épico 1: Gestão de Usuários

**User Story 1.1:** Como usuário, quero me cadastrar como prestador ou cliente para acessar o sistema.
- Critérios de Aceite:
  - O cadastro exige nome, senha e tipo (prestador ou cliente).
  - Não é permitido cadastrar usuários duplicados.
  - Campos obrigatórios devem ser validados.

**User Story 1.2:** Como usuário, quero realizar login para acessar funcionalidades protegidas.
- Critérios de Aceite:
  - Login exige nome e senha.
  - Retorna token JWT válido.
  - Usuário e senha inválidos retornam erro.

**User Story 1.3:** Como sistema, quero garantir que apenas usuários autenticados acessem rotas protegidas.
- Critérios de Aceite:
  - Rotas protegidas exigem token JWT.
  - Usuário sem token recebe erro de autenticação.

---

### Épico 2: Gestão de Atendentes

**User Story 2.1:** Como prestador, quero cadastrar atendentes para disponibilizar serviços.
- Critérios de Aceite:
  - Apenas prestadores podem cadastrar atendentes.
  - Nome do atendente é obrigatório.
  - Atendente criado com sucesso retorna dados do atendente.

**User Story 2.2:** Como usuário, quero consultar a lista de atendentes disponíveis.
- Critérios de Aceite:
  - Retorna lista de atendentes cadastrados.

---

### Épico 3: Gestão de Clientes

**User Story 3.1:** Como cliente, quero cadastrar meus dados para agendar serviços.
- Critérios de Aceite:
  - Apenas clientes podem cadastrar dados de cliente.
  - Nome e telefone são obrigatórios.
  - Cliente criado com sucesso retorna dados do cliente.

**User Story 3.2:** Como cliente, quero consultar meus dados cadastrados.
- Critérios de Aceite:
  - Apenas o próprio cliente pode consultar seus dados.
  - Retorna dados do cliente ou erro se não encontrado.

---

### Épico 4: Gestão de Horários Disponíveis

**User Story 4.1:** Como prestador, quero cadastrar horários disponíveis para atendimento.
- Critérios de Aceite:
  - Apenas prestadores podem cadastrar horários.
  - Data e hora não podem ser no passado.
  - Não permite horários duplicados para o mesmo atendente.
  - Atendente deve existir.

**User Story 4.2:** Como usuário, quero consultar horários disponíveis de um atendente.
- Critérios de Aceite:
  - Retorna lista de horários disponíveis.
  - Permite filtrar por atendente.

---

### Épico 5: Gestão de Agendamentos

**User Story 5.1:** Como cliente, quero agendar um horário disponível com um atendente.
- Critérios de Aceite:
  - Apenas clientes podem agendar.
  - Só permite agendar horários disponíveis.
  - Não permite agendar datas passadas.
  - Não permite agendamentos duplicados para cliente ou atendente no mesmo horário.
  - Atendente deve existir.

**User Story 5.2:** Como cliente, quero consultar meus agendamentos realizados.
- Critérios de Aceite:
  - Apenas o próprio cliente pode consultar seus agendamentos.
  - Retorna lista de agendamentos do cliente.

---

## Regras Gerais de Negócio
- Autenticação JWT obrigatória para rotas protegidas.
- Dados são armazenados em memória (não persistentes).
- Validação de campos obrigatórios em todos os cadastros.
- Respeito às permissões de cada tipo de usuário.
- Não permite operações em datas passadas.
- Não permite duplicidade de registros (usuário, horário, agendamento).
