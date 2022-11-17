import { BaseEntity } from 'typeorm';
import Member from '../../dist/entities/Member.js';

describe('Member Entity', () => {
  it('should be a class', () => {
    expect(Member).to.be.a('class');
  });

  it("should have a 'username' property", () => {
    expect(Member).to.have.property('username');
  });

  it("should have a 'email' property", () => {
    expect(Member).to.have.property('email');
  });

  it("should have a 'hashedPassword' property", () => {
    expect(Member).to.have.property('password');
  });

  it("should be extended from 'BaseEntity' class", () => {
    expect(Member.prototype).to.be.an.instanceOf(BaseEntity);
  });
});
