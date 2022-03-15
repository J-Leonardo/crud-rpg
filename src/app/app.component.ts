import { Component, ViewChild } from '@angular/core';
import { Personagem } from './models/personagem.module';
import { MatTable } from '@angular/material/table';

interface Selecao {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  edit = false;
  public primaria: string | undefined;
  public secundaria: string | undefined;
  public magia: string | undefined;
  public orientacao: string | undefined;
  public funcao: string | undefined;
  public orientacao2: string | undefined;
  public equipamento: string | undefined;
  public index: number = -1;


  public lista_personagens: Personagem[] = [];


  principal: Selecao[] = [
    { value: 'Combatente', viewValue: 'Combatente' },
    { value: 'Usuário de magia', viewValue: 'Usuário de magia' },
    { value: 'Suporte', viewValue: 'Suporte' },
    { value: 'Defensor', viewValue: 'Defensor' },
  ];

  secundarias: Selecao[] = [
    { value: 'Usuário de magia leve', viewValue: 'Usuário de magia leve' },
    { value: 'Utilidade interação', viewValue: 'Utilidade interação' },
    { value: 'Utilidade com itens', viewValue: 'Utilidade com itens' },
    { value: 'Controle', viewValue: 'Controle' },
  ];

  magias: Selecao[] = [
    { value: 'Origem divina', viewValue: 'Origem divina' },
    { value: 'Origem arcana', viewValue: 'Origem arcana' },
    { value: 'Origem de pacto', viewValue: 'Origem de pacto' },
  ];

  orientacaos: Selecao[] = [
    { value: 'Bom', viewValue: 'Bom' },
    { value: 'Neutro', viewValue: 'Neutro' },
    { value: 'Mal', viewValue: 'Mal' },
  ];

  funcaos: Selecao[] = [
    { value: 'Magico combatente', viewValue: 'Magico combatente' },
    { value: 'Magico utilidade', viewValue: 'Magico utilidade' },
    { value: 'Combatente corpo a corpo', viewValue: 'Combatente corpo a corpo' },
    { value: 'Combatente a distancia', viewValue: 'Combatente a distancia' },
    { value: 'Curador', viewValue: 'Curador' },
    { value: 'Tanque', viewValue: 'Tanque' },
  ];

  orientacaos2: Selecao[] = [
    { value: 'Leal', viewValue: 'Leal' },
    { value: 'Neutro', viewValue: 'Neutro' },
    { value: 'Caos', viewValue: 'Caos' },
  ];

  equipamentos: Selecao[] = [
    { value: 'Arma uma mão, armadura, escudo', viewValue: 'Arma uma mão, armadura, escudo' },
    { value: 'Arma duas mãos, armadura', viewValue: 'Arma duas mãos, armadura' },
    { value: 'Arco e flecha, armadura leve, adaga', viewValue: 'Arco e flecha, armadura leve, adaga' },
    { value: 'Foco, adaga', viewValue: 'Foco, adaga' },
  ];

  public add(): void {
    if (!this.funcao) {
      alert('funcao');
      return;
    }
    if (!this.primaria) {
      alert('prima');
      return;
    }
    if (!this.secundaria) {
      alert('secunda');
      return;
    }
    if (!this.magia) {
      alert('magia');
      return;
    }
    if (!this.orientacao) {
      alert('IC');
      return;
    }
    if (!this.orientacao2) {
      alert('IC2');
      return;
    }
    if (!this.equipamento) {
      alert('peladao');
      return;
    }
    if (this.index == -1) {
      this.lista_personagens.push(
        new Personagem(
          this.funcao,
          this.primaria,
          this.secundaria,
          this.magia,
          this.orientacao,
          this.orientacao2,
          this.equipamento
        )
      );
    } else {
      this.lista_personagens[this.index].setFuncao(this.funcao);
      this.lista_personagens[this.index].setPrincipal(this.primaria);
      this.lista_personagens[this.index].setSecundario(this.secundaria);
      this.lista_personagens[this.index].setMagia(this.magia);
      this.lista_personagens[this.index].setOrientacao(this.orientacao);
      this.lista_personagens[this.index].setOrientacao2(this.orientacao2);
      this.lista_personagens[this.index].setEquipamento(this.equipamento);
      this.edit = false;
      this.index = -1;
    }
    this.funcao = undefined;
    this.primaria = undefined;
    this.secundaria = undefined;
    this.magia = undefined;
    this.orientacao = undefined;
    this.orientacao2 = undefined;
    this.equipamento = undefined;
  }

  public excluir(i: number) {
    this.lista_personagens.splice(i, 1);
  }
  public editar(i: number) {
    this.edit = true;
    this.funcao = this.lista_personagens[i].getFuncao();
    this.primaria = this.lista_personagens[i].getPrincipal();
    this.secundaria = this.lista_personagens[i].getSecundario();
    this.magia = this.lista_personagens[i].getMagia();
    this.orientacao = this.lista_personagens[i].getOrientacao();
    this.orientacao2 = this.lista_personagens[i].getOrientacao2();
    this.equipamento = this.lista_personagens[i].getEquipamento();
    this.index = i;
  }

}
