import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { HttpClientModule } from '@angular/common/http';
import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { NGXS_DATA_STORAGE_PLUGIN } from '@angular-ru/ngxs/storage';


import { 
  ProductState,
  AuthState,
  UserState
} from 'src/app/store';
import { CoreModule } from './core/core.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([
      ProductState,
      AuthState,
      UserState
    ]),
    NgxsLoggerPluginModule.forRoot(),
    HttpClientModule,
    NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_PLUGIN]),
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
