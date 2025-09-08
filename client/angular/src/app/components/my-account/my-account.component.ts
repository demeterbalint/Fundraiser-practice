import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AccountDetails} from '../../models/account-details';

@Component({
  selector: 'app-my-account',
  standalone: false,
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent implements OnInit {

  protected accountForm: FormGroup

  constructor(private accountService: AccountService, private fb: FormBuilder) {
    this.accountForm = fb.group({
      username: [''],
      goal: [''],
      balance: [''],
      funds: ['']
    })
    this.accountForm.get('username')?.disable();
    this.accountForm.get('goal')?.disable();
    this.accountForm.get('balance')?.disable();
    this.accountForm.get('funds')?.disable();
  }

  ngOnInit(): void {
    this.accountService.getAccountDetails().subscribe(
      (data: AccountDetails)  => {
        this.accountForm.setValue({
          username: data.username,
          goal: data.goal,
          balance: data.balance,
          funds: data.funds
        })
      }
    )
  }

}
