import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegistrationDTO} from '../models/registration-dto';
import {Observable} from 'rxjs';

const BASE_URL = 'http://localhost:8080/api/accounts';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) {
    this.http = http;
  }

  registerAccount(data: RegistrationDTO): Observable<any> {
    return this.http.post(BASE_URL, data);
  }
}
