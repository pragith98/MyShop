import { Injectable } from '@angular/core';
import { ApiProviderService } from '../core/apiProvider.service';
import { 
  LoginCredentials, 
  User 
} from 'src/app/types';
import { EndPoints } from 'src/app/core/env';
import { 
  Observable
} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationApiService {

  constructor(private apiProvider: ApiProviderService) { }

  /**
   * login to the system by calling API.
   * @returns {Observable<User[]>}
   */
  login(loginCredentials: LoginCredentials): Observable<User> {
    return this.apiProvider.post(
      EndPoints.login,
      loginCredentials
    )
  }

}