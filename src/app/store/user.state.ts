import { Injectable } from '@angular/core';
import { User } from '../public/types';
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
import { UserApiService } from '../public/apis/user-api.service';

const defaultUser: User = {
  id: 0,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  address: {
    address: ''
  }
}

interface UserStateModel {
  user: User
}

@Persistence([{
  path: 'user',
  existingEngine: localStorage
}])
@StateRepository()
@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: defaultUser
  }
})

@Injectable({
  providedIn: "root"
})
export class UserState extends NgxsDataRepository<UserStateModel>{

  constructor( private apiService: UserApiService) {
    super();
  }

  /**
   * Retrieves user from current state.
   */
    @Computed()
    get getAvailableUser(): User {
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
   * Check if user are fetched by verifing id of user state 
   * @returns {boolean}
   */
  private haveFetched(): boolean {
    return this.ctx.getState().user.id !== 0;
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
   * add new user to the state.
   * @param user 
   * @returns {Observable<User>}
   */
  //TODO: remove function. don't need to store created user in state
  @DataAction()
  createUser(@Payload('user') user: User): Observable<User> {
    return this.apiService.createUser(user)
      .pipe(tap(user => {
        this.ctx.setState({
          user
        });
      }));
  }

  /**
   * Performs user updating by providing user id and user data. if the updating 
   * is successful, the previous user in state is replaced with the new
   * updated user.
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
      }));
  }
}