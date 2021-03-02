import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AddComponent} from './add/add.component';
import {FormsModule} from '@angular/forms';
import {EditComponent} from './edit/edit.component';
import {RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    EditComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
