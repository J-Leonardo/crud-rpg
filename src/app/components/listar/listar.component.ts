import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personagem } from 'src/app/models/personagem.module';
import { PersonagemFirebaseService } from 'src/app/services/personagem-firebase.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from './dialogo/dialogo.component';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class ListarComponent implements OnInit {
  constructor(
    private _router: Router,
    private _personagemService: PersonagemFirebaseService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
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
    let dialogRef = this.dialog.open(DialogoComponent, {
      width: '250px',
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._personagemService.deletarPersonagem(personagem)
          .then(() => {
            this._snackBar.open("Personagem excluído", "Fechar", {
              duration: 1000,
              panelClass: ['blue-snackbar']
            })
          })
          .catch(() => {
            this._snackBar.open("Deu ruim", "Fechar", {
              duration: 1000,
              panelClass: ['blue-snack']
            })
          })
      }
    })
  }

  public editar(personagem: Personagem): void {
    this._router.navigate(['/editarPersonagens', personagem.id]);
  }

  public irParaCriarPersonagem(): void {
    this._router.navigate(['/criarPersonagem']);
  }
}
