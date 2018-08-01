import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../category.service";
import {Category} from "../category";
import {Router} from "@angular/router";
import {HandlerErrorMessage} from "../../util/handler-error-message";
import {MSG_CATEGORY_DELETED, MSG_ERROR, MSG_SUCCESS} from "../../util/constants-messages";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  public categories: Array<Category>;

  public displayModalDeleteCategory: boolean = false;

  public categoryToDelete: Category;

  public errorHandler: HandlerErrorMessage = new HandlerErrorMessage();

  constructor(private service: CategoryService, private router: Router,
              private messageService: MessageService) { }

  ngOnInit() {
    this.search();
  }

  public search(): void {
    this.service.list().subscribe(result => {
      this.categories = result;
    }, error => {
      this.messageService.add({severity: 'error', summary: MSG_ERROR, detail: this.errorHandler.getErrorMessage(error)});
    });
  }

  public goToNewCategory(): void {
    this.router.navigate(["/categories/add"]);
  }

  public goToEditCategory(id: number): void {

  }

  public showModalDeleteCategory(category: Category): void {
    this.categoryToDelete = Object.assign({}, category);
    this.displayModalDeleteCategory = true;
  }

  public removeCategory(): void {
    this.service.remove(this.categoryToDelete.id).subscribe(() => {
      this.messageService.add({severity: 'success', summary: MSG_SUCCESS, detail: MSG_CATEGORY_DELETED});
      this.displayModalDeleteCategory = false;
      this.search();
    }, error => {
      this.messageService.add({severity: 'error', summary: MSG_ERROR, detail: this.errorHandler.getErrorMessage(error)});
    });
  }


}
