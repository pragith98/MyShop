import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./public/products/products.module')
      .then(module => module.ProductsModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./public/auth/auth.module')
      .then(module => module.AuthModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./protected/users/users.module')
      .then(module => module.UsersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'carts',
    loadChildren: () => import('./protected/carts/carts.module')
      .then(module => module.CartsModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
