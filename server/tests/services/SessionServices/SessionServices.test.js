import BaseServices from '../../../dist/services/base/BaseServices.js';
import SessionServices from '../../../dist/services/SessionServices.js';

describe('Session Services', () => {
  it('should be a class', () => {
    expect(SessionServices).to.be.a('class');
  });

  it('should have a constructor', () => {
    expect(SessionServices).to.have.property('constructor');
  });

  it("should be extended from 'BaseServices' class", () => {
    expect(SessionServices.prototype).to.be.an.instanceOf(BaseServices);
  });

  it('should have a constructor that takes 1 argument', () => {
    expect(SessionServices).to.have.lengthOf(1);
  });

  it("should have a 'create' method", () => {
    expect(SessionServices).to.have.property('create');
  });

  it("should have a 'findByToken' method", () => {
    expect(SessionServices).to.have.property('findBySessionToken');
  });
});
