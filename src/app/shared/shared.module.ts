import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FormsModule, 
  ReactiveFormsModule 
} from '@angular/forms';

import { PageHeaderComponent } from './page-header.component';
import { UserFormService } from './user-form/user-form.service';
import { QuantityStepperComponent } from './quantity-stepper/quantity-stepper.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { UserFormComponent } from './user-form/user-form.component';

//angular material modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



const importedModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatCardModule,
  MatTooltipModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
]

@NgModule({
  declarations: [
    PageHeaderComponent,
    UserFormComponent,
    QuantityStepperComponent,
    LoadingSpinnerComponent
  ],
  imports: importedModules,
  exports: [
    ...importedModules,
    PageHeaderComponent,
    UserFormComponent,
    QuantityStepperComponent,
    LoadingSpinnerComponent
  ],
  providers: [UserFormService]
})
export class SharedModule { }
