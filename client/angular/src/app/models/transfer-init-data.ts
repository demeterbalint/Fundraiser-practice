import {TargetAccountOption} from './target-account-option';

export interface TransferInitData {
  sourceAccountName: string;
  targetAccountOptions: TargetAccountOption[];
  balance: number;
}
