import { NgModule } from '@angular/core';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductsService } from './products.service';

//angular material modules
import { TextShorterPipe } from './text-shorter.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsComponent } from './products.component';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent,
    ProductDetailComponent,
    TextShorterPipe
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule,
  ],
  providers: [ProductsService]
})
export class ProductsModule { }