import { Injectable } from '@angular/core';
import {URL_API} from "../util/url-api";
import {HttpClient} from "@angular/common/http";
import {Category} from "./category";

@Injectable()
export class CategoryService {

  private urlCategory: string = URL_API  + "categories/";

  constructor(private httpClient: HttpClient) { }

  public list() {
    return this.httpClient.get<Category[]>(this.urlCategory);
  }

  public create(category: Category) {
    return this.httpClient.post<Category>(this.urlCategory, category);
  }

  public view(categoryId: number) {
    return this.httpClient.get<Category>(this.urlCategory + categoryId);
  }

  public update(category: Category) {
    return this.httpClient.put<Category>(this.urlCategory + category.id, category);
  }

  public remove(categoryId: number) {
    return this.httpClient.delete(this.urlCategory + categoryId);
  }
}
