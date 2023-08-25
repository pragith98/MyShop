import { Injectable } from '@angular/core';
import { 
  CartState, 
  ProductState, 
  UserState 
} from 'src/app/store';
import { 
  Product, 
  ProductToCart
} from 'src/app/public/types';
import { Observable } from 'rxjs';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';

@Injectable()
export class ProductsService {

  constructor(
    private productState: ProductState,
    private confirmation: ConfirmationService,
    private cartState: CartState,
    private userState: UserState
  ) { }

  /**
 * get selected product from state
 * @param id 
 * @returns Product
 */
  getSelectedProduct(id: number): Product {
    const product = this.productState.products
      .filter((product: Product) => product.id === Number(id));
    return product[0];
  }

  filterByCategory(category: string): Observable<Product[]> {
    return this.productState.fetchProducts(category);
  }

  filterByName(name: string): Product[] {
    return this.productState.products.filter(product => 
        product.title.trim().toLowerCase().includes(name));
  }

  filterByPrice(
    minPrice: number,
    maxPrice: number  
  ): Product[] {
    return this.productState.products
      .filter(product => 
        product.price >= minPrice && 
        product.price <= maxPrice
      );
  }

  addToCart(
    product: Product, 
    quantity: number
  ): void {
    const productWithUser: ProductToCart = {
      userId: this.userState.getAvailableUser.id,
      products: [{
        id: product.id,
        quantity: quantity
      }]
    };
    this.confirmation.getConfirmation(product.title, 'addToCart')
      .subscribe(response => {
        if(response)
          this.cartState.addCartItem(productWithUser);
      });
  }
  
}