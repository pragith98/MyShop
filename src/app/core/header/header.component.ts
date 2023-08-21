import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthState, CartState, UserState } from 'src/app/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private router: Router,
    public authState: AuthState,
    public userState: UserState,
    public cartState: CartState
  ) { }

  onClickViewProfile(): void {
    this.router.navigate(['users']);
  }

  onClickCart(): void {
    this.router.navigate(['carts']);
  }
  
  onClickLoginOrResiter(): void {
    this.router.navigate(['auth']);
  }
  
  private navigateToHome(): void {
    this.router.navigate([''])
  }

  onClickTitle(): void {
    this.navigateToHome();
  }

  onClickLogout(): void {
    this.authState.logout();
    this.userState.resetUser();
    this.cartState.resetCart();
    this.navigateToHome();
  }
  

}
