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

  onClickTitle(): void {
    this.navigateToHome();
  }

  onClickLoginOrResiter(): void {
    this.router.navigate(['auth/login']);
  }

  onClickLogout(): void {
    this.authState.logout();
    this.userState.resetUser();
    this.navigateToHome();
  }
  
  private navigateToHome(): void {
    this.router.navigate([''])
  }

}
