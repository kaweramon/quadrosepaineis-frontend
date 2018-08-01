export class ProductFilter {
  public id: number;
  public name: string;
  public price: number;
  public page: number;
  public size: number;
  public isActive: boolean;

  constructor() {
    this.size = 10;
    this.isActive = true;
  }
}
