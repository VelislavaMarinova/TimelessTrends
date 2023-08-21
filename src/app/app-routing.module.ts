import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products/products-list/products-list.component';

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
    path: 'auth',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
