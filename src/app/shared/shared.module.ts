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
import { UserFormComponent } from './user-form/user-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserFormService } from './user-form/user-form.service';
import { QuantityStepperComponent } from './quantity-stepper/quantity-stepper.component';


const importedModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatCardModule,
  MatTooltipModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule
]

@NgModule({
  declarations: [
    PageHeaderComponent,
    UserFormComponent,
    QuantityStepperComponent
  ],
  imports: importedModules,
  exports: [
    ...importedModules,
    PageHeaderComponent,
    UserFormComponent,
    QuantityStepperComponent
  ],
  providers: [UserFormService]
})
export class SharedModule { }
