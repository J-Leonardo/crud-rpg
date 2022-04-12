import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { GoogleAuthProvider } from "firebase/auth";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  usuario: any;
  storage: Storage;

  constructor(private authService: AngularFireAuth) {
    this.storage = window.localStorage;
  }

  loginComEmailSenha(email: string, password: string) {
    return this.authService
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.storage.setItem("condicao", "autenticado");
      });
  }

  cadastrarComEmailSenha(email: string, password: string) {
    return this.authService.createUserWithEmailAndPassword(email, password);
  }

  loginComGoogleCount() {
    return this.authLoginProvider(new GoogleAuthProvider()).then(() => {
      this.storage.setItem("condicao", "autenticado");
    });
  }

  authLoginProvider(provider: any) {
    return this.authService.signInWithPopup(provider);
  }

  logout() {
    this.storage.setItem("condicao", "deslogado");
    return this.authService.signOut();
  }
}
