import { Injectable } from '@angular/core';
import { ApiProviderService } from '../core/apiProvider.service';
import { User } from 'src/app/types';
import { EndPoints } from 'src/app/core/env';
import { 
  map,
  Observable
} from 'rxjs';

// interface ApiResponse {
//   products: any[],
//   total: number,
//   skip: number,
//   limit: number
// }

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
    )
  }


}