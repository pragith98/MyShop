import { 
  Component,
  OnInit,
} from '@angular/core';
import { UserState } from 'src/app/store';
import { User } from 'src/app/public/types';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-update',
  template: `
    <app-user-form [formAction]="'Update'" [userData]='currentUser' 
      (formData)='updateUser($event)' (isCanceled)='onCanceled()'>
    </app-user-form>
    `
})
export class UserUpdateComponent implements OnInit {
  currentUser?: User;

  constructor(
    private userState: UserState,
    private confirmation: ConfirmationService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.currentUser = this.userState.getAvailableUser;
  }

  updateUser(formData: User): void {
    this.confirmation.getConfirmation(formData.firstName,'update')
      .subscribe(response => {
        if(response)
          this.userState.updateUser(formData.id, formData)
            .subscribe(() => this.navigateToUser());
      });
  }

  onCanceled(): void {
    this.navigateToUser();
  }

  private navigateToUser(): void {
    this.router.navigate(['users']);
  }

}
