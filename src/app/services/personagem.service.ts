import { Injectable } from "@angular/core";
import { Personagem } from "../modules/personagem/personagem.module";

@Injectable({
  providedIn: "root",
})
export class PersonagemService {
  private _personagens: Personagem[] = [];
  constructor() {
    this.inserirPersonagem(
      new Personagem(
        "Magico combatente",
        "Combatente",
        "Usuário de magia leve",
        "Origem divina",
        "Bom",
        "Leal",
        "Foco, adaga"
      )
    );
  }

  public inserirPersonagem(personagem: Personagem): boolean {
    this._personagens.push(personagem);
    return true;
  }

  public getPersonagens(): Personagem[] {
    return this._personagens;
  }

  public getPersonagem(indice: number): Personagem {
    return this._personagens[indice];
  }

  public editarPersonagem(indice: number, personagem: Personagem): boolean {
    this._personagens[indice] = personagem;
    this._personagens[indice].setFuncao(personagem.getFuncao());
    this._personagens[indice].setPrincipal(personagem.getPrincipal());
    this._personagens[indice].setSecundario(personagem.getSecundario());
    this._personagens[indice].setMagia(personagem.getMagia());
    this._personagens[indice].setOrientacao(personagem.getOrientacao());
    this._personagens[indice].setOrientacao2(personagem.getOrientacao2());
    this._personagens[indice].setEquipamento(personagem.getEquipamento());
    return true;
  }

  public excluirPrdouto(indice: number): boolean {
    this._personagens.splice(indice, 1);
    return true;
  }
}
