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

  /**
   * Centerlized API service for  Post requests.
   * @param endpoint 
   * @param body 
   * @returns {Observable}
   */
  post<T>(
      endpoint: string,
      body: any
    ): Observable<T> {
    return this.http.post<T>(
      `${this.apiBaseAddress}/${endpoint}`,
      body  
    )
    .pipe(catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => 'Error in API call post ' + endpoint);
    }));
  }

  /**
   * Centerlized API service for Patch requests.
   * @param endpoint 
   * @param body 
   * @returns {Observable}
   */
  update<T>(endpoint: string, body: any): Observable<T> {
    return this.http.patch<T>(
      `${this.apiBaseAddress}/${endpoint}`,
      body
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        console.debug(error);
        return throwError(() => 'Error in API call update ' + endpoint);
      }));
  }
}