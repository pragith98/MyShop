import { NgModule } from '@angular/core';
import { CartsComponent } from './carts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartsRoutingModule } from './carts-routing.module';
import { CartsService } from './carts.service';

//angular material modules
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    CartsComponent,
  ],
  imports: [
    SharedModule,
    CartsRoutingModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [CartsService]
})
export class CartsModule { }
