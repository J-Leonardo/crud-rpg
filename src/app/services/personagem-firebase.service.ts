import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Personagem } from "../models/personagem.module";

@Injectable({
  providedIn: "root",
})
export class PersonagemFirebaseService {
  private _PATH: string = "Personagens";
  constructor(private angularFirestore: AngularFirestore) {}

  getPersonagem(id: string) {
    return this.angularFirestore.collection(this._PATH).doc(id).valueChanges();
  }
  getPersonagems() {
    return this.angularFirestore.collection(this._PATH).snapshotChanges();
  }
  criarPersonagem(personagem: Personagem) {
    return this.angularFirestore.collection(this._PATH).add(personagem);
  }
  deletarPersonagem(personagem: Personagem) {
    return this.angularFirestore
      .collection(this._PATH)
      .doc(personagem.id)
      .delete();
  }
  editarPersonagem(personagem: Personagem, id: string) {
    return this.angularFirestore
      .collection(this._PATH)
      .doc(id)
      .update({
        funcao: personagem.funcao,
        principal: personagem.principal,
        secundaria: personagem.secundaria,
        magia: personagem.magia,
        orientacao: personagem.orientacao,
        orientacao2: personagem.orientacao2,
        equipamento: personagem.equipamento,
      });
  }
}
