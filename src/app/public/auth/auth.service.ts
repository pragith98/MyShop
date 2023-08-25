import { Injectable } from '@angular/core';
import { 
  AuthState, 
  CartState, 
  UserState
} from 'src/app/store';
import { 
  Auth, 
  LoginCredentials,
  User
} from 'src/app/public/types';
import { 
  of,
  tap,
  switchMap,
  Observable
} from 'rxjs'
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { UserApiService } from '../apis/user-api.service';

@Injectable()
export class AuthService {

  constructor(
    private authState: AuthState,
    private userState: UserState,
    private cartState: CartState,
    private confirmation: ConfirmationService,
    private userApiService: UserApiService
  ) { }

  login(loginCredentials: LoginCredentials): Observable<Auth> {
    return this.authState.login(loginCredentials)
      .pipe(tap(data => {
        this.userState.getUser(data.id);
        this.cartState.fetchCart(data.id);
      }));
  }

  createUser(formData: User): Observable<User | null> {
    return this.confirmation.getConfirmation(formData.firstName,'create')
      .pipe(switchMap(response => {
        return response? 
          this.userApiService.createUser(formData) :
          of (null);
      }));
    }
  }
