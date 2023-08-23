import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { AddReviewComponent } from './products/add-review/add-review.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/products/sunglasses',
  },
  {
    path: 'products/:category',
    component: ProductsListComponent,
  },
  {
    path: 'products/:category/:productId',
    component: ProductDetailsComponent,
  },
  {
    path: 'products/:category/:productId/add-review',
    component: AddReviewComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
