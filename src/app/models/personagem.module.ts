export class Personagem {
  id?: string;
  nome?: string;
  nomeimagem?: string;
  downloadURL?: string;
  funcao?: string;
  principal?: string;
  secundaria?: string;
  magia?: string;
  orientacao?: string;
  orientacao2?: string;
  equipamento?: string;

  constructor(
    nome: string,
    funcao: string,
    principal: string,
    secundaria: string,
    magia: string,
    orientacao: string,
    orientacao2: string,
    equipamento: string
  ) {
    this.nome = nome;
    this.funcao = funcao;
    this.principal = principal;
    this.secundaria = secundaria;
    this.magia = magia;
    this.orientacao = orientacao;
    this.orientacao2 = orientacao2;
    this.equipamento = equipamento;
  }
}
