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
import { 
  AuthState, 
  CartState, 
  UserState 
} from 'src/app/store';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';


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
    private cartState: CartState,
    private router: Router,
    private userState: UserState,
    public authState: AuthState,
    private confirmationService: ConfirmationService
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
    
    //set total
    if(this.product)
      this.total = this.quantity*this.product?.price;
  }

  onClickAddToCart(): void {
    if(this.product) {
      const product: any = {
        userId: this.userState.getAvailableUser.id,
        products: [{
          id: this.product?.id,
          quantity: this.quantity
        }]
      };
      this.confirmationService.getConfirmation(this.product.title, 'addToCart')
        .subscribe(response => {
          if(response)
            this.cartState.addCartItem(product);
        });
    }
  }

}
