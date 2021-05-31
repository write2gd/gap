import { securityInitialState } from './security.state';
import { getCurrentUser } from './security.selectors';


describe('getter functions', () => {
  it('should get currentUser', () => {
    expect(getCurrentUser(securityInitialState)).toBe(securityInitialState.currentUser);
  });
});

