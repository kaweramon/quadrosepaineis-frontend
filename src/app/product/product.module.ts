import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {ProductListComponent} from './product-list/product-list.component';
import {CreateProductComponent} from './create-product/create-product.component';
import {ProductFieldsComponent} from './product-fields/product-fields.component';
import {ProductService} from './product.service';
import {HttpModule} from '@angular/http';
import {SharedModule} from '../util/shared.module';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {EditProductComponent} from './edit-product/edit-product.component';
import {ModalDeleteProductComponent} from './modal-delete-product/modal-delete-product.component';
import {CurrencyMaskModule} from "ng2-currency-mask";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ProductRoutingModule,
    SharedModule,
    CurrencyMaskModule
  ],
  declarations: [ProductListComponent, CreateProductComponent, ProductFieldsComponent,
    ProductDetailsComponent, EditProductComponent, ModalDeleteProductComponent],
  providers: [ProductService]
})
export class ProductModule { }
