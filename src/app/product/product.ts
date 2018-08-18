import {Category} from "../category/category";

export class Product {
  public id: number;
  public name: string;
  public price: number;
  public description: string;
  public registerDate: any;
  public registerDateStr: string;
  public width: number;
  public height: number;
  public diameter: number;
  public weight: number;
  public isActive: boolean;
  public photo: File;
  public gallery: any[];
  public categories: Category[];
  public sanitizeImgUrl: any;
  public galleryPaths: string[];

  constructor() {
    this.isActive = true;
    this.gallery = [];
  }

}
