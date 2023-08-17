import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';

//angular material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [],
  exports: [
    HeaderComponent,
  ]
})
export class CoreModule { }
