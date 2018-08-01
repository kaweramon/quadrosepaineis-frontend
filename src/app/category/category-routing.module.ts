import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateCategoryComponent} from "./create-category/create-category.component";
import {CategoryListComponent} from "./category-list/category-list.component";

const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent
  },
  {
    path: 'add',
    component: CreateCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
