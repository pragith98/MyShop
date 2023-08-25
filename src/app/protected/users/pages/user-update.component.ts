import { Component } from '@angular/core';
import { UserState } from 'src/app/store';
import { User } from 'src/app/public/types';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-user-update',
  template: `
    <app-user-form [formAction]="'Update'" [userData]='currentUser' 
      (formData)='onUpdateUser($event)' (isCanceled)='onCanceled()'>
    </app-user-form>
    `
})
export class UserUpdateComponent {
  currentUser: User = this.userState.getAvailableUser;

  constructor(
    private userState: UserState,
    private router: Router,
    private service: UsersService
  ) { }

  onUpdateUser(formData: User): void {
    this.service.updateUser(formData)
      .subscribe(response => {
        if(response)
        this.navigateToUser();
      });
  }

  onCanceled(): void {
    this.navigateToUser();
  }

  private navigateToUser(): void {
    this.router.navigate(['users']);
  }

}
