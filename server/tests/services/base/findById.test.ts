import BaseServices from '../../../src/services/base/BaseServices';

describe.skip('FindById method in Base Services', () => {
  it('should be a function', () => {
    expect(BaseServices.findById()).toBeInstanceOf(Function);
  });

  it('should take 1 argument', () => {
    expect(BaseServices.findById()).toHaveLength(1);
  });

  it("should return an error if haven't id like params", () => {
    expect(BaseServices.findById()).toThrow(TypeError);
    expect(BaseServices.findById()).toThrow('Empty id');
  });
});
