import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;
  storage:Storage;

  constructor(
    private _router: Router,
    private _usuarioService: UsuarioService,
    private _formBuilder: FormBuilder
  ) {
    this.storage=window.localStorage;
    this.formLogin = this._formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    if (this._usuarioService.storage.getItem("condicao") == "autenticado"){
      this._router.navigate(["/listaDePersonagens"]);
    }
  }

  private validarFormulario() {
    for (let campos in this.formLogin.controls) {
      this.formLogin.controls[campos].markAsTouched();
    }
  }

  public submitForm() {
    this.validarFormulario();
    if (!this.formLogin.valid) {
      return;
    } else {
      this.logarComEmailSenha();
    }
  }

  logarComEmailSenha() {
    this._usuarioService
      .loginComEmailSenha(
        this.formLogin.controls["email"].value,
        this.formLogin.controls["password"].value
      )
      .then(() => {
        alert("Login efetuado com sucesso!");
        this._router.navigate(["/listaDePersonagens"]);
      })
      .catch((error) => {
        alert("Deu ruim");
        console.log(error);
      });
  }

  logarComGoogleCount() {
    this._usuarioService
      .loginComGoogleCount()
      .then(() => {
        alert("Login efetuado com sucesso!");
        this._router.navigate(["/listaDePersonagens"]);
      })
      .catch((error) => {
        alert("Deu ruim");
        console.log(error);
      });
  }
}
