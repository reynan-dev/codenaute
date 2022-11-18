const MemberServices = require('../../../dist/services/MemberServices.js');

describe.skip('SigIn method in Member Services', () => {
  it('should be a function', () => {
    expect(MemberServices.signIn()).toBeInstanceOf(Function);
  });

  it('should take 2 arguments', () => {
    expect(MemberServices.signIn()).toHaveLength(2);
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
});
