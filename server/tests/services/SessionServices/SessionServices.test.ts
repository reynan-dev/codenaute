import BaseServices from '../../../src/services/base/BaseServices';
import SessionServices from '../../../src/services/SessionServices';

describe.skip('Session Services', () => {
  it('should be a class', () => {
    expect(SessionServices).toBeInstanceOf(SessionServices);
  });

  it("should be extended from 'BaseServices' class", () => {
    expect(SessionServices.prototype).toBeInstanceOf(BaseServices);
  });

  it('should have a constructor that takes 1 argument', () => {
    expect(SessionServices).toHaveLength(1);
  });
});
