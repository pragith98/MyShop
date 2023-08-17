import { Injectable } from '@angular/core';
import { Product } from 'src/app/public/types';
import { State } from '@ngxs/store';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { 
  Persistence,
  StateRepository,
  Computed,
  DataAction
} from '@angular-ru/ngxs/decorators'
import { ProductsApiService } from '../public/apis/products-api.service';
import { 
  tap,
  Observable 
} from 'rxjs';


interface ProductStateModel {
  products: Product[]
}

@Persistence([{
  path: 'productsList',
  existingEngine: localStorage
}])
@StateRepository()
@State<ProductStateModel>({
  name: 'productsList',
  defaults: {
    products: []
  }
})

@Injectable({
  providedIn: "root"
})
export class ProductState extends NgxsDataRepository<ProductStateModel>{

  constructor(private apiService: ProductsApiService) { 
    super();
  }

  /**
   * Retrieves products from current state.
   */
  @Computed()
  get getProducts(): Product[] {
    return this.ctx.getState().products;
  }

  /**
   * Fetch products.
   * @returns {Observable<Product>}
   */
  @DataAction()
  fetchProducts(): Observable<Product[]> {
    return this.apiService.getProducts()
      .pipe(tap(products => this.ctx.setState({
        products: products
      })));
  }

  /**
   * Check if products are fetched by verifing the number of products 
   * available in the state.
   * @returns {boolean}
   */
  private haveFetched(): boolean {
    return this.ctx.getState().products.length > 0;
  }

  /**
   * Retrieve products data from local storage and set that data to products 
   * state if data already has been fetched to local storage. 
   * If already not fetched, perform function to fetch products data.
   */
  @DataAction()
  getAllProducts(): void {
    if (!this.haveFetched())
      this.fetchProducts();
  }
}