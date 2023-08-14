import { Component } from '@angular/core';
import { 
  NonNullableFormBuilder, 
  Validators 
} from '@angular/forms';
import { Router } from '@angular/router';
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
    private authState: AuthState,
    private router: Router
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

  onClickRegister(): void {
    this.router.navigate(
      ['users/form'],
      {queryParams:{action: 'create'}}
    );
  }
}
