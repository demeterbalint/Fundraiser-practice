import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountDetails} from '../models/account-details';

const BASE_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }

  fetchTransferLists(): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(`${BASE_URL}/accounts/myAccountDetails`);
  }
}
