import {Component, OnInit} from '@angular/core';
import {TransferService} from '../../services/transfer.service';
import {TransferListItem} from '../../models/transfer-list-item';
import {AccountDetails} from '../../models/account-details';

@Component({
  selector: 'app-my-transfers',
  standalone: false,
  templateUrl: './my-transfers.component.html',
  styleUrl: './my-transfers.component.css'
})
export class MyTransfersComponent implements OnInit {

  incomingList: TransferListItem[] = [];
  outgoingList: TransferListItem[] = [];

  constructor(private transferService: TransferService) {

  }

  ngOnInit(): void {
    this.transferService.fetchTransferLists().subscribe(
      (data: AccountDetails) => {
        this.incomingList = data.incomingTransfers;

        this.outgoingList = data.outgoingTransfers;
      },
      (error: any) => {
        console.error(error);
      }
    )
  }

}
