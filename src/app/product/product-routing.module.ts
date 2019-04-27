import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import {SortProductsComponent} from "./sort-products/sort-products.component";
import {LoggedinGuard} from "../security/loggedin.guard";

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'add',
    component: CreateProductComponent,
    canLoad: [LoggedinGuard], canActivate: [LoggedinGuard]
  },
  {
    path: 'edit/:id',
    component: EditProductComponent,
    canLoad: [LoggedinGuard], canActivate: [LoggedinGuard]
  },
  {
    path: 'details/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'sort',
    component: SortProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
