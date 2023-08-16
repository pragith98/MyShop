import { 
  Component,
  OnInit,
} from '@angular/core';
import { 
  NonNullableFormBuilder, 
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../users.service';
import { UserState } from 'src/app/store';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  
  formAction = '';
  userID = 0;

  userForm = this.nonNullableFormBuilder.group({
    firstName: [
      '',
      Validators.required
    ],
    lastName: [
      '',
      Validators.required
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    phone: [
      '',
      Validators.required
    ],
    address: [
      '',
      Validators.required
    ],
    username: [
      '',
      Validators.required
    ],
    password: [
      '',
      Validators.required
    ]
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private nonNullableFormBuilder: NonNullableFormBuilder,
    private service: UsersService,
    private userState: UserState,
    private location: Location
  ) { }
  
  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => this.formAction = params['action']);

    if(this.formAction === 'update') {
      this.setUserData();
    }
  }

  private setUserData(): void {
    const currentUser = this.userState.getAvailableUser;
    if(currentUser) {
      this.userID = currentUser.id;
      this.userForm.patchValue({
        ...currentUser, 
        address: currentUser.address.address
      })
    }
  }

  onClickSubmit(): void {
    if(this.userForm.valid) {
      this.service.submitFormData(
        this.userID, 
        this.userForm.value
      );
    }
  }

  navigateBack(): void {
    this.location.back();
  }

}
