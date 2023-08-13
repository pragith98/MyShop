import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { 
  Observable,
  catchError,
  throwError
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiProviderService {
  private readonly apiBaseAddress = 'https://dummyjson.com';

  constructor(private http: HttpClient) { }

  /**
   * Centerlized API service for  Get requests.
   * @param endpoint 
   * @returns {Observable}
   */
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiBaseAddress}/${endpoint}`)
    .pipe(catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => 'Error in API call get ' + endpoint);
    }));
  }
}