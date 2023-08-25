import { 
  Component, 
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { ProductInCart } from 'src/app/public/types';
import { CartState } from 'src/app/store';

@Component({
  selector: 'app-carts',
  styleUrls: ['./carts.component.scss'],
  templateUrl: './carts.component.html',
})
export class CartsComponent { 

  dataSource = new MatTableDataSource<ProductInCart>(this.cartState.cartItems);

  tableColumns = [
    'title',
    'price',
    'quantity',
    'total',
    'actions'
  ];

  constructor(
    public cartState: CartState,
    private confirmation: ConfirmationService,
  ) { }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  itemFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onClickRemove(id: number): void {
    this.confirmation.getConfirmation(id, 'deleteFromCart')
      .subscribe(response => {
        if(response)
          this.cartState.removeCartItemById(id)
            .subscribe(() => this.dataSource.data = this.cartState.cartItems);
      });
  }

  setProductValues(
    product: ProductInCart, 
    value: number
  ): void {
    this.cartState.updateProductQuantityWithTotal(product.id, value)
      .subscribe(() => this.dataSource.data = this.cartState.cartItems);
  }

}
