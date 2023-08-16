import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { UsersService } from './users.service';

//angular material modules
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersComponent } from './users.component';
import { UserFormComponent } from './pages/user-form/user-form.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserDetailComponent,
    UserFormComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }
