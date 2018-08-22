import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { ModalDeleteProductComponent } from '../modal-delete-product/modal-delete-product.component';
import {ConfirmationService, MessageService} from 'primeng/api';
import {MSG_ERROR} from "../../util/constants-messages";
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

  public modalDeleteProductComponent: ModalDeleteProductComponent;

  // private errorHandler: HandlerErrorMessage = new HandlerErrorMessage();

  public images: any[] = [];

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.modalDeleteProductComponent = new ModalDeleteProductComponent(
      this.productService, this.confirmationService);
    this.activatedRoute.params.subscribe(params => {
      const productId = +params["id"];
      if (typeof productId !== 'undefined' && productId !== null) {
        this.subs.push(
          this.productService.view(productId).subscribe(product => {
            this.product = product;
            if (product.galleryPaths) {
              for (let i = 1; i <= product.galleryPaths.length; i++) {
                this.images.push({source: `${URL_API}products/image-resource/${product.id}/${i}`});
              }
            }
          }, error => {
            /*this.messageService.add({severity: 'error', summary: MSG_ERROR,
              detail: this.errorHandler.getErrorMessage(error)});*/
          })
        );
      }
    });
  }

  public showModalDeleteProduct(): void {
    this.modalDeleteProductComponent.showModal(this.product);
  }

  public onNotify(event: any): void {
    console.log(event);
  }

  public goToEditProduct(): void {
    this.router.navigate(['/products/edit', this.product.id]);
  }

}
