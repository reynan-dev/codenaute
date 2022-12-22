import BaseServices from '../../../src/services/base/BaseServices';

describe.skip('Find method in Base Services', () => {
  it('should be a function', () => {
    expect(BaseServices.find()).toBeInstanceOf(Function);
  });
});
