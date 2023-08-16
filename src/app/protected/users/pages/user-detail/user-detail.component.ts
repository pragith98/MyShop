import { 
  Component,
} from '@angular/core';
import { User } from 'src/app/public/types';
import { Router } from '@angular/router';
import { UserState } from 'src/app/store';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  user: User = this.userState.getAvailableUser;

  constructor(
    private userState: UserState,
    private router: Router  
  ) { }

  onClickUpdate(): void {
    this.router.navigate(
      ['users/form'],
      {queryParams: {action: 'update'}}
    );
  }

}
