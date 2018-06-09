import { NgModule } from '@angular/core';
import {GrowlModule} from 'primeng/growl';
import { MessageService } from 'primeng/components/common/messageservice';
import {DataViewModule} from 'primeng/dataview';
import {TooltipModule} from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

@NgModule({
  imports: [
    GrowlModule,
    DataViewModule,
    TooltipModule,
    DialogModule,
    ConfirmDialogModule
  ],
  declarations: [],
  exports: [
    GrowlModule,
    DataViewModule,
    TooltipModule,
    DialogModule,
    ConfirmDialogModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class SharedModule { }
