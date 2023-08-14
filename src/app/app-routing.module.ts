import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';

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
  },
  {
    path: 'users',
    component: UsersPageComponent,
    loadChildren: () => import('./protected/users/users.module')
      .then(module => module.UsersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
