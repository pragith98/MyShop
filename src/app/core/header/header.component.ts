import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthState } from 'src/app/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private router: Router,
    public authState: AuthState  
  ) { }

  onClickViewProfile(): void {
    this.router.navigate(['users']);
  }

  onClickTitle(): void {
    this.router.navigate(['']);
  }

  onClickLoginOrResiter(): void {
    this.router.navigate(['auth/login']);
  }

}
