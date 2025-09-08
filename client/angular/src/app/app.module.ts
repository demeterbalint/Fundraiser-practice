import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import {ReactiveFormsModule} from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { TransferFormComponent } from './components/transfer-form/transfer-form.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountsComponent } from './components/accounts/accounts.component';
import { MyTransfersComponent } from './components/my-transfers/my-transfers.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MyAccountComponent,
    TransferFormComponent,
    AccountsComponent,
    MyTransfersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RegistrationComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
