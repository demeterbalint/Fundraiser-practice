import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountDetails} from '../models/account-details';

const BASE_URL = 'http://localhost:8080/api/accounts';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  hasAccount() {
    return this.http.get(`${BASE_URL}/myAccountDetails`)
  }

  getAccountDetails(): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(`${BASE_URL}/myAccountDetails`);
  }

  getAllAccounts() {
    return this.http.get<AccountDetails[]>(`${BASE_URL}/allAccounts`);
  }
}
