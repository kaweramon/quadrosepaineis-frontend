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
import * as $ from "jquery";
import {Category} from "../../category/category";
import {CategoryService} from "../../category/category.service";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {HandlerErrorMessage} from "../../util/handler-error-message";
import {URL_API} from "../../util/url-api";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  animations: [
    trigger("productAppeared", [
      state("ready", style({opacity: 1})),
      transition("void => ready", [
        style({opacity: 0, transform: 'translate(-30px, -10px)'}),
        animate('1000ms 0s ease-in-out')
      ])
    ]),
    trigger("toogleSearch", [
      state("hidden", style({
        opacity: 0,
        "max-height": "0px"
      })),
      state("visible", style({
        opacity: 1,
        "max-height": "180px",
        "margin-bottom": "10px"
      })),
      transition("* => *", [
        animate('1000ms 0s ease-in-out')
      ])
    ]),
    trigger('row', [
      state('ready', style({opacity: 1})),
      transition('void => ready', animate('1000ms 0s ease-in', keyframes([
        style({opacity: 0, transform: 'translateX(-30px)', offset: 0}),
        style({opacity: 0.8, transform: 'translateX(10px)', offset: 0.8}),
        style({opacity: 1, transform: 'translateX(0px)', offset: 1})
      ]))),
      transition('ready => void', animate('1000ms 0s ease-out', keyframes([
        style({opacity: 1, transform: 'translateX(0px)', offset: 0}),
        style({opacity: 0.8, transform: 'translateX(25px)', offset: 0.2}),
        style({opacity: 0.6, transform: 'translateX(50px)', offset: 0.4}),
        style({opacity: 0.4, transform: 'translateX(70px)', offset: 0.6}),
        style({opacity: 0, transform: 'translateX(100px)', offset: 1})
      ])))
    ])
  ]
})
export class ProductListComponent implements OnInit, OnDestroy, AfterViewInit {

  public productState: string = "ready";

  public rowState = 'ready';

  public toogleProdSearch: string = "hidden";

  public products: Product[] = [];

  public productSelected: Product;

  public displayDialog: boolean = false;

  public displayDialogDeleteProduct = false;

  public modalDeleteProductComponent: ModalDeleteProductComponent;

  public msgNoRecords = "Nenhum registro encontrado";

  public filter: ProductFilter = new ProductFilter();

  public errorHandler: HandlerErrorMessage = new HandlerErrorMessage(null, null);

  public loading: boolean = false;

  public categories: Category[] = [];

  subs: ISubscription[] = [];

  public totalRecords: number = 0;

  public categoriesSelected: Array<Category> = [];

  constructor(private router: Router, private service: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private changeRef: ChangeDetectorRef,
    private categoryService: CategoryService) { }

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

  ngAfterViewInit(): void {
    this.changeRef.detectChanges();
  }

  public search(page: number = 0): void {
    this.filter.page = page;
    this.loading = true;
    $("#btnSearchProducts").prop("disabled", "disabled");
    $("input").prop("disabled", "disabled");
    this.subs.push(
      this.service.resume(this.filter).subscribe(result => {
        console.log(result);
        this.totalRecords = result.totalElements;
        this.products = result.content;
        this.loadSanitizeImgUrl();
        this.stopLoading();
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
      product.sanitizeImgUrl = URL_API + "images/image-resource/" + product.id + "/main/small";
      /*if (product.photo) {
        product.sanitizeImgUrl =
          this.sanitizer.bypassSecurityTrustResourceUrl("data:image/jpeg;base64," + product.photo);

      }*/
    });
  }

  public goToNewProduct(): void {
    this.router.navigate(['/products/add']);
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
        this.displayDialogDeleteProduct = false;
        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id === this.productSelected.id)
            this.products.splice(i, 1);
        }
        this.messageService.add({severity: 'success', summary: MSG_SUCCESS, detail: MSG_PRODUCT_DELETED});
      }, error => {
        this.displayDialogDeleteProduct = false;
        this.messageService.add({severity: 'error', summary: MSG_ERROR,
          detail: this.errorHandler.getErrorMessage(error)});
      })
    );
  }

  filterCategory(query, categories: any[]): any[] {
    const filtered: any[] = [];
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      if (category.name.toLowerCase().indexOf(query.toLowerCase()) !== - 1) {
        filtered.push(category);
      }
    }
    return filtered;
  }

  public filterCategoryMultiple(event) {
    const query = event.query;
    this.subs.push(
      this.categoryService.list().subscribe(result => {
        this.categories = this.filterCategory(query, result);
      }, error => {
        /*this.messageService.add({severity: 'error', summary: MSG_ERROR,
          detail: this.errorHandler.getErrorMessage(error)});*/
      })
    );
  }

  public onSelectAutoCompleteCategories(event): void {
    console.log(this.categoriesSelected);
    this.filter.categories.push(event.id);
    this.search(this.filter.page);
    /*this.filter.categories.push(event.id);
    */
  }

  public onUnselectAutoCompleteCategories(event): void {
    this.filter.categories.splice(this.filter.categories.indexOf(event.id), 1);
    this.search(this.filter.page);
  }

  public showCardProductFilters(): void {
    this.toogleProdSearch = this.toogleProdSearch === 'hidden' ? 'visible' : 'hidden';
  }

}
