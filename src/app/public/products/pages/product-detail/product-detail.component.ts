import { 
  Component,
  OnInit,
} from '@angular/core';
import { 
  ActivatedRoute, 
  Router 
} from '@angular/router';
import { ProductsService } from '../../products.service';
import { Product } from 'src/app/public/types';
import { AuthState } from 'src/app/store';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product?: Product;
  quantity: number = 1;
  total: number = 0;
  stock: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ProductsService,
    private router: Router,
    public authState: AuthState,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(params => {
        this.product = this.service.getSelectedProduct(params['id']);
        this.total = this.product.price;
        this.stock = this.product.stock;
      });
  }
  
  onClickBack(): void {
    this.router.navigate(['']);
  }
  
  setProductValues(value: number): void {
    this.quantity = value; //set quantity
    
    if(this.product)
      this.total = this.quantity*this.product?.price; //set total
  }

  onClickAddToCart(): void {
    if(this.product) {
      this.service.addToCart(
        this.product, 
        this.quantity
      );
    }
  }

}
