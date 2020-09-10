import { AnyAction, Dispatch } from 'redux';
import { StateType as AccountState } from './accountModel';

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
}

export interface ConnectProps {
  dispatch: Dispatch<AnyAction>;
}

export interface ConnectState {
  loading: Loading;
  account: AccountState;
}
