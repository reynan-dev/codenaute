const SessionServices = require('../../../dist/services/SessionServices.js');

describe.skip('findByToken method in Session Services', () => {
  it('should be a function', () => {
    expect(SessionServices.findByToken()).toBeInstanceOf(Function);
  });

  it('should take 1 argument', () => {
    expect(SessionServices.findByToken()).toHaveLength(1);
  });

  it("should return an error if haven't token like params", () => {
    expect(SessionServices.findByToken()).toThrow(TypeError);
    expect(SessionServices.findByToken()).toThrow('Empty token');
  });
});
