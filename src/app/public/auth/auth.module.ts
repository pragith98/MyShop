import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
  ],
  providers: [AuthService]
})
export class AuthModule { }
