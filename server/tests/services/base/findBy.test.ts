import BaseServices from '../../../src/services/base/BaseServices';

describe.skip('FindBy method in Base Services', () => {
  it('should be a function', () => {
    expect(BaseServices.findBy()).toBeInstanceOf(Function);
  });

  it('should take 1 argument', () => {
    expect(BaseServices.findBy()).toHaveLength(1);
  });
});
