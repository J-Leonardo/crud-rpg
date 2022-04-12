import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CadastroComponent } from "./components/cadastro/cadastro.component";
import { CriarComponent } from "./components/criar/criar.component";
import { EditarComponent } from "./components/editar/editar.component";
import { ListarComponent } from "./components/listar/listar.component";
import { LoginComponent } from "./components/login/login.component";
import { UsuarioGuard } from "./services/usuario.guard";

const routes: Routes = [
  {
    path: "listaDePersonagens",
    component: ListarComponent,
    canActivate: [UsuarioGuard],
  },
  {
    path: "criarPersonagem",
    component: CriarComponent,
    canActivate: [UsuarioGuard],
  },
  {
    path: "editarPersonagens/:indice",
    component: EditarComponent,
    canActivate: [UsuarioGuard],
  },
  { path: "login", component: LoginComponent },
  { path: "cadastro", component: CadastroComponent },
  { path: "**", redirectTo: "/login" },
  { path: "", redirectTo: "/login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
