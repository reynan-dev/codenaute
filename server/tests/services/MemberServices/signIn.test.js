import MemberServices from '../../../dist/services/MemberServices.js';

describe('SigIn method in Member Services', () => {
  it('should be a function', () => {
    expect(MemberServices.signIn()).to.be.a('function');
  });

  it('should take 2 arguments', () => {
    expect(MemberServices.signIn()).to.have.lengthOf(2);
  });

  it("should return an error if haven't email like params", () => {
    expect(MemberServices.signIn()).toThrow(TypeError);
    expect(MemberServices.signIn()).toThrow('Empty email or password');
  });

  it("should return an error if haven't password like params", () => {
    expect(MemberServices.signIn()).toThrow(TypeError);
    expect(MemberServices.signIn()).toThrow('Empty email or password');
  });

  it('should return an error if obj has not founded', () => {
    expect(MemberServices.signIn()).toThrow(TypeError);
    expect(MemberServices.signIn()).toThrow('Member not founded');
  });

  it('should return an object', () => {
    expect(MemberServices.signIn()).to.be.an('object');
  });
});
