import {MSG_ERROR, MSG_PRODUCT_UPDATED, MSG_SUCCESS} from './../../util/constants-messages';
import {MSG_CP_PHOTO_CHANGED} from './../../util/msg-components';
import {Product} from './../product';
import {ISubscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {MessageService} from 'primeng/components/common/api';
import {FormGroup} from "@angular/forms";
import {InitFormGroupService} from "../../util/init-form-group.service";
import {HandlerErrorMessage} from "../../util/handler-error-message";
import {MSG_COMPONENT_ERROR} from "../../util/constants-messages";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  public product: Product;

  public productForm: FormGroup;

  private photo: File;

  private subs: ISubscription[] = [];

  private errorHandler: HandlerErrorMessage = new HandlerErrorMessage();

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,
    private router: Router, private initFormGroupService: InitFormGroupService,
              private messageService: MessageService) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      const productId = +params["id"];
      if (typeof productId !== 'undefined' && productId !== null) {
        this.subs.push(
          this.productService.view(productId).subscribe(product => {
            this.product = product;
            this.productForm = this.initFormGroupService.getFormGroupProduct(this.product);
          }, error => {
            this.messageService.add({severity: 'error', summary: MSG_ERROR,
              detail: this.errorHandler.getErrorMessage(error)});
          })
        );
      }
    });
  }

  public update(): void {
    this.subs.push(
      this.productService.update(this.product).subscribe(() => {
        if (this.photo) {
          this.productService.uploadPhoto(this.product.id, this.photo).subscribe(() => {
            this.messageService.add({severity: 'success', summary: MSG_SUCCESS, detail: MSG_PRODUCT_UPDATED});
            setTimeout(() => {
              this.goToProductDetails(this.product.id);
            }, 2000);
          }, error => {
            this.messageService.add({severity: 'error', summary: MSG_ERROR,
              detail: this.errorHandler.getErrorMessage(error)});
          });
        } else {
          this.messageService.add({severity: 'success', summary: MSG_SUCCESS, detail: MSG_PRODUCT_UPDATED});
          setTimeout(() => {
            this.goToProductDetails(this.product.id);
          }, 2000);
        }
      }, error => {
        this.messageService.add({severity: 'error', summary: MSG_ERROR,
          detail: this.errorHandler.getErrorMessage(error)});
      })
    );
  }

  public onNotify(event: any): void {
    switch (event.msg) {
      case MSG_CP_PHOTO_CHANGED:
        this.photo = event.photo;
        break;
      case MSG_COMPONENT_ERROR:
        this.messageService.add({severity: 'error', summary: MSG_ERROR,
          detail: this.errorHandler.getErrorMessage(event.error)});
        break;
    }
  }

  private goToProductDetails(productId: number): void {
    this.router.navigate(['/products/details', {id: productId}]);
  }

  public cleanForm(): void {
    const id = this.product.id;
    this.product = new Product();
    this.product.id = id;
  }

  public cancelForm(): void {
    this.router.navigateByUrl("/products");
  }

}
