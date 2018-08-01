import {MSG_CP_PHOTO_CHANGED} from './../../util/msg-components';
import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Product} from '../product';
import {Category} from "../../category/category";
import {CategoryService} from "../../category/category.service";
import {AutoComplete} from "primeng/primeng";
import {ISubscription} from "rxjs/Subscription";
import {FormGroup} from "@angular/forms";
import {InitFormGroupService} from "../../util/init-form-group.service";
import {MSG_COMPONENT_CATEGORY_CREATED, MSG_COMPONENT_ERROR} from "../../util/constants-messages";

class CategorySelect {
  public label: string;
  public value: Category;

  constructor(label, value) {
    this.label = label;
    this.value = value;
  }
}

@Component({
  selector: 'app-product-fields',
  templateUrl: './product-fields.component.html',
  styleUrls: ['./product-fields.component.css']
})
export class ProductFieldsComponent implements OnInit {

  @Input()
  public product: Product;

  @Input()
  public productForm: FormGroup;

  @Output()
  public notify: EventEmitter<any> = new EventEmitter<any>();

  public categories: Array<CategorySelect> = [];

  @ViewChild(AutoComplete) autoCompleteComponent: AutoComplete;

  public subs: ISubscription[] = [];

  public displayDialog: boolean = false;

  constructor(private categoryService: CategoryService, private initFormGroupService: InitFormGroupService) { }

  ngOnInit() {
    if (this.product === undefined || this.product === null) {
      this.product = new Product();
    }
    if (this.productForm === undefined || this.productForm === null)
      this.productForm = this.initFormGroupService.getFormGroupProduct(this.product);
    this.getCategories();
  }

  public onChangeImage(event: any): void {
    this.notify.emit({msg: MSG_CP_PHOTO_CHANGED, photo: event.target.files.item(0)});
  }

  private getCategories(): void {
    this.categories = [];
    this.subs.push(
      this.categoryService.list().subscribe(result => {
        result.forEach(category => {
          this.categories.push(new CategorySelect(category.name, category));
        });
      }, error => {
        this.notify.emit({msg: MSG_COMPONENT_ERROR, error: error});
      })
    );
  }

  public removeCategory(category: Category): void {
    for (let i = 0; i < this.product.categories.length; i++) {
      if (category.id === this.product.categories[i].id) {
        this.product.categories.splice(i, 1);
      }
    }
  }

  public onNotify(event): void {
    switch (event.msg) {
      case MSG_COMPONENT_CATEGORY_CREATED:
        this.getCategories();
        this.displayDialog = false;
        this.notify.emit({msg: MSG_COMPONENT_CATEGORY_CREATED});
        break;
    }
  }

}
