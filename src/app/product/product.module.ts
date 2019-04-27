import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {ProductListComponent} from './product-list/product-list.component';
import {CreateProductComponent} from './create-product/create-product.component';
import {ProductFieldsComponent} from './product-fields/product-fields.component';
import {ProductService} from './product.service';
import {SharedModule} from '../shared/shared.module';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {EditProductComponent} from './edit-product/edit-product.component';
import {ModalDeleteProductComponent} from './modal-delete-product/modal-delete-product.component';
import {CurrencyMaskModule} from "ng2-currency-mask";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SortProductsComponent } from './sort-products/sort-products.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    SharedModule,
    CurrencyMaskModule
  ],
  declarations: [ProductListComponent, CreateProductComponent, ProductFieldsComponent,
    ProductDetailsComponent, EditProductComponent, ModalDeleteProductComponent, SortProductsComponent],
  providers: [ProductService]
})
export class ProductModule { }
