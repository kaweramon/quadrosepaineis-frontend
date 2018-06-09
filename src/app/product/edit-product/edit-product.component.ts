import { MSG_ERROR, MSG_PRODUCT_UPDATED, MSG_SUCCESS } from './../../util/constants-messages';
import { MSG_CP_PHOTO_CHANGED } from './../../util/msg-components';
import { InitFormGroupUtil } from './../../util/init-form-group-util';
import { Product } from './../product';
import { ISubscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  public productForm: FormGroup;

  public product: Product;

  private photo: File;

  private subs: ISubscription[] = [];

  public msgs: Message[] = [];

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const productId = +params["id"];
      if (typeof productId !== 'undefined' && productId !== null) {
        this.subs.push(
          this.productService.view(productId).subscribe(product => {
            console.log(product);
            this.product = product;
            this.productForm = InitFormGroupUtil.getFormGroupProduct(this.product, this.formBuilder);
          }, error => {
            console.log(error);
          })
        );
      }
    });
  }

  public update(): void {
    this.msgs = [];
    this.subs.push(
      this.productService.update(this.product).subscribe(() => {
        this.msgs.push({severity: 'success', summary: MSG_SUCCESS, detail: MSG_PRODUCT_UPDATED});
        if (this.photo) {
          this.productService.uploadPhoto(this.product.id, this.photo).subscribe(() => {

          }, error => {
            this.msgs.push({severity: 'error', summary: MSG_ERROR, detail: error.json().message});
          });
        }
      }, error => {
        console.log(error);
        this.msgs.push({severity: 'error', summary: MSG_ERROR, detail: error.json().message});
      })
    );
  }

  public onNotify(event: any): void {
    switch (event.msg) {
      case MSG_CP_PHOTO_CHANGED:
        this.photo = event.photo;
    }
  }

}
