import { MSG_PRODUCT_DELETED, MSG_SUCCESS } from './../../util/constants-messages';
import { ModalDeleteProductComponent } from './../modal-delete-product/modal-delete-product.component';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product';
import { ISubscription } from 'rxjs/Subscription';
import { ConfirmationService, Message } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { MSG_COMPONENT_PRODUCT_CONFIRM_DELETE } from '../../util/constants-messages';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  public products: Product[] = [];

  public productSelected: Product;

  public displayDialog = false;

  public displayModalDeleteProduct = false;

  public modalDeleteProductComponent: ModalDeleteProductComponent;

  public msgs: Message[] = [];

  public msgNoRecords = "Nenhum registro encontrado";

  constructor(private router: Router, private service: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  subs: ISubscription[] = [];

  public totalRecords: number = 0;

  ngOnInit() {
    this.modalDeleteProductComponent = new ModalDeleteProductComponent(
      this.service, this.confirmationService);
    this.search("?isActive=true");
  }

  ngOnDestroy(): void {
    // TODO: fazer método global
    if (this.subs) {
      this.subs.forEach(sub => {
        sub.unsubscribe();
      });
    }
  }

  public search(query: string): void {
    this.subs.push(
      this.service.list(query).subscribe(result => {
        console.log(result);
        this.totalRecords = result.totalElements;
        this.products = result.content;
      }, error => {
        console.log(error);
      })
    );
  }

  public goToNewProduct(): void {
    this.router.navigate(['/products/add']);
  }

  public goToEditProduct(productId: number): void {
    this.router.navigate(['/products/edit', {id: productId}]);
  }

  public goToProductDetails(productId: number): void {
    this.router.navigate(['/products/details', {id: productId}]);
  }

  public showDialogProductImg(product: Product): void {
    this.productSelected = product;
    this.displayDialog = true;
  }

  public showModalDeleteProduct(product: Product): void {
    this.productSelected = product;
    this.modalDeleteProductComponent.showModal(product);
  }

  public onNotify(event: any): void {
    console.log(event);
    switch (event.msg) {
      case MSG_COMPONENT_PRODUCT_CONFIRM_DELETE:
        this.msgs.push({severity: 'success', summary: MSG_SUCCESS, detail: MSG_PRODUCT_DELETED});
        break;
    }
  }

  public loadData(event: any) {
    const currentPage = event.first.toString().substr(0, event.first.toString().length - 1);
    const query: string = currentPage ? "?size=10&page=" + currentPage + "&isActive=true" :
    "?size=10&page=0&isActive=true";
    this.search(query);
  }

}
