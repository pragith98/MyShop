import { 
  Component,
  OnInit,
} from '@angular/core';
import { 
  NonNullableFormBuilder, 
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserFormService } from './user.form.service';
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
    private service: UserFormService,
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

  /**
   * Submit form data to create or update user. If form data has no ID, 
   * that form data submit to create a user. otherwise submit to update the user.
   */
  onClickSubmit(): void {
    if(this.userForm.valid) {
      const formData = {
        id: this.userID,
        token: '',
        firstName: this.userForm.value.firstName as string,
        lastName: this.userForm.value.lastName as string,
        email: this.userForm.value.email as string,
        phone: this.userForm.value.phone as string,
        address: {address: this.userForm.value.address as string},
        username: this.userForm.value.username as string,
        password: this.userForm.value.password as string,
      }
  
      if(this.userID === 0) {
        this.service.createUser(formData);
      } else this.service.updateUser(this.userID, formData);
    }
  }

  navigateBack(): void {
    this.location.back();
  }

}
