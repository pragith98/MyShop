import { Injectable } from '@angular/core';
import { ApiProviderService } from 'src/app/core/services/apiProvider.service';
import { 
  Cart,
  ProductToCart
} from 'src/app/public/types';
import { EndPoints } from 'src/app/core/env';
import { 
  Observable,
  map
} from 'rxjs';

interface ApiResponse {
  carts: Cart[],
  total: number,
  skip: number,
  limit: number
}

@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  constructor(private apiProvider: ApiProviderService) { }

  /**
   * Retrieves cart data by calling API.
   * @returns {Observable<Cart>}
   */
  getCartByUserId(userId: number): Observable<Cart> {
    return this.apiProvider.get<ApiResponse>(
      `${EndPoints.getCartByUserID}/${userId}`
    )
      .pipe(map(response => response.carts[0]));
  }

  /**
 * Add item to cart by calling API with provided data and retrieve cart 
 * @param body 
 * @returns {Observable<Cart>}
 */
  addCart(body: ProductToCart): Observable<Cart> {
    return this.apiProvider.post<any>(
      EndPoints.addCart,
      body
    );
  }

/**
 * Update item to cart by calling API with provided data and retrieve cart.
 * This doesn't work. Only call it to get a response.
 * @param body 
 * @returns {Observable<Cart>}
 */
  updateCart(body: any): Observable<Cart> {
    return this.apiProvider.update<any>(
      EndPoints.updateCart,
      body
    );
  }
}