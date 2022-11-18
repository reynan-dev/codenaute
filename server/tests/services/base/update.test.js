const BaseServices = require('../../../dist/services/base/BaseServices.js');

describe.skip('Update method in Base Services', () => {
  it('should be a function', () => {
    expect(BaseServices.update()).toBeInstanceOf(Function);
  });

  it('should take 2 arguments', () => {
    expect(BaseServices.update()).toHaveLength(2);
  });

  it("should return an error if haven't id like params", () => {
    expect(BaseServices.update()).toThrow(TypeError);
    expect(BaseServices.update()).toThrow('Empty id');
  });

  it('should return an error if obj has not founded', () => {
    expect(BaseServices.update()).toThrow(TypeError);
    expect(BaseServices.update()).toThrow('Not founded');
  });

  it('should return an error if obj has not updated', () => {
    expect(BaseServices.update()).toThrow(TypeError);
    expect(BaseServices.update()).toThrow('Not updated');
  });
});
