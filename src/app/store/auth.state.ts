import { Injectable } from '@angular/core';
import { Auth } from 'src/app/types';
import { State } from '@ngxs/store';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { 
  tap, 
  Observable 
} from 'rxjs';
import { Location } from '@angular/common';
import { 
  Computed, 
  DataAction, 
  Payload, 
  Persistence, 
  StateRepository 
} from '@angular-ru/ngxs/decorators';
import { AuthenticationApiService } from 'src/app/api/auth-api.service';

import { LoginCredentials } from 'src/app/types';
import { Router } from '@angular/router';

interface AuthStateModel {
  auth: Auth;
}


@Persistence([{
  path: 'auth',
  existingEngine: localStorage
}])
@StateRepository()
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    auth: {
      id: 0,
      token: '',
      isAuthenticated: false
    }
  }
})

@Injectable()
export class AuthState extends NgxsDataRepository<AuthStateModel> {

  constructor(
    private apiService: AuthenticationApiService,
    private location: Location,
    private router: Router
  ) {
    super();
  }

  /**
   * Get current auth data from state.
   * @returns {Auth}
   */
  @Computed()
  get getAuth(): Auth {
    return this.ctx.getState().auth;
  }

  /**
   * Check if current user is authenticated by verifing the vale of 
   * 'isAuthenticated'
   * @returns {boolean}
   */
  @Computed()
  get isAuthenticated(): boolean{
    return this.ctx.getState().auth.isAuthenticated;
  }

  /**
   * Perform user login by using provided login credentials.
   * If login is successful, store auth data in the state.
   * @param credentials 
   */
  @DataAction()
  login(
    @Payload('credentials') credentials: LoginCredentials
  ): Observable<Auth> {
    return this.apiService.login(credentials)
      .pipe(tap(auth => {
        this.ctx.setState({
          auth: {
            ...auth, 
            isAuthenticated: true
          }
        });
        this.location.back();
      }));
  }

  /**
   * Remove authentication data and navigate to 'home' page 
   */
  @DataAction()
  logout(): void {
    this.reset();
    this.router.navigate(['']);
  }

}