import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Personagem } from "src/app/models/personagem.module";
import { PersonagemService } from "src/app/services/personagem.service";

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
    private _personagemService: PersonagemService,
    private _formBuilder: FormBuilder
  ) {
    this.formEditar = this._formBuilder.group({
      funcao: ["", [Validators.required]],
      principal: ["", [Validators.required]],
      secundaria: ["", [Validators.required]],
      magia: ["", [Validators.required]],
      orientacao: ["", [Validators.required]],
      orientacao2: ["", [Validators.required]],
      equipamento: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._actRoute.params.subscribe((parametros) => {
      if (parametros["indice"]) {
        this.index = parametros["indice"];
        let personagem = this._personagemService.getPersonagem(this.index);
        this.formEditar = this._formBuilder.group({
          funcao: [personagem.getFuncao(), [Validators.required]],
          principal: [personagem.getPrincipal(), [Validators.required]],
          secundaria: [personagem.getSecundario(), [Validators.required]],
          magia: [personagem.getMagia(), [Validators.required]],
          orientacao: [personagem.getOrientacao(), [Validators.required]],
          orientacao2: [personagem.getOrientacao2(), [Validators.required]],
          equipamento: [personagem.getEquipamento(), [Validators.required]],
        });
      }
    });
  }

  public formEditar: FormGroup;
  public index: number = -1;

  private validarFormulario() {
    for (let campos in this.formEditar.controls) {
      this.formEditar.controls[campos].markAsTouched();
    }
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

  public submitForm() {
    this.validarFormulario();
    if (!this.formEditar.valid) {
      return;
    } else {
      this.salvar();
    }
  }

  public salvar(): void {
    let personagem = new Personagem(
      this.formEditar.controls["funcao"].value,
      this.formEditar.controls["principal"].value,
      this.formEditar.controls["secundario"].value,
      this.formEditar.controls["magia"].value,
      this.formEditar.controls["orientacao"].value,
      this.formEditar.controls["orientacao2"].value,
      this.formEditar.controls["equipamento"].value
    );
    if (this._personagemService.editarPersonagem(this.index, personagem)) {
      this._router.navigate(["/listaDePersonagens"]);
    } else {
      alert("deu ruim");
    }
  }
}
