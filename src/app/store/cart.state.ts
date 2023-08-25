import { Injectable } from '@angular/core';
import { 
  Cart, 
  ProductInCart, 
  ProductToCart
} from 'src/app/public/types';
import { State } from '@ngxs/store';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import {
  Persistence,
  StateRepository,
  Computed,
  DataAction,
  Payload
} from '@angular-ru/ngxs/decorators'
import {
  tap,
  Observable,
} from 'rxjs';
import { CartApiService } from '../public/apis/cart-api.service';

const defaultCart: Cart = {
  id: 0,
  products: [],
  discountedTotal: 0,
  total: 0,
  totalProducts: 0,
  totalQuantity: 0,
  userId: 0
}

interface CartStateModel {
  cart: Cart,
  isLoaded: boolean
}

@Persistence([{
  path: 'cartList',
  existingEngine: localStorage
}])
@StateRepository()
@State<CartStateModel>({
  name: 'cartList',
  defaults: {
    cart: defaultCart,
    isLoaded: false
  }
})

@Injectable({
  providedIn: "root"
})
export class CartState extends NgxsDataRepository<CartStateModel>{

  constructor(private apiService: CartApiService) {
    super();
  }

  /**
   * get cart loading status.
   */
  @Computed()
  get isLoaded(): boolean {
    return this.ctx.getState().isLoaded;
  }

  /**
   * Retrieves cart item count from current state.
   */
  @Computed()
  get cartItemsCount(): number {
    return this.ctx.getState().cart?.products.length;
  }

  @Computed()
  get cartItems(): ProductInCart[] {
    return this.ctx.getState().cart?.products;
  }

  @Computed()
  get cart(): Cart {
    return this.ctx.getState().cart;
  }

  @DataAction()
  fetchCart(userId: number): Observable<Cart> {
    return this.apiService.getCartByUserId(userId)
      .pipe(tap(cart => this.ctx.setState({
        cart: cart,
        isLoaded: true
      })));
  }

  /**
   * Concat current state cart product list and new cart products list.
   * @param newCart 
   * @param currentCart 
   * @returns 
   */
  private updateCartValues(cart: Cart): Cart {
    const cartData: Cart = {
      ...cart,
      total: 0,
      totalProducts: 0,
      totalQuantity: 0,
      discountedTotal: 0
    }
    cartData.totalProducts = cart.products.length;
    cartData.products.forEach(product => {
      cartData.total += product.total;
      cartData.totalQuantity += product.quantity;
      cartData.discountedTotal += product.discountedPrice;
    });
    return cartData;
  }

  /**
   * Performs update-cart by providing data. if creation is successful,
   * add cart to the state.
   * @param product
   * @returns {Observable<Cart>}
   */
  @DataAction()
  addCartItem(@Payload('product') product: ProductToCart): Observable<Cart> {
    return this.apiService.addCart(product)
      .pipe(tap(cart => {
        
        //concat current cartList data and new cartList data
        const currentCart = this.ctx.getState().cart;
        const updatedCart = {
          ...currentCart,
          products: [
            ...currentCart.products, 
            ...cart.products
          ]
        };
        this.ctx.setState({
          cart: this.updateCartValues(updatedCart),
          isLoaded: true
        });
      }));
  }

  @DataAction()
  removeCartItemById(id: number): Observable<Cart> {
    const currentCart = this.ctx.getState().cart;
    const updatedCart = {
      ...currentCart,
      products: currentCart.products.filter(product => product.id !== id)
    };
    return this.apiService.updateCart( //fake call
      {
        userId: 1,
        cartList: updatedCart
      }
    ).pipe(tap(() =>{
      this.ctx.setState({
        cart: this.updateCartValues(updatedCart),
        isLoaded: true
      });
    }));
  }

  /**
   * update product quantity and total
   * @param id 
   * @param quantity 
   * @returns 
   */
  @DataAction()
  updateProductQuantityWithTotal(
    id: number,
    quantity: number  
  ): Observable<Cart> {
    let currentCart = this.ctx.getState().cart;

    const updatedProducts = currentCart.products.map(product => 
      product.id === id ? { 
        ...product,
        quantity: quantity, 
        total: quantity*product.price  
      } : product
    );
    
    const updatedCart = {
      ...currentCart,
      products: updatedProducts
    };
    return this.apiService.updateCart( //fake call
      {
        userId: 1,
        cartList: updatedCart
      }
    ).pipe(tap(() =>{
      this.ctx.setState({
        cart: this.updateCartValues(updatedCart),
        isLoaded: true
      });
    }));
  }

  /**
   * remove cart items from state.
   */
  @DataAction()
  resetCart(): void {
    this.reset();
  }
}