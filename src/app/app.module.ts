import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { NGXS_DATA_STORAGE_PLUGIN } from '@angular-ru/ngxs/storage';


import { 
  ProductState,
  AuthState
} from 'src/app/store';

//angular material modules
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from './core/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    AppComponent,
    ProductsPageComponent,
    HeaderComponent,
    UsersPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([
      ProductState,
      AuthState
    ]),
    NgxsLoggerPluginModule.forRoot(),
    MatCardModule,
    HttpClientModule,
    NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_PLUGIN]),
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
