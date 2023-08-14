import { Injectable } from '@angular/core';
import { User } from 'src/app/types';
import { State } from '@ngxs/store';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import {
  Persistence,
  StateRepository,
  Computed,
  DataAction
} from '@angular-ru/ngxs/decorators'
import {
  tap,
  Observable
} from 'rxjs';
import { UserApiService } from '../api/user-api.service';

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

  constructor(private apiService: UserApiService) {
    super();
  }

  /**
   * Retrieves user from current state.
   */
    @Computed()
    get getAvailableUser(): User| null {
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
}