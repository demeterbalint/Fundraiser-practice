import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountDetails} from '../models/account-details';
import {TransferListItem} from '../models/transfer-list-item';
import {TransferCreationCommand} from '../models/transfer-creation-command';

const BASE_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }

  fetchTransferLists(): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(`${BASE_URL}/accounts/myAccountDetails`);
  }

  getAllTransfers() {
    return this.http.get<TransferListItem[]>(`${BASE_URL}/transfers/allTransfers`);
  }

  createTransfer(data: TransferCreationCommand): Observable<any> {
    return this.http.post(`${BASE_URL}/transfers`, data);
  }
}
