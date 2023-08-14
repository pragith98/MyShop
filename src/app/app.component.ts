import { Component } from '@angular/core';
import { AuthState, ProductState, UserState } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MyShop';

  constructor(
    private productState: ProductState,
  ) { 
    this.productState.getAllProducts();
  }
}
