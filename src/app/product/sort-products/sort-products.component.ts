import { Component, OnInit } from '@angular/core';
import {Product} from "../product";
import {ProductService} from "../product.service";
import {ProductFilter} from "../product-filter";
import {DragulaService} from "ng2-dragula";
import {DomSanitizer} from "@angular/platform-browser";
import {MessageService} from 'primeng/components/common/messageservice';
import {MSG_PRODUCT_SEQUENCE_UPDATED, MSG_SUCCESS} from "../../util/constants-messages";

@Component({
  selector: 'app-sort-products',
  templateUrl: './sort-products.component.html',
  styleUrls: ['./sort-products.component.css']
})
export class SortProductsComponent implements OnInit {

  public products: Product[] = [];

  public filter: ProductFilter = new ProductFilter();

  constructor(private productService: ProductService,
              private dragulaService: DragulaService,
              private sanitizer: DomSanitizer,
              private messageService: MessageService) {
    this.dragulaService.dropModel("PRODUCT")
      .subscribe(({ el, target, source, sourceModel, targetModel, item }) => {
        console.log('dropModel:');
        console.log(el);
        console.log(source);
        console.log(target);
        console.log(sourceModel);
        console.log(targetModel);
        let sequence: number = 1;
        targetModel.forEach(product => {
          product.sequence = sequence;
          sequence++;
        });
        console.log(item);
      });
    this.dragulaService.removeModel("PRODUCT")
      .subscribe(({ el, source, item, sourceModel }) => {
        console.log('removeModel:');
        console.log(el);
        console.log(source);
        console.log(sourceModel);
        console.log(item);
      });
  }

  ngOnInit() {
    this.productService.resume(this.filter).subscribe(products => {
      this.products = products.content;
    });
  }

  public loadSanitizeImgUrl(): void {
    this.products.forEach(product => {
      if (product.photo) {
        product.sanitizeImgUrl =
          this.sanitizer.bypassSecurityTrustResourceUrl("data:image/jpeg;base64," + product.photo);
      }
    });
  }

  public save(): void {
    console.log(this.products);
    this.productService.updateSequence(this.products).subscribe(() => {
      this.messageService.add({severity: 'success', summary: MSG_SUCCESS,
        detail: MSG_PRODUCT_SEQUENCE_UPDATED});
    });
  }

}
