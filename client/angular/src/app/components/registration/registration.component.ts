import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RegistrationService} from '../../services/registration.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  protected form: FormGroup;

  constructor(private fb: FormBuilder, private regService: RegistrationService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      goal: ['', Validators.required]
    });
  }

  protected registerAccount() {
    this.regService.registerAccount(this.form.value).subscribe(
      () => {
        console.log("Successfully registered");
        this.router.navigate(['/myAccount']);
      },
      error => {
        console.log(error);
      }
    )
  }

}
