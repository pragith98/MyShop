import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FormsModule, 
  ReactiveFormsModule 
} from '@angular/forms';

import { PageHeaderComponent } from './page-header.component';

//angular material modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';


const importedModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatCardModule,
  MatTooltipModule,
  MatIconModule,
]

@NgModule({
  declarations: [
    PageHeaderComponent
  ],
  imports: importedModules,
  exports: [
    ...importedModules,
    PageHeaderComponent
  ]
})
export class SharedModule { }
