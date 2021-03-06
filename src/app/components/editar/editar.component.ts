import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Personagem } from "src/app/models/personagem.module";
import { PersonagemFirebaseService } from "src/app/services/personagem-firebase.service";

interface Selecao {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-editar",
  templateUrl: "./editar.component.html",
  styleUrls: ["./editar.component.scss"],
})
export class EditarComponent implements OnInit {
  constructor(
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _personagemService: PersonagemFirebaseService,
    private _formBuilder: FormBuilder
  ) {
    this.formEditar = this._formBuilder.group({
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

  downloadURL?: string;

  ngOnInit(): void {
    this._actRoute.params.subscribe((parametros) => {
      if (parametros["indice"]) {
        this.id = parametros["indice"];
        this._personagemService
          .getPersonagem(parametros["indice"])
          .subscribe((res) => {
            let personagemRef: any = res;
            this.downloadURL = personagemRef.downloadURL;
            this.formEditar = this._formBuilder.group({
              nome: [personagemRef.nome, [Validators.required]],
              funcao: [personagemRef.funcao, [Validators.required]],
              principal: [personagemRef.principal, [Validators.required]],
              secundaria: [personagemRef.secundaria, [Validators.required]],
              magia: [personagemRef.magia, [Validators.required]],
              orientacao: [personagemRef.orientacao, [Validators.required]],
              orientacao2: [personagemRef.orientacao2, [Validators.required]],
              equipamento: [personagemRef.equipamento, [Validators.required]],
            });
          });
      }
    });
  }

  public formEditar: FormGroup;
  private id?: any;

  private validarFormulario() {
    for (let campos in this.formEditar.controls) {
      this.formEditar.controls[campos].markAsTouched();
    }
  }

  principal: Selecao[] = [
    { value: "Combatente", viewValue: "Combatente" },
    { value: "Usu??rio de magia", viewValue: "Usu??rio de magia" },
    { value: "Suporte", viewValue: "Suporte" },
    { value: "Defensor", viewValue: "Defensor" },
  ];

  secundarias: Selecao[] = [
    { value: "Usu??rio de magia leve", viewValue: "Usu??rio de magia leve" },
    { value: "Utilidade intera????o", viewValue: "Utilidade intera????o" },
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
      value: "Arma uma m??o, armadura, escudo",
      viewValue: "Arma uma m??o, armadura, escudo",
    },
    {
      value: "Arma duas m??os, armadura",
      viewValue: "Arma duas m??os, armadura",
    },
    {
      value: "Arco e flecha, armadura leve, adaga",
      viewValue: "Arco e flecha, armadura leve, adaga",
    },
    { value: "Foco, adaga", viewValue: "Foco, adaga" },
  ];

  public submitForm() {
    this.validarFormulario();
    if (!this.formEditar.valid) {
      return;
    } else {
      this.salvar();
    }
  }

  public salvar(): void {
    const target = document.getElementById("imagem") as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file == null || file.type.split("/")[0] != "image") {
      let personagem = this.formEditar.value;
      personagem.downloadURL = this.downloadURL;
      this._personagemService.editarPersonagem(this.formEditar.value, this.id);
      this._router.navigate(["/listaDePersonagens"]);
    } else {
      this._personagemService
        .updateStorage(file, this.formEditar.value, this.id)
        .then(() => {
          this._router.navigate(["/listaDePersonagens"]);
        })
        .catch((error) => {
          console.log(error);
          alert("deu ruim");
        });
    }
  }

  public listar() {
    this._router.navigate(["/listaDePersonagens"]);
  }
}
