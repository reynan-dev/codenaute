import Session from '../../dist/entities/Session.js';

describe('Session Entity', () => {
  it('should be a class', () => {
    expect(Session).to.be.a('class');
  });

  it("should be extended from 'BaseEntity' class", () => {
    expect(Member.prototype).to.be.an.instanceOf(BaseEntity);
  });

  it("should have a 'token' property", () => {
    expect(Session).to.have.property('token');
  });

  it("should have a 'member' property", () => {
    expect(Session).to.have.property('member');
  });

  it("should have a 'createdAt' property", () => {
    expect(Session).to.have.property('createdAt');
  });

  it("should have a 'expiresAt' property", () => {
    expect(Session).to.have.property('expiresAt');
  });

  it('should have a constructor', () => {
    expect(Session).to.have.property('constructor');
  });

  it('should have a constructor that takes 1 argument', () => {
    expect(Session).to.have.lengthOf(1);
  });
});
