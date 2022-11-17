import SessionServices from '../../../dist/services/SessionServices.js';

describe('findByToken method in Session Services', () => {
  it('should be a function', () => {
    expect(SessionServices.findByToken()).to.be.a('function');
  });

  it('should take 1 argument', () => {
    expect(SessionServices.findByToken()).to.have.lengthOf(1);
  });

  it("should return an error if haven't token like params", () => {
    expect(SessionServices.findByToken()).toThrow(TypeError);
    expect(SessionServices.findByToken()).toThrow('Empty token');
  });

  it('should return an object', () => {
    expect(SessionServices.findByToken()).to.be.an('object');
  });
});
