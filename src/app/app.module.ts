import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ListarComponent } from "./components/listar/listar.component";
import { CriarComponent } from "./components/criar/criar.component";
import { EditarComponent } from "./components/editar/editar.component";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { environment } from "src/environments/environment";
import { LoginComponent } from "./components/login/login.component";
import { CadastroComponent } from "./components/cadastro/cadastro.component";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogoComponent } from './components/listar/dialogo/dialogo.component';
import { LogoutComponent } from './components/listar/logout/logout.component';
import {MatCardModule} from '@angular/material/card';
import { UsuarioService } from "./services/usuario.service";

@NgModule({
  declarations: [
    AppComponent,
    ListarComponent,
    CriarComponent,
    EditarComponent,
    LoginComponent,
    CadastroComponent,
    DialogoComponent,
    LogoutComponent,
  ],
  imports: [
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,    
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent],
})
export class AppModule {}
