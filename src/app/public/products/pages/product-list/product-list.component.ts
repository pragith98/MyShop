import { 
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/public/types';
import { 
  ProductState,
  CategoryState
} from 'src/app/store';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  
  products: Product[] = [];
  selectedCategory: string = '';

  minPrice = 0;
  maxPrice = 5000;

  constructor(
    public categoryState: CategoryState,
    public productState: ProductState,
    private router: Router,
    private service: ProductsService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(): void {
    this.products = this.productState.products;
  }

  onClickProduct(id: number): void {
    this.router.navigate(['products',id]);
  }

  filterByCategory(category: string): void {
    this.service.filterByCategory(category)
      .subscribe(() => this.getProducts());
  }

  filterByName(event: Event): void {
    const name = (event.target as HTMLInputElement).value;
    this.products = this.service.filterByName(name);
  }

  filterByPrice(): void {
    this.products = this.service.filterByPrice(
      this.minPrice,
      this.maxPrice
    );
  }

  onClickResetFilters(): void {
    this.productState.fetchProducts()
      .subscribe(() => this.getProducts());
    this.minPrice = 0;
    this.maxPrice = 5000;
    this.selectedCategory = '';
  }
}
