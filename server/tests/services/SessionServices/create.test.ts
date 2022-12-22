import SessionServices from '../../../src/services/SessionServices';

describe.skip('Create method in Session Services', () => {
  it('should be a function', () => {
    expect(SessionServices.create()).toBeInstanceOf(Function);
  });

  it('should take 1 argument', () => {
    expect(SessionServices.create()).toHaveLength(1);
  });

  it("should return an error if haven't memberId like params", () => {
    expect(SessionServices.create()).toBeNull();
  });
});
