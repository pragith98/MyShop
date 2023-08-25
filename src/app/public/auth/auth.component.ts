import { Component } from '@angular/core';
import { 
  NonNullableFormBuilder, 
  Validators 
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/public/types';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isRegister = false;
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
  });

  constructor(
    private nonNullableFormBuilder: NonNullableFormBuilder,
    private router: Router,
    private service: AuthService
  ) { }
  
  onClickLogin(): void {
    if(this.loginForm.valid) {
      const formData = {
        username: this.loginForm.value.username as string, 
        password: this.loginForm.value.password as string, 
      };
      this.service.login(formData)
        .subscribe(() => this.router.navigate(['']));
    }
  }

  onClickRegister(): void {
    this.isRegister = true;
  }

  onCreateUser(formData: User): void {
    this.service.createUser(formData)
      .subscribe(response => {
        if(response)
        this.router.navigate(['']);
      });
  }

  onCanceled(): void {
    this.isRegister = false;
  }
}
