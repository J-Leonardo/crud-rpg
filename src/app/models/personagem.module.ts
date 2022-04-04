export class Personagem {
  id?: string;
  funcao?: string;
  principal?: string;
  secundaria?: string;
  magia?: string;
  orientacao?: string;
  orientacao2?: string;
  equipamento?: string;

  constructor(
    funcao: string,
    principal: string,
    secundaria: string,
    magia: string,
    orientacao: string,
    orientacao2: string,
    equipamento: string
  ) {
    this.funcao = funcao;
    this.principal = principal;
    this.secundaria = secundaria;
    this.magia = magia;
    this.orientacao = orientacao;
    this.orientacao2 = orientacao2;
    this.equipamento = equipamento;
  }

  public conteudo(): string {
    return (
      this.funcao +
      " " +
      this.principal +
      " " +
      this.secundaria +
      " " +
      this.magia +
      " " +
      this.orientacao +
      " " +
      this.orientacao2 +
      " " +
      this.equipamento
    );
  }
}
