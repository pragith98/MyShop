import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';

//angular material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { FooterComponent } from './footer/footer.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatBadgeModule,
    MatCardModule
  ],
  providers: [],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
