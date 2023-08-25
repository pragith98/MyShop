import {
  Computed,
  DataAction,
  Persistence,
  StateRepository
} from '@angular-ru/ngxs/decorators';
import { Injectable } from '@angular/core';
import { State } from '@ngxs/store'
import { CategoryApiSerice } from '../public/apis/category-api.service';
import { 
  Observable,
  tap 
} from 'rxjs';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';


@Persistence([{
  path: 'categories',
  existingEngine: localStorage
}])
@StateRepository()
@State<string[]>({
  name: 'categories',
  defaults: []
})
@Injectable({
  providedIn: 'root'
})
export class CategoryState extends NgxsDataRepository<string[]>{

  constructor(private apiService: CategoryApiSerice) {
    super();
  }

  @Computed()
  get categories(): string[] {
    return this.ctx.getState();
  }

  @DataAction()
  fetchCategories(): Observable<string[]> {
    return this.apiService.getCategories()
      .pipe(tap(categories => this.ctx.setState(categories)));
  }


}