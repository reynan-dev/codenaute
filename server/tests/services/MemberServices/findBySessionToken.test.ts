import MemberServices from '../../../src/services/MemberServices';

describe.skip('FindBySessionToken method in Member Services', () => {
  it('should be a function', () => {
    expect(MemberServices.findBySessionToken()).toBeInstanceOf(Function);
  });

  it('should take 1 argument', () => {
    expect(MemberServices.findBySessionToken()).toHaveLength(1);
  });

  it("should return an error if haven't sessionToken like params", () => {
    expect(MemberServices.findBySessionToken()).toBeNull();
  });
});
