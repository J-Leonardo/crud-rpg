import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CriarComponent } from "./components/criar/criar.component";
import { EditarComponent } from "./components/editar/editar.component";
import { ListarComponent } from "./components/listar/listar.component";

const routes: Routes = [
  { path: "listaDePersonagens", component: ListarComponent },
  { path: "criarPersonagem", component: CriarComponent },
  { path: "editarPersonagens/:indice", component: EditarComponent },
  { path: "**", redirectTo: "/listaDePersonagens" },
  { path: "", redirectTo: "/listaDePersonagens", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
