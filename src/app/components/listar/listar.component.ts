import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personagem } from 'src/app/modules/personagem/personagem.module';
import { PersonagemService } from 'src/app/services/personagem.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class ListarComponent implements OnInit {
  constructor(
    private _router: Router,
    private _personagemService: PersonagemService
  ) {}

  public lista_personagens: Personagem[] = [];

  ngOnInit(): void {
    this.lista_personagens = this._personagemService.getPersonagens();
  }

  public excluir(index: number): void {
    let resultado = confirm('deseja excluir o personagem?');
    if (resultado) {
      if (this._personagemService.excluirPrdouto(index)) {
        alert('adeus');
      } else {
        alert('deu ruim');
      }
    }
  }

  public editar(indice: number): void {
    this._router.navigate(['/editarPersonagens', indice]);
  }

  public irParaCriarPersonagem(): void {
    this._router.navigate(['/criarPersonagem']);
  }
}
