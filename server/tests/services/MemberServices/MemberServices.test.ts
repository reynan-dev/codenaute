import BaseServices from '../../../src/services/base/BaseServices';
import MemberServices from '../../../src/services/MemberServices';

describe.skip('Member Services', () => {
  it('should be a class', () => {
    expect(MemberServices).toBeInstanceOf(MemberServices);
  });

  it("should be extended from 'BaseServices' class", () => {
    expect(MemberServices.prototype).toBeInstanceOf(BaseServices);
  });

  it('should have a constructor that takes 1 argument', () => {
    expect(MemberServices).toHaveLength(1);
  });
});
