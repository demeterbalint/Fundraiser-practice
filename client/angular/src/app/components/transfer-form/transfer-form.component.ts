import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {AccountService} from '../../services/account.service';
import {AccountDetails} from '../../models/account-details';

@Component({
  selector: 'app-transfer-form',
  standalone: false,
  templateUrl: './transfer-form.component.html',
  styleUrl: './transfer-form.component.css'
})
export class TransferFormComponent implements OnInit {

  transferForm: FormGroup;
  targetList: AccountDetails[] = [];
  myAccount!: AccountDetails;

  constructor(private fb: FormBuilder, private accountService: AccountService) {
    this.transferForm = fb.group({
      source: [''],
      target: ['', Validators.required],
      amount: [''],
      myBalance: ['']
    })
  }

  ngOnInit(): void {
    this.loadTransferForm();

    this.transferForm.get('source')!.disable();
    this.transferForm.get('myBalance')!.disable();
  }

  private loadTransferForm() {
    this.accountService.getAccountDetails().subscribe(
      (data: AccountDetails) => {
        this.myAccount = data;

        this.accountService.getAllAccounts().subscribe(
          (data: AccountDetails[])=> {
            this.targetList = data.filter(ac => ac.id !== this.myAccount.id);

            this.transferForm.patchValue({
              source: this.myAccount.username,
              myBalance: this.myAccount.balance
            })

            this.transferForm.get('amount')?.setValidators([
              Validators.required,
              Validators.min(50),
              this.maxValueValidator(1000, this.myAccount.balance)
            ])
            this.transferForm.get('amount')?.updateValueAndValidity();
          },
          error => {}
        )
      },
      error => {}
    )
  }

  maxValueValidator(max: number, balanceMax: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value == null && value === '') {
        return null;
      }
      if (value > balanceMax) {
        return { goneOverBalance: {balanceMax} };
      }
      if (value > max) {
        return { goneOverMax: {max} };
      }
      return null;
    };
  }
}
