const BaseServices = require('../../../dist/services/base/BaseServices.js');

describe.skip('Find method in Base Services', () => {
  it('should be a function', () => {
    expect(BaseServices.find()).toBeInstanceOf(Function);
  });
});
