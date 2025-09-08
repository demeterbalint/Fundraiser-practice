import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyAccountComponent} from './components/my-account/my-account.component';
import {TransferFormComponent} from './components/transfer-form/transfer-form.component';
import {AccountsComponent} from './components/accounts/accounts.component';

const routes: Routes = [
  {path: '', redirectTo: 'myAccount', pathMatch: 'full'},
  {path: 'accounts', component: AccountsComponent},
  {path: 'myAccount', component: MyAccountComponent},
  {path: 'transfer-funds', component: TransferFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
