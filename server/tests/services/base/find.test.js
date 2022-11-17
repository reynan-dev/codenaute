import BaseServices from '../../../dist/services/base/BaseServices.js';

describe('Find method in Base Services', () => {
  it('should be a function', () => {
    expect(BaseServices.find()).to.be.a('function');
  });

  it('should return an objects', () => {
    expect(BaseServices.find()).to.be.an('object');
  });
});
