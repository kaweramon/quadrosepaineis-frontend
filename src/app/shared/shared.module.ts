import {ModuleWithProviders, NgModule} from '@angular/core';
import {MessageService} from 'primeng/components/common/messageservice';
import {DataViewModule} from 'primeng/dataview';
import {TooltipModule} from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {CategoryService} from "../category/category.service";
import {MultiSelectModule} from 'primeng/multiselect';
import {CommonModule} from "@angular/common";
import {ValidationMessageComponent} from "../util/validation-message/validation-message.component";
import {InitFormGroupService} from "../util/init-form-group.service";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FileUploadModule} from 'primeng/fileupload';
import {GalleriaModule} from 'primeng/galleria';
import {GrowlModule} from 'primeng/growl';

import {CreateCategoryComponent} from "../category/create-category/create-category.component";
import {CategoryFieldsComponent} from "../category/category-fields/category-fields.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EditCategoryComponent} from "../category/edit-category/edit-category.component";
import {InputComponent} from "../util/input/input.component";
import {LoginService} from "../security/login/login.service";
import {LoginComponent} from "../security/login/login.component";
import {LoggedinGuard} from "../security/loggedin.guard";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "../security/auth-interceptor";
import {HandlerErrorMessage} from "../util/handler-error-message";
import {NotificationsService} from "../util/notifications/notifications.service";
import {NotificationsComponent} from "../util/notifications/nofitications.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataViewModule,
    TooltipModule,
    DialogModule,
    ConfirmDialogModule,
    MultiSelectModule,
    TableModule,
    ToastModule,
    AutoCompleteModule,
    FileUploadModule,
    GalleriaModule,
    GrowlModule
  ],
  declarations: [
    ValidationMessageComponent,
    CategoryFieldsComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    InputComponent,
    LoginComponent,
    NotificationsComponent
  ],
  exports: [
    DataViewModule,
    TooltipModule,
    DialogModule,
    ConfirmDialogModule,
    MultiSelectModule,
    TableModule,
    ToastModule,
    AutoCompleteModule,
    ValidationMessageComponent,
    CreateCategoryComponent,
    NotificationsComponent,
    InputComponent,
    FileUploadModule,
    GalleriaModule,
    GrowlModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers:
      [
        MessageService,
        ConfirmationService,
        CategoryService,
        InitFormGroupService,
        LoginService,
        LoggedinGuard,
        HandlerErrorMessage,
        NotificationsService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
      ]
    };
  }

}
