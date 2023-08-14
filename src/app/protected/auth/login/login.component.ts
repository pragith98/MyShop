import { Component } from '@angular/core';
import { 
  NonNullableFormBuilder, 
  Validators 
} from '@angular/forms';
import { AuthState } from 'src/app/store/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;

  loginForm = this.nonNullableFormBuilder.group({
    username: [
      '',
      Validators.required,
    ],
    password: [
      '',
      Validators.required,
    ]
  })

  constructor(
    private nonNullableFormBuilder: NonNullableFormBuilder,
    private authState: AuthState  
  ) { }
  
  onSubmit(): void {
    if(this.loginForm.valid) {
      const formData = {
        username: this.loginForm.value.username as string, 
        password: this.loginForm.value.password as string, 
      }
      this.authState.login(formData)
    }
  }
}
