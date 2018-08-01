import { Product } from '../product/product';
import { FormBuilder, Validators } from '@angular/forms';

export class InitFormGroupUtil {

  public static getFormGroupProduct(product: Product, formBuilder: FormBuilder): any {
    return formBuilder.group({
      'name': [product.name, [Validators.required, Validators.minLength(5),
        Validators.maxLength(50)]],
      'price': [product.price, [Validators.required]],
      'width': [product.width],
      'height': [product.height],
      'diameter': [product.diameter],
      'weight': [product.weight],
      'description': [product.description],
      'categories': [product.categories]
    });
  }

}
