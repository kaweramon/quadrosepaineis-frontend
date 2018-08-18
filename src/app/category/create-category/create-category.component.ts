import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from "../category";
import {FormGroup} from "@angular/forms";
import {InitFormGroupService} from "../../util/init-form-group.service";
import {CategoryService} from "../category.service";
import {MessageService} from "primeng/components/common/messageservice";
import {
  MSG_CATEGORY_CREATED,
  MSG_COMPONENT_CATEGORY_CREATED,
  MSG_COMPONENT_ENTER_PRESSED,
  MSG_ERROR,
  MSG_SUCCESS
} from "../../util/constants-messages";
import {HandlerErrorMessage} from "../../util/handler-error-message";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  public category: Category;

  public categoryForm: FormGroup;

  @Input()
  public hideCancelBtn: boolean = false;

  @Output()
  public notify: EventEmitter<any> = new EventEmitter<any>();

  public errorHandler: HandlerErrorMessage = new HandlerErrorMessage();

  constructor(private initFormService: InitFormGroupService,
              private service: CategoryService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.category = new Category();
    this.categoryForm = this.initFormService.getFormGroupCategory(this.category);
  }

  public clearCategoryForm(): void {
    this.categoryForm.reset();
    this.category = new Category();
  }

  public cancelFormCategory(): void {

  }

  public save(): void {
    if (this.categoryForm.valid) {
      this.service.create(this.category).subscribe(() => {
        if (!this.hideCancelBtn)
          this.messageService.add({severity: 'success', summary: MSG_SUCCESS, detail: MSG_CATEGORY_CREATED});
        this.clearCategoryForm();
        this.notify.emit({msg: MSG_COMPONENT_CATEGORY_CREATED});
      }, error => {
        this.messageService.add({severity: 'error', summary: MSG_ERROR, detail: this.errorHandler.getErrorMessage(error)});
      });
    }
  }

  public onNotify(event: any): void {
    switch (event.msg) {
      case MSG_COMPONENT_ENTER_PRESSED:
        this.save();
        break;
    }
  }

}
