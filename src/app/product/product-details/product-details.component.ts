import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { ModalDeleteProductComponent } from '../modal-delete-product/modal-delete-product.component';
import {ConfirmationService, MessageService} from 'primeng/api';
import {MSG_COMPONENT_PRODUCT_CONFIRM_DELETE, MSG_ERROR, MSG_PRODUCT_DELETED, MSG_SUCCESS} from "../../util/constants-messages";
import {HandlerErrorMessage} from "../../util/handler-error-message";
import {URL_API} from "../../util/url-api";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public product: Product;

  private subs: ISubscription[] = [];

  public displayDialogDeleteProduct: boolean = false;

  // private errorHandler: HandlerErrorMessage = new HandlerErrorMessage();

  public images: any[] = [];

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const productId = +params["id"];
      if (typeof productId !== 'undefined' && productId !== null) {
        this.subs.push(
          this.productService.view(productId).subscribe(product => {
            console.log(product);
            this.product = product;
            this.product.sanitizeImgUrl = URL_API + "images/image-resource/" + product.id + "/main/main";
            console.log(product.listProdImgUrls);
            if (product.listProdImgUrls) {
              for (let i = 0; i < product.listProdImgUrls.length; i++) {
                this.images.push({source: URL_API + "images/image-resource/" + product.listProdImgUrls[i].url + "/gallery"});
              }
            }
          })
        );
      }
    });
  }

  public showModalDeleteProduct(): void {
    this.displayDialogDeleteProduct = true;
  }

  public onNotify(event: any): void {
    console.log(event);
  }

  public goToEditProduct(): void {
    this.router.navigate(['/products/edit', this.product.id]);
  }

  public removeProduct(): void {
    this.productService.delete(this.product.id).subscribe(() => {
      this.messageService.add({severity: 'success', summary: MSG_SUCCESS, detail: MSG_PRODUCT_DELETED});
      setTimeout(() => {
        this.router.navigate(['/products']);
      }, 2000);
      this.displayDialogDeleteProduct = false;
    });
  }

}
