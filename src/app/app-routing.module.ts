import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: 'app/product/product.module#ProductModule'
  },
  {
    path: 'categories',
    loadChildren: 'app/category/category.module#CategoryModule'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
