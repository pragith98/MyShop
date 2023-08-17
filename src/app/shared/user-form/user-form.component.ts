import { 
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { 
  NonNullableFormBuilder, 
  Validators
} from '@angular/forms';
import { User } from 'src/app/public/types';
import { UserFormService } from './user-form.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit{
  @Input('formAction') formAction: string = '';
  @Input('userData') userData?: User;
  @Output('formData') formData = new EventEmitter<User>();
  @Output('isCanceled') isCanceled = new EventEmitter();

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
    private nonNullableFormBuilder: NonNullableFormBuilder,
    private service: UserFormService  
  ) { }
  
  ngOnInit(): void {
    if(this.userData)
      this.setCurrentUser(this.userData);
  }

  private setCurrentUser(user: User): void {
    this.userID = user.id;
    this.userForm.patchValue({
      ...user, 
      address: user.address.address
    });
  }

  onClickSubmit(): void {
    if(this.userForm.valid) {
      this.formData.emit(
        this.service.formatData(this.userID, this.userForm.value));
    }
  }

  onClickCancel(): void {
    this.isCanceled.emit();
  }
}
