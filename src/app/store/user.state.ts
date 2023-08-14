import { Injectable } from '@angular/core';
import { User } from 'src/app/types';
import { State } from '@ngxs/store';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import {
  Persistence,
  StateRepository,
  Computed,
  DataAction,
  Payload
} from '@angular-ru/ngxs/decorators'
import {
  tap,
  Observable
} from 'rxjs';
import { UserApiService } from '../api/user-api.service';
import { Router } from '@angular/router';

interface UserStateModel {
  user: User | null
}

@Persistence([{
  path: 'user',
  existingEngine: localStorage
}])
@StateRepository()
@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: null
  }
})

@Injectable({
  providedIn: "root"
})
export class UserState extends NgxsDataRepository<UserStateModel>{

  constructor(
    private apiService: UserApiService,
    private router: Router
  ) {
    super();
  }

  /**
   * Retrieves user from current state.
   */
    @Computed()
    get getAvailableUser(): User | null {
      return this.ctx.getState().user;
    }

  /**
   * Fetch user.
   * @returns {Observable<User>}
   */
  fetchUser(id: number): Observable<User> {
    return this.apiService.getUserById(id)
      .pipe(tap(user => this.ctx.setState({
        user
      })));
  }

  /**
   * Check if user are fetched by verifing nullable of user state 
   * @returns {boolean}
   */
  private haveFetched(): boolean {
    return this.ctx.getState().user !== null;
  }

  /**
   * Retrieve user data from local storage and set that data to user 
   * state if data already has been fetched to local storage. 
   * If already not fetched, perform function to fetch user data.
   */
  @DataAction()
  getUser(id: number): any {
    if (!this.haveFetched()) {
      return this.fetchUser(id);
    }
    this.getAvailableUser;
  }

  @DataAction()
  resetUser(): void {
    this.reset();
  }

  /**
   * Performs user-creation by providing user data. if creation is successful,
   * add new user to the state and the application navigate to 'home' page.
   * @param user 
   * @returns {Observable<User>}
   */
  @DataAction()
  createUser(@Payload('user') user: User): Observable<User> {
    return this.apiService.createUser(user)
      .pipe(tap(user => {
        this.ctx.setState({
          user
        });
        this.router.navigate(['']);
      }));
  }

  /**
   * Performs user updating by providing user id and user data. if the updating 
   * is successful, the previous user in state is replaced with the new
   * updated user and the application navigate to 'user profile' page.
   * @param id 
   * @param user 
   * @returns {Observable<User>}
   */
  @DataAction()
  updateUser(
    @Payload('id') id: number,
    @Payload('user') user: User
  ): Observable<User> {
    return this.apiService.updateUser(id, user)
      .pipe(tap(user => {
        this.ctx.patchState({
          user
        });
          
        this.router.navigate(
          [
            'users',
            id
          ]);
      }));
  }
}