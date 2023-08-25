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
  products: Product[],
  isLoaded: boolean
}

@Persistence([{
  path: 'productsList',
  existingEngine: localStorage
}])
@StateRepository()
@State<ProductStateModel>({
  name: 'productsList',
  defaults: {
    products: [],
    isLoaded: false
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
   * get product loading status.
   */
  @Computed()
  get isLoaded(): boolean {
    return this.ctx.getState().isLoaded;
  }

  /**
   * Retrieves products from current state.
   */
  @Computed()
  get products(): Product[] {
    this.getAllProducts();
    return this.ctx.getState().products;
  }

  /**
   * Fetch products.
   * @returns {Observable<Product>}
   */
  @DataAction()
  fetchProducts(category?: string): Observable<Product[]> {
    this.resetProductState();

    const products = category ?
      this.apiService.getProductsByCategory(category) :
      this.apiService.getProducts();
    
    return products.pipe(tap(products => this.ctx.setState({
      products: products,
      isLoaded: true
    })));
  }

  private resetProductState(): void {
    this.reset();
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
  private getAllProducts(): void {
    if (!this.haveFetched())
      this.fetchProducts();
  }
}