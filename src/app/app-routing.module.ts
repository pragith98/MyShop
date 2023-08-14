import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageComponent } from './pages/products-page/products-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsPageComponent,
    loadChildren: () => import('./protected/products/products.module')
      .then(module => module.ProductsModule)
  },
  {
    path: 'auth/login',
    loadChildren: () => import('./protected/auth/auth.module')
      .then(module => module.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
