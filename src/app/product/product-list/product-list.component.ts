import {ProductFilter} from './../product-filter';
import {MSG_ERROR, MSG_PRODUCT_DELETED, MSG_SUCCESS} from './../../util/constants-messages';
import {ModalDeleteProductComponent} from './../modal-delete-product/modal-delete-product.component';
import {ProductService} from './../product.service';
import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from '../product';
import {ISubscription} from 'rxjs/Subscription';
import {ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {DomSanitizer} from "@angular/platform-browser";
import {HandlerErrorMessage} from "../../util/handler-error-message";
import * as $ from "jquery";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy, AfterViewInit {

  public products: Product[] = [];

  public productSelected: Product;

  public displayDialog: boolean = false;

  public displayDialogDeleteProduct = false;

  public modalDeleteProductComponent: ModalDeleteProductComponent;

  public msgNoRecords = "Nenhum registro encontrado";

  public filter: ProductFilter = new ProductFilter();

  public errorHandler: HandlerErrorMessage = new HandlerErrorMessage();

  public loading: boolean = false;

  constructor(private router: Router, private service: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private changeRef: ChangeDetectorRef) { }

  subs: ISubscription[] = [];

  public totalRecords: number = 0;

  ngOnInit() {
    this.modalDeleteProductComponent = new ModalDeleteProductComponent(
      this.service, this.confirmationService);
  }

  ngOnDestroy(): void {
    // TODO: fazer método global
    if (this.subs) {
      this.subs.forEach(sub => {
        sub.unsubscribe();
      });
    }
  }

  public search(page: number = 0): void {
    this.filter.page = page;
    this.loading = true;
    $("#btnSearchProducts").prop("disabled", "disabled");
    $("input").prop("disabled", "disabled");
    this.subs.push(
      this.service.resume(this.filter).subscribe(result => {
        this.totalRecords = result.totalElements;
        this.products = result.content;
        this.loadSanitizeImgUrl();
        this.stopLoading();
      }, error => {
        this.stopLoading();
        this.messageService.add({severity: 'error', summary: MSG_ERROR,
          detail: this.errorHandler.getErrorMessage(error)});
      })
    );
  }

  private stopLoading(): void {
    this.loading = false;
    $("#btnSearchProducts").prop("disabled", false);
    $("input").prop("disabled", false);
  }

  public loadSanitizeImgUrl(): void {
    this.products.forEach(product => {
      if (product.photo) {
        product.sanitizeImgUrl =
          this.sanitizer.bypassSecurityTrustResourceUrl("data:image/jpeg;base64," + product.photo);
      }
    });
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
    this.productSelected.sanitizeImgUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl("data:image/jpeg;base64," + product.photo);
    this.displayDialog = true;
  }

  public showModalDeleteProduct(product: Product): void {
    this.productSelected = product;
    this.displayDialogDeleteProduct = true;
  }

  public loadData(event: LazyLoadEvent) {
    this.search(event.first / event.rows);
  }

  public removeProduct(): void {
    this.subs.push(
      this.service.delete(this.productSelected.id).subscribe(() => {
        this.messageService.add({severity: 'success', summary: MSG_SUCCESS, detail: MSG_PRODUCT_DELETED});
        this.search(this.filter.page);
        this.displayDialogDeleteProduct = false;
      }, error => {
        this.messageService.add({severity: 'error', summary: MSG_ERROR,
          detail: this.errorHandler.getErrorMessage(error)});
      })
    );
  }

  ngAfterViewInit(): void {
    this.changeRef.detectChanges();
  }

}
