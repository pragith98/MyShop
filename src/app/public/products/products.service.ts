import { Injectable } from '@angular/core';
import { ProductState } from 'src/app/store';
import { Product } from 'src/app/public/types';

@Injectable()
export class ProductsService {

    constructor(private productState: ProductState) { }

    /**
   * get selected product from state
   * @param id 
   * @returns Product
   */
    getSelectedProduct(id: number): Product {
        const product = this.productState.getProducts
            .filter((product:Product) => product.id === Number(id));
        return product[0];
    }
}