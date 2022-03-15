export class Personagem {
  private _funcao: string;
  private _principal: string;
  private _secundario: string;
  private _magia: string;
  private _orientacao: string;
  private _orientacao2: string;
  private _equipamento: string;

  constructor(
    funcao: string,
    principal: string,
    secundario: string,
    magia: string,
    orientacao: string,
    orientacao2: string, equipamento: string
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
      ' ' +
      this._principal +
      ' ' +
      this._secundario +
      ' ' +
      this._magia +
      ' ' +
      this._orientacao
    );
  }

  public getFuncao(): string {
    return this._funcao;
  }

  public getPrincipal(): string {
    return this._principal;
  }

  public getOrientacao(): string {
    return this._orientacao;
  }
  public getOrientacao2(): string {
    return this._orientacao2;
  }

  public getSecundario(): string {
    return this._secundario;
  }

  public getMagia(): string {
    return this._magia;
  }

  public getEquipamento(): string {
    return this._equipamento;
  }

  public setFuncao(funcao: string): void {
    this._funcao = funcao;
  }

  public setPrincipal(principal: string): void {
    this._principal = principal;
  }

  public setSecundario(secundario: string): void {
    this._secundario = secundario;
  }

  public setMagia(magia: string): void {
    this._magia = magia;
  }

  public setOrientacao(orientacao: string): void {
    this._orientacao = orientacao;
  }

  public setOrientacao2(orientacao2: string): void {
    this._orientacao2 = orientacao2;
  }

  public setEquipamento(equipamento: string): void {
    this._equipamento = equipamento;
  }
}
