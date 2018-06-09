import { MSG_CP_PHOTO_CHANGED } from './../../util/msg-components';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '../product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InitFormGroupUtil } from '../../util/init-form-group-util';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    if (this.product === undefined || this.product === null) {
      this.product = new Product();
    }
    if (this.productForm === undefined || this.productForm === null) {
      this.productForm = InitFormGroupUtil.getFormGroupProduct(this.product, this.formBuilder);
    }
  }

  public onChangeImage(event: any): void {
    this.notify.emit({msg: MSG_CP_PHOTO_CHANGED, photo: event.target.files.item(0)});
  }

}
