import { 
  Component,
  OnInit
 } from '@angular/core';
import { Router } from '@angular/router';
import { ProductState } from 'src/app/store';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  
  constructor(
    public productState: ProductState,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productState.getAllProducts();
  }

  onClickProduct(id: number): void {
    this.router.navigate(['products',id]);
  }
}
