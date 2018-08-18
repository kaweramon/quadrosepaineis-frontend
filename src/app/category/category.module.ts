import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoryRoutingModule} from './category-routing.module';
import {CategoryService} from "./category.service";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {CategoryListComponent} from "./category-list/category-list.component";

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    CategoryListComponent
  ],
  providers: [CategoryService]
})
export class CategoryModule { }
