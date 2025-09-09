import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {TransferService} from '../../services/transfer.service';
import {Router} from '@angular/router';
import {TransferInitData} from '../../models/transfer-init-data';

@Component({
  selector: 'app-transfer-form',
  standalone: false,
  templateUrl: './transfer-form.component.html',
  styleUrl: './transfer-form.component.css'
})
export class TransferFormComponent implements OnInit {

  transferForm: FormGroup;
  myTransfer!: TransferInitData;

  constructor(private fb: FormBuilder, private transferService: TransferService, private router: Router) {
    this.transferForm = fb.group({
      source: [''],
      target: [''],
      amount: [''],
    })
  }

  ngOnInit(): void {
    this.loadTransferForm();
  }

  private loadTransferForm() {

    this.transferService.transferBase().subscribe(
      (data: TransferInitData) => {
        this.myTransfer = data

        this.transferForm.get('amount')?.setValidators([
          Validators.required,
          Validators.min(50),
          this.maxValueValidator(1000, this.myTransfer.balance)
        ])
        this.transferForm.get('amount')?.updateValueAndValidity();
      }
    )
  }

  maxValueValidator(max: number, balanceMax: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value == null || value === '') {
        return null;
      }
      if (value > balanceMax) {
        return {goneOverBalance: {balanceMax}};
      }
      if (value > max) {
        return {goneOverMax: {max}};
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
