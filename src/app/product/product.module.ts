import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductFieldsComponent } from './product-fields/product-fields.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { HttpModule } from '@angular/http';
import {GrowlModule} from 'primeng/growl';
import {DataViewModule} from 'primeng/dataview';
import {TooltipModule} from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';
import { SharedModule } from '../util/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ModalDeleteProductComponent } from './modal-delete-product/modal-delete-product.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    SharedModule
  ],
  declarations: [ProductListComponent, CreateProductComponent, ProductFieldsComponent, ProductDetailsComponent, EditProductComponent, ModalDeleteProductComponent],
  providers: [ProductService]
})
export class ProductModule { }
