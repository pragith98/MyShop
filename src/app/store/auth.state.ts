import { Injectable } from '@angular/core';
import { User } from 'src/app/types';
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


const defaultUser: User = {
  id: 0,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  token: ''
}

interface AuthStateModel {
  auth: User;
}

@Persistence([{
  path: 'auth',
  existingEngine: localStorage
}])
@StateRepository()
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    auth: defaultUser
  }
})

@Injectable()
export class AuthState extends NgxsDataRepository<AuthStateModel> {

  constructor(
    private apiService: AuthenticationApiService,
    private location: Location
  ) {
    super();
  }

  /**
   * Get current user from state.
   * @returns {User}
   */
  @Computed()
  get getAuthUser(): User {
    return this.ctx.getState().auth;
  }

  /**
   * Check if current user is authenticated by verifing the availability of 
   * user's token in the state.
   * @returns {boolean}
   */
  @Computed()
  get isAuthenticated(): boolean{
    return this.ctx.getState().auth.token !== '';
  }

  /**
   * Perform user login by using provided login credentials.
   * If login is successful, store logged user data in the state.
   * @param credentials 
   */
  @DataAction()
  login(
    @Payload('credentials') credentials: LoginCredentials
  ): Observable<User> {
    return this.apiService.login(credentials)
      .pipe(tap(auth => {
        this.ctx.setState({
          auth
        });
        this.location.back();
      }));
  }

  /**
   * Logout current logged user by resetting the state 
   */
  @DataAction()
  logout(): void {
    this.reset();
  }

}