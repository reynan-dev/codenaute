import BaseServices from '../../../dist/services/base/BaseServices.js';
import MemberServices from '../../../dist/services/MemberServices.js';

describe('Member Services', () => {
  it('should be a class', () => {
    expect(MemberServices).to.be.a('class');
  });

  it('should have a constructor', () => {
    expect(MemberServices).to.have.property('constructor');
  });

  it("should be extended from 'BaseServices' class", () => {
    expect(MemberServices.prototype).to.be.an.instanceOf(BaseServices);
  });

  it('should have a constructor that takes 1 argument', () => {
    expect(MemberServices).to.have.lengthOf(1);
  });

  it("should have a 'signIn' property", () => {
    expect(MemberServices).to.have.property('signIn');
  });

  it("should have a 'findBySessionToken' method", () => {
    expect(MemberServices).to.have.property('findBySessionToken');
  });
});
