import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  hasAccount() {
    return this.http.get('api/accounts/myAccountDetails')
  }
}
