import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserState } from 'src/app/store';
import { User } from 'src/app/types';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { 
  Observable,
  map 
} from 'rxjs';

@Injectable()
export class UsersService {

  constructor(
    private userState: UserState,
    private router: Router,
    private dialog: MatDialog
  ) { }

  /**
   * Submit form data to create or update user. If form data has no ID, 
   * that form data submit to create a user. otherwise submit to update the user.
   */
  submitFormData(
    id: number, 
    formData: any
  ): void {
    const data = {
      id: id,
      firstName: formData.firstName as string,
      lastName: formData.lastName as string,
      email: formData.email as string,
      phone: formData.phone as string,
      address: { address: formData.address as string },
      username: formData.username as string,
      password: formData.password as string,
    }

    if (data.id === 0) {
      this.createUser(data);
    } else this.updateUser(data.id, data);
  }

  private createUser(user: User): void {
    this.confirmation(user.firstName,'create').subscribe(response => {
      if(response === true)
      this.userState.createUser(user)
      .subscribe(() => this.router.navigate(['']));
    })
  }

  private updateUser(
    id: number, 
    user: User
  ): void {
    this.confirmation(user.firstName,'update').subscribe(response => {
      if(response === true)
      this.userState.updateUser(id, user)
        .subscribe(() => this.router.navigate(['users']));
    });
  }

  private confirmation(
    data: any, 
    action: string
  ): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        content: data,
        action: action
      }
    });
    return dialogRef.afterClosed()
  }
}