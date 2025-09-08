import {TransferListItem} from './transfer-list-item';

export interface AccountDetails {
  id: number;
  username: string;
  goal: string;
  balance: number
  funds: number
  incomingTransferList: TransferListItem[];
  outgoingTransferList: TransferListItem[];
}
