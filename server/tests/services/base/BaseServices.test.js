const BaseServices = require('../../../dist/services/base/BaseServices.js');

describe.skip('Base Services', () => {
  it('should be a class', () => {
    expect(BaseServices).toBeInstanceOf(BaseServices);
  });

  it('should have a constructor that takes 1 argument', () => {
    expect(BaseServices).toHaveLength(1);
  });
});
