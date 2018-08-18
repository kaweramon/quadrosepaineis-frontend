import { URL_API } from './../util/url-api';
import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ProductFilter } from './product-filter';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Form} from "@angular/forms";

@Injectable()
export class ProductService {

  private productUrl: string = URL_API + 'products/';

  constructor(private http: HttpClient) { }

  public save(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productUrl, product);
  }

  public update(product: Product): Observable<any> {
    return this.http.put(`${this.productUrl}${product.id}`, product);
  }

  public resume(productFilter: ProductFilter): Observable<any> {
    const params: HttpParams = new HttpParams();
    params.set('size', productFilter.size.toString());
    params.set('page', productFilter.page.toString());
    console.log(productFilter);
    if (productFilter.name)
      params.set('name', productFilter.name);

    if (productFilter.price)
      params.set('price', productFilter.price.toString());

    if (productFilter.isActive)
      params.set('isActive', productFilter.isActive.toString());

    if (productFilter.categories && productFilter.categories.length > 0)
      params.set('categories', productFilter.categories.toString());

    return this.http.get(this.productUrl + "resume", {params: params});
  }

  public uploadPhoto(productId: number, photo: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('photo', photo);
    return this.http.put(`${this.productUrl}${productId}/upload`, formData);
  }

  public uploadGallery(productId: number, gallery: File[]): Observable<any> {
    const formData: FormData = new FormData();

    gallery.forEach(image => {
      formData.append("gallery", image);
    });

    return this.http.put(`${this.productUrl}${productId}/upload-gallery`, formData);
  }

  public view(productId: any): Observable<Product> {
    return this.http.get<Product>(this.productUrl + productId);
  }

  public updateIsActiveProperty(productId: number, isActive: boolean): Observable<any> {
    return this.http.put(this.productUrl + productId + "/is-active", isActive);
  }

  public delete(productId: number): Observable<any> {
    return this.http.delete(this.productUrl + productId);
  }

}
