class Usuario {
  constructor(id, nome, senha, tipo) {
    this.id = id;
    this.nome = nome;
    this.senha = senha;
    this.tipo = tipo; // 'prestador' ou 'cliente'
  }
}
module.exports = Usuario;
