import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.scss"],
})
export class CadastroComponent implements OnInit {
  public formCadastrar: FormGroup;

  constructor(
    private _router: Router,
    private _usuarioService: UsuarioService,
    private _formBuilder: FormBuilder
  ) {
    this.formCadastrar = this._formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  private validarFormulario() {
    for (let campos in this.formCadastrar.controls) {
      this.formCadastrar.controls[campos].markAsTouched();
    }
  }

  public submitForm() {
    this.validarFormulario();
    if (!this.formCadastrar.valid) {
      return;
    } else {
      this.cadastrar();
    }
  }

  cadastrar() {
    if (
      this.formCadastrar.controls["password"].value ==
      this.formCadastrar.controls["confirmPassword"].value
    ) {
      this._usuarioService
        .cadastrarComEmailSenha(
          this.formCadastrar.controls["email"].value,
          this.formCadastrar.controls["password"].value
        )
        .then(() => {
          alert("Cadastro efetuado com sucesso!");
          this._router.navigate(["/login"]);
        })
        .catch((error) => {
          alert("Deu ruim");
          console.log(error);
        });
    } else {
      alert("Senhas diferentes!");
    }
  }
}
