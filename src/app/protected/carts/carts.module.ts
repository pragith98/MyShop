import { NgModule } from '@angular/core';
import { CartsComponent } from './carts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartsRoutingModule } from './carts-routing.module';



@NgModule({
  declarations: [
    CartsComponent
  ],
  imports: [
    SharedModule,
    CartsRoutingModule
  ]
})
export class CartsModule { }
