import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../product/product";
import {Category} from "../category/category";

@Injectable()
export class InitFormGroupService {

  constructor(private formBuilder: FormBuilder) { }

  public getFormGroupProduct(product: Product): FormGroup {
    return this.formBuilder.group({
      'name': [product.name, [Validators.required, Validators.minLength(5),
        Validators.maxLength(50)]],
      'photo': [product.photo],
      'price': [product.price, [Validators.required]],
      'width': [product.width],
      'height': [product.height],
      'diameter': [product.diameter],
      'weight': [product.weight],
      'description': [product.description],
      'categories': [product.categories]
    });
  }

  public getFormGroupCategory(category: Category): FormGroup {
    return this.formBuilder.group({
      'name': [category.name, [Validators.required, Validators.minLength(3),
        Validators.maxLength(20)]]
    });
  }

}
