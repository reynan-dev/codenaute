import BaseServices from '../../../dist/services/base/BaseServices.js';

describe('Delete method in Base Services', () => {
  it('should be a function', () => {
    expect(BaseServices.delete()).to.be.a('function');
  });

  it('should take 1 argument', () => {
    expect(BaseServices.delete()).to.have.lengthOf(1);
  });

  it("should return an error if haven't id like params", () => {
    expect(BaseServices.delete()).toThrow(TypeError);
    expect(BaseServices.delete()).toThrow('Empty id');
  });

  it('should return an object', () => {
    expect(BaseServices.delete()).to.be.an('object');
  });
});
