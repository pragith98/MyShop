import { Component } from '@angular/core';
import {
  CategoryState 
} from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private categoryState: CategoryState
  ) { 
    this.categoryState.fetchCategories();
  }
}
