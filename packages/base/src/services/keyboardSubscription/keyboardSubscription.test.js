import testingService from '@base/services/testing/testing';
import keyboardSubscriptionService from './keyboardSubscription';

describe('Keyboard Subscription Service', () => {
  it('should subscribe to some key event', () => {
    const escapeKeyCode = 27;
    const callback = jest.fn();
    const id = keyboardSubscriptionService.subscribe(escapeKeyCode, callback);
    testingService.simulateKeydown(escapeKeyCode);
    expect(callback).toHaveBeenCalled();
    keyboardSubscriptionService.unsubscribe(id);
  });

  it('should not execute subscriber callback if event has been fired from a different key code', () => {
    const escapeKeyCode = 27;
    const enterKeyCode = 13;
    const callback = jest.fn();
    const id = keyboardSubscriptionService.subscribe(escapeKeyCode, callback);
    testingService.simulateKeydown(enterKeyCode);
    expect(callback).not.toHaveBeenCalled();
    keyboardSubscriptionService.unsubscribe(id);
  });

  it('should unsubscribe from some key event', () => {
    const escapeKeyCode = 27;
    const callback = jest.fn();
    const id = keyboardSubscriptionService.subscribe(escapeKeyCode, callback);
    keyboardSubscriptionService.unsubscribe(id);
    testingService.simulateKeydown(escapeKeyCode);
    expect(callback).not.toHaveBeenCalled();
  });
});
