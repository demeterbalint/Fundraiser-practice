import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {AccountService} from '../../services/account.service';
import {AccountDetails} from '../../models/account-details';
import {TransferService} from '../../services/transfer.service';
import {Router} from '@angular/router';

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

  constructor(private fb: FormBuilder, private accountService: AccountService, private transferService: TransferService, private router: Router) {
    this.transferForm = fb.group({
      source: [''],
      target: ['', Validators.required],
      amount: [''],
    })
  }

  ngOnInit(): void {
    this.loadTransferForm();
  }

  private loadTransferForm() {
    this.accountService.getAccountDetails().subscribe(
      (data: AccountDetails) => {
        this.myAccount = data;

        this.transferForm.patchValue({
          source: this.myAccount.id
        })

        this.accountService.getAllAccounts().subscribe(
          (data: AccountDetails[])=> {
            this.targetList = data.filter(ac => ac.id !== this.myAccount.id);

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
      if (value == null || value === '') {
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

  initiateTransfer() {
    this.transferService.createTransfer(this.transferForm.value).subscribe(
      () => {
        console.log('Transfer initiated successfully')
        this.router.navigate(['/myAccount']);
      },
      error => {
        console.log('Error', error);
      }
    )
  }
}
