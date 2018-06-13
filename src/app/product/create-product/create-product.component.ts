import { MSG_PRODUCT_CREATED, MSG_ERROR } from './../../util/constants-messages';
import { MSG_CP_PHOTO_CHANGED } from './../../util/msg-components';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InitFormGroupUtil } from '../../util/init-form-group-util';
import { ProductService } from '../product.service';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import { MSG_SUCCESS } from '../../util/constants-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  public product: Product;

  public productForm: FormGroup;

  private photo: File;

  public msgs: Message[] = [];

  constructor(private formBuilder: FormBuilder, private service: ProductService,
    private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.product = new Product();
    this.productForm = InitFormGroupUtil.getFormGroupProduct(this.product, this.formBuilder);
  }

  public save(): void {
    this.msgs = [];
    this.service.save(this.product).subscribe(result => {
      this.msgs.push({severity: 'success', summary: MSG_SUCCESS, detail: MSG_PRODUCT_CREATED});
      if (this.photo !== null && this.photo !== undefined) {
        this.service.uploadPhoto(result.id, this.photo).subscribe(() => {
          this.goToProductDetails(result.id);
        }, error => {
          console.log(error);
          this.msgs.push({severity: 'error', summary: MSG_ERROR, detail: error.json().message});
          this.service.delete(result.id).subscribe(() => {

          }, errorDelete => {
            console.log(errorDelete);
            this.msgs.push({severity: 'error', summary: MSG_ERROR, detail: errorDelete.json().message});
          });
        });
      } else {
        this.goToProductDetails(result.id);
      }
    }, error => {
      console.log(error);
      this.msgs.push({severity: 'error', summary: MSG_ERROR, detail: error.json().message});
    });
  }

  public onNotify(event: any): void {
    switch (event.msg) {
      case MSG_CP_PHOTO_CHANGED:
        this.photo = event.photo;
    }
  }

  public clearProdForm(): void {
    this.productForm.reset();
    this.product = new Product();
  }

  private goToProductDetails(productId: number): void {
    this.router.navigate(['/products/details', {id: productId}]);
  }

}
