import {MSG_ERROR, MSG_PRODUCT_UPDATED, MSG_SUCCESS} from './../../util/constants-messages';
import {MSG_CP_PHOTO_CHANGED} from './../../util/msg-components';
import {Product} from './../product';
import {ISubscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {AfterViewInit, ChangeDetectorRef, Component, Injector, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../product.service';
import {MessageService} from 'primeng/components/common/api';
import {FormGroup} from "@angular/forms";
import {InitFormGroupService} from "../../util/init-form-group.service";
import {HandlerErrorMessage} from "../../util/handler-error-message";
import {MSG_COMPONENT_ERROR} from "../../util/constants-messages";
import * as $ from "jquery";
import {URL_API} from "../../util/url-api";
import {NotificationsService} from "../../util/notifications/notifications.service";
import {ProductImgUrl} from "../product-img-url.model";
import {ProductFieldsComponent} from "../product-fields/product-fields.component";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, AfterViewInit {

  public product: Product;

  public productForm: FormGroup;

  private photo: File;

  private subs: ISubscription[] = [];

  private errorHandler: HandlerErrorMessage = new HandlerErrorMessage(this.notificationsService, this.injector);

  public loading: boolean = false;

  @ViewChild(ProductFieldsComponent)
  public productFields: ProductFieldsComponent;

  public listProductImgDeleted: Array<number> = [];

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,
    private router: Router, private initFormGroupService: InitFormGroupService,
              private messageService: MessageService,
              private injector: Injector,
              private notificationsService: NotificationsService,
              private changeRef: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.changeRef.detectChanges();
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      const productId = +params["id"];
      if (typeof productId !== 'undefined' && productId !== null) {
        this.startLoading();
        this.subs.push(
          this.productService.view(productId).subscribe(product => {
            this.product = product;
            this.product.listProdImgUrls.forEach(imgUrl => {
              imgUrl.fullUrl = URL_API + "images/image-resource/" + imgUrl.url + "/small";
            });
            this.productForm = this.initFormGroupService.getFormGroupProduct(this.product);
            this.stopLoading();
          }, error => {
            this.messageService.add({severity: 'error', summary: MSG_ERROR,
              detail: this.errorHandler.getErrorMessage(error)});
            this.stopLoading();
          })
        );
      }
    });
  }

  public update(): void {
    if (!this.isValidate())
      return;
    this.startLoading();
    let gallery: any[] = [];
    if (this.product.gallery) {
      gallery = this.product.gallery;
      this.product.gallery = undefined;
    }
    this.subs.push(
      this.productService.update(this.product).subscribe(() => {
        /*if (gallery && gallery.length > 0) {
          this.productService.uploadGallery(this.product.id, gallery).subscribe(() => {
          });
        }*/
        if (this.photo) {
          this.productService.uploadPhoto(this.product.id, this.photo).subscribe(() => {
            this.stopLoading();
            this.messageService.add({severity: 'success', summary: MSG_SUCCESS, detail: MSG_PRODUCT_UPDATED});
            setTimeout(() => {
              this.goToProductDetails(this.product.id);
            }, 2000);
          }, error => {
            this.messageService.add({severity: 'error', summary: MSG_ERROR,
              detail: this.errorHandler.getErrorMessage(error)});
            this.stopLoading();
          });
        } else {
          this.stopLoading();
          this.messageService.add({severity: 'success', summary: MSG_SUCCESS, detail: MSG_PRODUCT_UPDATED});
          setTimeout(() => {
            this.goToProductDetails(this.product.id);
          }, 2000);
        }
        if (this.listProductImgDeleted.length > 0) {
          this.productService.updateGallery(this.product.id, gallery, this.listProductImgDeleted).subscribe(() => {

          });
        }
      }, error => {
        this.messageService.add({severity: 'error', summary: MSG_ERROR,
          detail: this.errorHandler.getErrorMessage(error)});
        this.stopLoading();
      })
    );
  }

  private isValidate(): boolean {
    console.log("componente galeria: " + this.productFields.pFileUpload.files.length);
    
    if ((this.product.listProdImgUrls.length + this.productFields.pFileUpload.files.length) > 5) {
      this.messageService.add({severity: 'error', summary: MSG_ERROR,
        detail: "Só pode haver no máximo 5 fotos na galeria"});
      return false;
    }

    return true;
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
    this.router.navigate(['/products/details', productId]);
  }

  public cleanForm(): void {
    const id = this.product.id;
    this.productForm.reset();
    this.product = new Product();
    this.product.id = id;
    this.productFields.resetInputFile();
    this.productFields.resetGallery();
  }

  public cancelForm(): void {
    this.router.navigateByUrl("/products");
  }

  public startLoading(): void {
    $("#btnUpdateProduct").prop("disabled", "disabled");
    this.loading = true;
  }

  public stopLoading(): void {
    $("#btnUpdateProduct").prop("disabled", false);
    this.loading = false;
  }

  public removeProdImg(imgId: number): void {
    for (let i = 0; i < this.product.listProdImgUrls.length; i++) {
      const imgUrl = this.product.listProdImgUrls[i];
      if (imgId === imgUrl.id) {
        this.listProductImgDeleted.push(imgId);
        this.product.listProdImgUrls.splice(i, 1);
      }

    }
  }

}
