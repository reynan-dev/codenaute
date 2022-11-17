import BaseServices from '../../../dist/services/base/BaseServices.js';

descritbe('Create method in Base Services', () => {
  it('should be a function', () => {
    expect(BaseServices.create()).to.be.a('function');
  });

  it('should take 1 argument', () => {
    expect(BaseServices.create()).to.have.lengthOf(1);
  });

  it("should return an error if haven't data like params", () => {
    expect(BaseServices.create()).toThrow(TypeError);
    expect(BaseServices.create()).toThrow('Empty id');
  });

  it('should return an error if obj has not created', () => {
    expect(BaseServices.create()).toThrow(TypeError);
    expect(BaseServices.create()).toThrow('Not created');
  });

  it('should return an object', () => {
    expect(BaseServices.create()).to.be.an('object');
  });
});
