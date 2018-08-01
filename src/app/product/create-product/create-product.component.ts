import {
  MSG_CATEGORY_CREATED,
  MSG_COMPONENT_CATEGORY_CREATED,
  MSG_COMPONENT_ERROR,
  MSG_ERROR,
  MSG_PRODUCT_CREATED
} from './../../util/constants-messages';
import {MSG_CP_PHOTO_CHANGED} from './../../util/msg-components';
import {Component, OnInit} from '@angular/core';
import {Product} from '../product';
import {ProductService} from '../product.service';
import {MessageService} from 'primeng/components/common/messageservice';
import {MSG_SUCCESS} from '../../util/constants-messages';
import {Router} from '@angular/router';
import {FormGroup} from "@angular/forms";
import {InitFormGroupService} from "../../util/init-form-group.service";
import {HandlerErrorMessage} from "../../util/handler-error-message";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  public product: Product;

  private photo: File;

  public productForm: FormGroup;

  public errorHandler: HandlerErrorMessage = new HandlerErrorMessage();

  constructor(private service: ProductService,
    private initFormGroupService: InitFormGroupService,
    private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.product = new Product();
    this.productForm = this.initFormGroupService.getFormGroupProduct(this.product);
  }

  public save(): void {
    this.service.save(this.product).subscribe(result => {
      this.messageService.add({severity: 'success', summary: MSG_SUCCESS, detail: MSG_PRODUCT_CREATED});
      this.productForm.reset();
      if (this.photo !== null && this.photo !== undefined) {
        this.service.uploadPhoto(result.id, this.photo).subscribe(() => {
        }, error => {
          this.messageService.add({severity: 'error',
            summary: MSG_ERROR, detail: this.errorHandler.getErrorMessage(error)});
          this.service.delete(result.id).subscribe(() => {

          }, errorDelete => {
            this.messageService.add({severity: 'error', summary: MSG_ERROR,
              detail: this.errorHandler.getErrorMessage(errorDelete)});
          });
        });
      } else {
        this.goToProductDetails(result.id);
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: MSG_ERROR, detail: this.errorHandler.getErrorMessage(error)});
    });
  }

  public onNotify(event: any): void {
    switch (event.msg) {
      case MSG_CP_PHOTO_CHANGED:
        this.photo = event.photo;
        break;
      case MSG_COMPONENT_CATEGORY_CREATED:
        // this.msgs.push({severity: 'success', summary: MSG_SUCCESS, detail: MSG_CATEGORY_CREATED});
        this.messageService.add({severity: 'success', summary: MSG_SUCCESS, detail: MSG_CATEGORY_CREATED});
        break;
      case MSG_COMPONENT_ERROR:
        this.messageService.add({severity: 'error', summary: MSG_ERROR,
          detail: this.errorHandler.getErrorMessage(event.error)});
        break;
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
