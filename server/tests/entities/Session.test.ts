import Session from '../../src/entities/Session';

describe.skip('Session Entity', () => {
  it('should be a class', () => {
    expect(Session).toBeInstanceOf(Session);
  });

  it("should be extended from 'BaseEntity' class", () => {
    expect(Session.prototype).toBeInstanceOf(BaseEntity);
  });
});
