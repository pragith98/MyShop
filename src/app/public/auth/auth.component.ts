import { Component } from '@angular/core';
import { 
  NonNullableFormBuilder, 
  Validators 
} from '@angular/forms';
import { Router } from '@angular/router';
import { 
  UserState, 
  AuthState,
  CartState
} from 'src/app/store';
import { User } from '../types';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { UserApiService } from '../apis/user-api.service';

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
  })

  constructor(
    private nonNullableFormBuilder: NonNullableFormBuilder,
    private authState: AuthState,
    private router: Router,
    private userState: UserState,
    private cartState: CartState,
    private confirmation: ConfirmationService,
    private userApiService: UserApiService
  ) { }
  
  onClickLogin(): void {
    if(this.loginForm.valid) {
      const formData = {
        username: this.loginForm.value.username as string, 
        password: this.loginForm.value.password as string, 
      }
      this.authState.login(formData)
        .subscribe(data => {
          this.userState.getUser(data.id);
          this.cartState.fetchCart(data.id);
          this.router.navigate(['']);
        });
    }
  }

  onClickRegister(): void {
    this.isRegister = true;
  }

  createUser(formData: User): void {
    this.confirmation.getConfirmation(formData.firstName,'create')
      .subscribe(response => {
        if(response)
          this.userApiService.createUser(formData)
            .subscribe(() => this.router.navigate(['']));
      })
  }

  onCanceled(): void {
    this.isRegister = false;
  }
}
