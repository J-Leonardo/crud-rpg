import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatInputModule } from "@angular/material/input";
import { Personagem } from "src/app/models/personagem.module";
import { PersonagemFirebaseService } from "src/app/services/personagem-firebase.service";

interface Selecao {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-criar",
  templateUrl: "./criar.component.html",
  styleUrls: ["./criar.component.scss"],
})
export class CriarComponent implements OnInit {
  constructor(
    private _router: Router,
    private _personagensService: PersonagemFirebaseService,
    private _formBuilder: FormBuilder
  ) {
    this.formCriar = this._formBuilder.group({
      nome: ["", [Validators.required]],
      funcao: ["", [Validators.required]],
      principal: ["", [Validators.required]],
      secundaria: ["", [Validators.required]],
      magia: ["", [Validators.required]],
      orientacao: ["", [Validators.required]],
      orientacao2: ["", [Validators.required]],
      equipamento: ["", [Validators.required]],
    });
  }

  principal: Selecao[] = [
    { value: "Combatente", viewValue: "Combatente" },
    { value: "Usuário de magia", viewValue: "Usuário de magia" },
    { value: "Suporte", viewValue: "Suporte" },
    { value: "Defensor", viewValue: "Defensor" },
  ];

  secundarias: Selecao[] = [
    { value: "Usuário de magia leve", viewValue: "Usuário de magia leve" },
    { value: "Utilidade interação", viewValue: "Utilidade interação" },
    { value: "Utilidade com itens", viewValue: "Utilidade com itens" },
    { value: "Controle", viewValue: "Controle" },
  ];

  magias: Selecao[] = [
    { value: "Origem divina", viewValue: "Origem divina" },
    { value: "Origem arcana", viewValue: "Origem arcana" },
    { value: "Origem de pacto", viewValue: "Origem de pacto" },
  ];

  orientacaos: Selecao[] = [
    { value: "Bom", viewValue: "Bom" },
    { value: "Neutro", viewValue: "Neutro" },
    { value: "Mal", viewValue: "Mal" },
  ];

  funcaos: Selecao[] = [
    { value: "Magico combatente", viewValue: "Magico combatente" },
    { value: "Magico utilidade", viewValue: "Magico utilidade" },
    {
      value: "Combatente corpo a corpo",
      viewValue: "Combatente corpo a corpo",
    },
    { value: "Combatente a distancia", viewValue: "Combatente a distancia" },
    { value: "Curador", viewValue: "Curador" },
    { value: "Tanque", viewValue: "Tanque" },
  ];

  orientacaos2: Selecao[] = [
    { value: "Leal", viewValue: "Leal" },
    { value: "Neutro", viewValue: "Neutro" },
    { value: "Caos", viewValue: "Caos" },
  ];

  equipamentos: Selecao[] = [
    {
      value: "Arma uma mão, armadura, escudo",
      viewValue: "Arma uma mão, armadura, escudo",
    },
    {
      value: "Arma duas mãos, armadura",
      viewValue: "Arma duas mãos, armadura",
    },
    {
      value: "Arco e flecha, armadura leve, adaga",
      viewValue: "Arco e flecha, armadura leve, adaga",
    },
    { value: "Foco, adaga", viewValue: "Foco, adaga" },
  ];

  ngOnInit(): void {}

  public formCriar: FormGroup;

  private validarFormulario() {
    for (let campos in this.formCriar.controls) {
      this.formCriar.controls[campos].markAsTouched();
    }
  }

  public submitForm() {
    this.validarFormulario();
    if (!this.formCriar.valid) {
      return;
    } else {
      this.salvar();
    }
  }

  public salvar(): void {
    const target = document.getElementById("imagem") as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file.type.split("/")[0] != "image") {
      alert("Tipo de arquivo não suportado");
      return;
    } else {
      this._personagensService
        .uploadStorage(file, this.formCriar.value)
        .then(() => {
          this._router.navigate(["/listaDePersonagens"]);
        })
        .catch((error) => {
          console.log(error);
          alert("deu ruim");
        });
    }
  }

  public listar(){
    this._router.navigate(["/listaDePersonagens"])
  }
}
