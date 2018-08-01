import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Category} from "../category";
import {MSG_COMPONENT_ENTER_PRESSED} from "../../util/constants-messages";

@Component({
  selector: 'app-category-fields',
  templateUrl: './category-fields.component.html',
  styleUrls: ['./category-fields.component.css']
})
export class CategoryFieldsComponent {

  @Input()
  public categoryForm: FormGroup;

  @Input()
  public category: Category;

  @Output()
  public notify: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  public sendEventKeyPressed(): void {
    this.notify.emit({msg: MSG_COMPONENT_ENTER_PRESSED});
  }

}
