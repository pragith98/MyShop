import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthState, UserState } from 'src/app/store';

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
    this.navigateToHome();
  }
  

}
