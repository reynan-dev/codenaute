import MemberServices from '../../../dist/services/MemberServices.js';

describe('FindBySessionToken method in Member Services', () => {
  it('should be a function', () => {
    expect(MemberServices.findBySessionToken()).to.be.a('function');
  });

  it('should take 1 argument', () => {
    expect(MemberServices.findBySessionToken()).to.have.lengthOf(1);
  });

  it("should return an error if haven't sessionToken like params", () => {
    expect(MemberServices.findBySessionToken()).toBeNull();
  });

  it('should return an object', () => {
    expect(MemberServices.findBySessionToken()).to.be.an('object');
  });
});
