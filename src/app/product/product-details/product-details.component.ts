import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { ModalDeleteProductComponent } from '../modal-delete-product/modal-delete-product.component';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public product: Product;

  private subs: ISubscription[] = [];

  public modalDeleteProductComponent: ModalDeleteProductComponent;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit() {
    this.modalDeleteProductComponent = new ModalDeleteProductComponent(
      this.productService, this.confirmationService);
    this.activatedRoute.params.subscribe(params => {
      const productId = +params["id"];
      if (typeof productId !== 'undefined' && productId !== null) {
        this.subs.push(
          this.productService.view(productId).subscribe(product => {
            console.log(product);
            this.product = product;
          }, error => {
            console.log(error);
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
    this.router.navigate(['/products/edit', {id: this.product.id}]);
  }

}
