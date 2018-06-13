export class ProductFilter {
  public id: number;
  public name: string;
  public description: string;
  public page: number;
  public size: number;
  public isActive: boolean;

  constructor() {
    this.size = 10;
  }
}
