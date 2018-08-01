import {NgModule} from '@angular/core';
import {MessageService} from 'primeng/components/common/messageservice';
import {DataViewModule} from 'primeng/dataview';
import {TooltipModule} from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {CategoryService} from "../category/category.service";
import {MultiSelectModule} from 'primeng/multiselect';
import {CommonModule} from "@angular/common";
import {ValidationMessageComponent} from "./validation-message/validation-message.component";
import {InitFormGroupService} from "./init-form-group.service";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {CreateCategoryComponent} from "../category/create-category/create-category.component";
import {CategoryFieldsComponent} from "../category/category-fields/category-fields.component";
import {ReactiveFormsModule} from "@angular/forms";
import {EditCategoryComponent} from "../category/edit-category/edit-category.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataViewModule,
    TooltipModule,
    DialogModule,
    ConfirmDialogModule,
    MultiSelectModule,
    TableModule,
    ToastModule
  ],
  declarations: [
    ValidationMessageComponent,
    CategoryFieldsComponent,
    CreateCategoryComponent,
    EditCategoryComponent
  ],
  exports: [
    DataViewModule,
    TooltipModule,
    DialogModule,
    ConfirmDialogModule,
    MultiSelectModule,
    TableModule,
    ToastModule,
    ValidationMessageComponent,
    CreateCategoryComponent
  ],
  providers: [
    MessageService,
    ConfirmationService,
    CategoryService,
    InitFormGroupService
  ]
})
export class SharedModule { }
