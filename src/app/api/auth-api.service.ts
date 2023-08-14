import { Injectable } from '@angular/core';
import { ApiProviderService } from '../core/apiProvider.service';
import { 
  LoginCredentials, 
  Auth 
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
   * @returns {Observable<Auth>}
   */
  login(loginCredentials: LoginCredentials): Observable<Auth> {
    return this.apiProvider.post(
      EndPoints.login,
      loginCredentials
    )
  }

}