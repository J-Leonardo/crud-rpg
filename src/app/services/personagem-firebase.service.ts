import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from "@angular/fire/compat/storage";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { Personagem } from "../models/personagem.module";

@Injectable({
  providedIn: "root",
})
export class PersonagemFirebaseService {
  private _PATH: string = "Personagens";
  task?: AngularFireUploadTask;
  uploadedFileUrl?: Observable<string>;
  fileName?: string;
  downloadURL?: string;
  constructor(
    private angularFirestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  async uploadStorage(file: File, personagem: Personagem) {
    if (file.type.split("/")[0] != "image") {
      console.log("Tipo Não Suportado!");
      return;
    }
    this.fileName = file.name;
    const path = `imagens/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(path);
    this.task = this.storage.upload(path, file);
    return this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.uploadedFileUrl = fileRef.getDownloadURL();
          this.uploadedFileUrl.subscribe((resp) => {
            personagem.nomeimagem = file.name;
            personagem.downloadURL = resp;
            this.criarPersonagem(personagem);
          });
        })
      )
      .subscribe();
  }
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
    return this.angularFirestore.collection(this._PATH).doc(id).update({
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
