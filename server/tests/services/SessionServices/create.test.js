import SessionServices from '../../../dist/services/SessionServices.js';

describe('Create method in Session Services', () => {
  it('should be a function', () => {
    expect(SessionServices.create()).to.be.a('function');
  });

  it('should take 1 argument', () => {
    expect(SessionServices.create()).to.have.lengthOf(1);
  });

  it("should return an error if haven't memberId like params", () => {
    expect(SessionServices.create()).toBeNull();
  });

  it('should return an object', () => {
    expect(SessionServices.create()).to.be.an('object');
  });
});
