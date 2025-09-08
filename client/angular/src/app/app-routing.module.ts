import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyAccountComponent} from './components/my-account/my-account.component';
import {TransferFormComponent} from './components/transfer-form/transfer-form.component';
import {AccountsComponent} from './components/accounts/accounts.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {AuthGuard} from './authguard/auth-guard';

const routes: Routes = [
  {path: '', redirectTo: 'myAccount', pathMatch: 'full'},
  {path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard]},
  {path: 'myAccount', component: MyAccountComponent, canActivate: [AuthGuard]},
  {path: 'registration', component: RegistrationComponent},
  {path: 'transfer-funds', component: TransferFormComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
