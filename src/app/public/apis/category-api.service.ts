import { Injectable } from '@angular/core';
import { EndPoints } from 'src/app/core/env';
import { ApiProviderService } from 'src/app/core/services/apiProvider.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryApiSerice {

  constructor(private apiProvider: ApiProviderService) { }

  /**
   * Retrieves category data by calling API.
   * @returns {Observable<string[]>} 
   */
  getCategories(): Observable<string[]> {
    return this.apiProvider.get(EndPoints.getAllCategories);
  }
}