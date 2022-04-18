import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider } from "firebase/auth";

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

  loginComFacebook() {
    return this.authLoginProvider(new FacebookAuthProvider()).then(() => {
      this.storage.setItem("condicao", "autenticado");
    });
  }

  loginComTwitter() {
    //desisti pq nao sei fazer termos de uso e privacidade
    return this.authLoginProvider(new TwitterAuthProvider()).then(() => {
      this.storage.setItem("condicao", "autenticado");
    });
  }

  loginComGoogleCount() {
    return this.authLoginProvider(new GoogleAuthProvider()).then(() => {
      this.storage.setItem("condicao", "autenticado");
    });
  }

  loginComGithub() {
    return this.authLoginProvider(new GithubAuthProvider()).then(() => {
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
