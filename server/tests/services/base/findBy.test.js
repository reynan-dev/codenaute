import BaseServices from '../../../dist/services/base/BaseServices.js';

describe('FindBy method in Base Services', () => {
  it('should be a function', () => {
    expect(BaseServices.findBy()).to.be.a('function');
  });

  it('should take 1 argument', () => {
    expect(BaseServices.findBy()).to.have.lengthOf(1);
  });

  it('should return an objects', () => {
    expect(BaseServices.findBy()).to.be.an('object');
  });
});
