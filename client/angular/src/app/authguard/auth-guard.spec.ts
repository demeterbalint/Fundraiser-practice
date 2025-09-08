import { AuthGuard } from './auth-guard';
import {of} from 'rxjs';

describe('AuthGuard', () => {
  it('should create an instance', () => {
    const fakeAccountService: any = { getAccount: () => of(null) };
    const fakeRouter: any = { navigate: () => {} };

    expect(new AuthGuard(fakeAccountService, fakeRouter)).toBeTruthy();

  });
});
