export class ProductFilter {
  public id: number;
  public name: string;
  public price: number;
  public page: number;
  public size: number;
  public categories: Array<string>;
  public isActive: boolean;

  constructor() {
    this.size = 10;
    this.categories = [];
    this.isActive = true;
  }
}
