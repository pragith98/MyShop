import { Injectable } from '@angular/core';
import { ApiProviderService } from '../core/apiProvider.service';
import { Product } from 'src/app/types';
import { EndPoints } from 'src/app/core/env';
import { 
  map,
  Observable
} from 'rxjs';

interface ApiResponse {
  products: any[],
  total: number,
  skip: number,
  limit: number
}

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {

  constructor(private apiProvider: ApiProviderService) { }

  /**
   * Retrieves product data by calling API.
   * @returns {Observable<Post[]>}
   */
  getProducts(): Observable<Product[]> {
    return this.apiProvider.get<ApiResponse>(EndPoints.getAllProducts)
      .pipe(map(response => response.products));
  }

}