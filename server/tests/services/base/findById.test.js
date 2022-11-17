import BaseServices from '../../../dist/services/base/BaseServices.js';

descritbe('FindById method in Base Services', () => {
  it('should be a function', () => {
    expect(BaseServices.findById()).to.be.a('function');
  });

  it('should take 1 argument', () => {
    expect(BaseServices.findById()).to.have.lengthOf(1);
  });

  it("should return an error if haven't id like params", () => {
    expect(BaseServices.findById()).toThrow(TypeError);
    expect(BaseServices.findById()).toThrow('Empty id');
  });

  it('should return an object', () => {
    expect(BaseServices.findById()).to.be.an('object');
  });
});
