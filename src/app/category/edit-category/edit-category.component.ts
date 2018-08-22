import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ISubscription} from "rxjs/Subscription";
import {CategoryService} from "../category.service";
import {Message, MessageService} from "primeng/components/common/api";
import {MSG_CATEGORY_UPDATED, MSG_ERROR} from "../../util/constants-messages";
import {HandlerErrorMessage} from "../../util/handler-error-message";
import {Category} from "../category";
import {FormGroup} from "@angular/forms";
import {InitFormGroupService} from "../../util/init-form-group.service";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  // public errorHandler: HandlerErrorMessage = new HandlerErrorMessage();

  private subs: ISubscription[] = [];

  public category: Category;

  public categoryForm: FormGroup;

  constructor(private activedRoute: ActivatedRoute,
              private service: CategoryService,
              private messageService: MessageService,
              private initFormGroupService: InitFormGroupService) { }

  ngOnInit() {
    this.activedRoute.params.subscribe(params => {
      this.subs.push(
        this.service.view(+params["id"]).subscribe(result => {
          this.category = result;
          this.categoryForm = this.initFormGroupService.getFormGroupCategory(this.category);
        }, error => {
          /*this.messageService.add({severity: 'error', summary: MSG_ERROR,
            detail: this.errorHandler.getErrorMessage(error)});*/
        })
      );
    });
  }

  public clearCategoryForm(): void {
    this.categoryForm.reset();
    this.category = new Category();
  }

  public cancelFormCategory(): void {

  }

  public update(): void {
    this.subs.push(
      this.service.update(this.category).subscribe(() => {
        this.messageService.add({severity: 'success', detail: MSG_CATEGORY_UPDATED});
      }, error => {
        /*this.messageService.add({severity: 'error', summary: MSG_ERROR,
          detail: this.errorHandler.getErrorMessage(error)});*/
      })
    );
  }
}
