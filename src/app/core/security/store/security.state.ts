import { User } from '@jsvs/security';

export interface SecurityState {
  currentUser: User | null;
}

export const securityInitialState: SecurityState = {
  currentUser: null
};
