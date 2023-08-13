import { 
  Component,
  OnInit
 } from '@angular/core';
import { ProductState } from 'src/app/store';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  
  constructor(public productState: ProductState) { }

  ngOnInit(): void {
    this.productState.getAllProducts();
  }
}
