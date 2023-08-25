import { Injectable } from '@angular/core';
import { ApiProviderService } from 'src/app/core/services/apiProvider.service'; 
import { User } from 'src/app/public/types';
import { EndPoints } from 'src/app/core/env';
import { 
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private apiProvider: ApiProviderService) { }

  /**
   * Retrieves user data by calling API.
   * @returns {Observable<User>}
   */
  getUserById(id: number): Observable<User> {
    return this.apiProvider.get(
      `${EndPoints.getUserById}/${id}`
    );
  }

  /**
   * Create user by calling API with provided data and retrieve created user 
   * @param body 
   * @returns {Observable<User>}
   */
  createUser(body: User): Observable<User> {
    return this.apiProvider.post<any>(
      EndPoints.createUser, 
      body
    );
  }

  /**
   * Update user by calling API with provided data and retrieve updated user.
   * @param id 
   * @param body 
   * @returns {Observable<User>}
   */
  updateUser(id: number, body: any): Observable<User> {
    return this.apiProvider.update<any>(
      `${EndPoints.updateUser}/${id}`,
      body
    );
  }


}