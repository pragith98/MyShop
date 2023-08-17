import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

//angular material modules
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersComponent } from './users.component';
import { UserUpdateComponent } from './pages/user-update.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserDetailComponent,
    UserUpdateComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: []
})
export class UsersModule { }
