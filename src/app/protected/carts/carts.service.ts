import { Injectable } from '@angular/core';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import {
  Observable,
  switchMap,
  of
} from 'rxjs';
import { CartState } from 'src/app/store';
import { Cart } from 'src/app/public/types';

@Injectable()
export class CartsService {

  constructor(
    private confirmation: ConfirmationService,
    private cartState: CartState
  ) { }

  removeCartItem(id: number): Observable<Cart | null> {
    return this.confirmation.getConfirmation(id, 'deleteFromCart')
      .pipe(switchMap(response => {
        return response? 
          this.cartState.removeCartItemById(id) :
          of (null);
      }));
  }
}