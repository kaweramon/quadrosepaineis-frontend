import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from "./security/login/login.component";

const routes: Routes = [
  {
    path: "login/:redirectTo", component: LoginComponent
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: 'products',
    loadChildren: 'app/product/product.module#ProductModule'

  },
  {
    path: 'categories',
    loadChildren: 'app/category/category.module#CategoryModule'
  },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products' }, // qualquer coisa diferente das rotas configuradas
  // TODO: Fazer componente de página não encontrada
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
