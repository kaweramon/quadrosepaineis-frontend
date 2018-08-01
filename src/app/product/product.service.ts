import { URL_API } from './../util/url-api';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Product } from './product';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ProductFilter } from './product-filter';

@Injectable()
export class ProductService {

  private productUrl: string = URL_API + 'products/';

  private headers: Headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private http: Http) { }

  public save(product: Product): Observable<Product> {
    return this.http.post(this.productUrl, product).map(this.extractData);
  }

  public update(product: Product): Observable<any> {
    return this.http.put(this.productUrl + product.id, product).map(this.extractData);
  }

  public resume(productFilter: ProductFilter): Observable<any> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('size', productFilter.size.toString());
    params.set('page', productFilter.page.toString());

    if (productFilter.name)
      params.set('name', productFilter.name);

    if (productFilter.price)
      params.set('price', productFilter.price.toString());

    if (productFilter.isActive)
      params.set('isActive', productFilter.isActive.toString());

    return this.http.get(this.productUrl + "resume", {search: params}).map(this.extractData);
  }

  public uploadPhoto(productId: number, photo: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('photo', photo);
    return this.http.put(this.productUrl + productId + '/upload', formData);
  }

  public view(productId: any): Observable<Product> {
    return this.http.get(this.productUrl + productId).map(this.extractData);
  }

  public updateIsActiveProperty(productId: number, isActive: boolean): Observable<any> {
    return this.http.put(this.productUrl + productId + "/is-active", isActive,
      {headers: this.headers});
  }

  public delete(productId: number): Observable<any> {
    return this.http.delete(this.productUrl + productId);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body;
  }

}
