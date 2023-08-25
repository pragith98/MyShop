import { Injectable } from '@angular/core';
import { ProductState } from 'src/app/store';
import { Product } from 'src/app/public/types';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsService {

  constructor(private productState: ProductState) { }

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
  
}