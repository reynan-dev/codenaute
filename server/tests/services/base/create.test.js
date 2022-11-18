const BaseServices = require('../../../dist/services/base/BaseServices.js');

describe.skip('Create method in Base Services', () => {
  it('should be a function', () => {
    expect(BaseServices.create()).toBeInstanceOf(Function);
  });

  it('should take 1 argument', () => {
    expect(BaseServices.create()).toHaveLength(1);
  });

  it("should return an error if haven't data like params", () => {
    expect(BaseServices.create()).toThrow(TypeError);
    expect(BaseServices.create()).toThrow('Empty id');
  });

  it('should return an error if obj has not created', () => {
    expect(BaseServices.create()).toThrow(TypeError);
    expect(BaseServices.create()).toThrow('Not created');
  });
});
