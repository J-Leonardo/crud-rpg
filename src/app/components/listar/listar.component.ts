import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personagem } from 'src/app/models/personagem.module';
import { PersonagemFirebaseService } from 'src/app/services/personagem-firebase.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class ListarComponent implements OnInit {
  constructor(
    private _router: Router,
    private _personagemService: PersonagemFirebaseService
  ) {}

  public lista_personagens: Personagem[] = [];

  ngOnInit(): void {
    this._personagemService.getPersonagems().subscribe((res) => {
      this.lista_personagens = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Personagem),
        } as Personagem;
      });
    });
  }

  public excluir(personagem: Personagem): void {
    let resultado = confirm('deseja excluir o personagem?');
    if (resultado) {
      this._personagemService
        .deletarPersonagem(personagem)
        .then(() => {
          alert('adeus ');
        })
        .catch((error) => {
          console.log(error);
          alert('deu ruim');
        });
    }
  }

  public editar(personagem: Personagem): void {
    this._router.navigate(['/editarPersonagens', personagem.id]);
  }

  public irParaCriarPersonagem(): void {
    this._router.navigate(['/criarPersonagem']);
  }
}
