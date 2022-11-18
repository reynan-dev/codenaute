const BaseServices = require('../../../dist/services/base/BaseServices.js');

describe.skip('Delete method in Base Services', () => {
  it('should be a function', () => {
    expect(BaseServices.delete()).toBeInstanceOf(Function);
  });

  it('should take 1 argument', () => {
    expect(BaseServices.delete()).toHaveLength(1);
  });

  it("should return an error if haven't id like params", () => {
    expect(BaseServices.delete()).toThrow(TypeError);
    expect(BaseServices.delete()).toThrow('Empty id');
  });
});
