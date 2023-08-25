import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { 
  Observable,
  catchError,
  throwError,
  tap
} from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ApiProviderService {
  private readonly apiBaseAddress = 'https://dummyjson.com';

  constructor(
    private http: HttpClient,
    private alert: AlertService
  ) { }

  /**
   * Centerlized API service for  Get requests.
   * @param endpoint 
   * @returns {Observable}
   */
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiBaseAddress}/${endpoint}`)
    .pipe(
      tap(() => this.alert.alertMessage(
        'success',
        `${endpoint} data retrieving successful`
      )),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        this.alert.alertMessage(
          'false',
          `${endpoint} data retrieving unsuccessful`
        );
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
    .pipe(
      tap(() => this.alert.alertMessage('success',`${endpoint} successful`)),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        this.alert.alertMessage('false',`${endpoint} unsuccessful`);
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
    )
    .pipe(
      tap(() => this.alert.alertMessage(
        'success',
        `${endpoint} update successful`
      )),
      catchError((error: HttpErrorResponse) => {
        console.debug(error);
        this.alert.alertMessage('false',`${endpoint} update unsuccessful`);
        return throwError(() => 'Error in API call update ' + endpoint);
      }));
  }
}