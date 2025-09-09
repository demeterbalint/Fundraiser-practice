import {Component, OnInit} from '@angular/core';
import {AccountDetails} from '../../models/account-details';
import {TransferListItem} from '../../models/transfer-list-item';
import {TransferService} from '../../services/transfer.service';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-accounts',
  standalone: false,
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit {

  allAccounts: AccountDetails[] = [];
  allTransfers: TransferListItem[] = [];

  constructor(private accountService: AccountService, private transferService: TransferService) {
  }

  ngOnInit(): void {
    this.loadAccountsAndTransfers();
    setInterval(() => {
      this.loadAccountsAndTransfers();
    }, 10000);
  }

  private loadAccountsAndTransfers() {
    this.accountService.getAllAccounts().subscribe(
      (data: AccountDetails[]) => {
        this.allAccounts = data.sort((a, b) => b.funds - a.funds);
      },
      (error: any) => console.log(error)
    )
    this.transferService.getAllTransfers().subscribe(
      (data: TransferListItem[]) => {
        this.allTransfers = data;
      },
      (error: any) => console.log(error)
    )
  }
}
