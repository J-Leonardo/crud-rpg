export class Personagem {
  id?: string;
  _funcao: string;
  _principal: string;
  _secundario: string;
  _magia: string;
  _orientacao: string;
  _orientacao2: string;
  _equipamento: string;

  constructor(
    funcao: string,
    principal: string,
    secundario: string,
    magia: string,
    orientacao: string,
    orientacao2: string,
    equipamento: string
  ) {
    this._funcao = funcao;
    this._principal = principal;
    this._secundario = secundario;
    this._magia = magia;
    this._orientacao = orientacao;
    this._orientacao2 = orientacao2;
    this._equipamento = equipamento;
  }

  public conteudo(): string {
    return (
      this._funcao +
      " " +
      this._principal +
      " " +
      this._secundario +
      " " +
      this._magia +
      " " +
      this._orientacao +
      " " +
      this._orientacao2 +
      " " +
      this._equipamento
    );
  }
}
