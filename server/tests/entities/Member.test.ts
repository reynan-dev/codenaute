import { BaseEntity } from 'typeorm';
import Member from '../../dist/entities/Member.js';

describe.skip('Member Entity', () => {
  it('should be a class', () => {
    expect(Member).toBeInstanceOf(Member);
  });

  it("should be extended from 'BaseEntity' class", () => {
    expect(Member.prototype).toBeInstanceOf(BaseEntity);
  });
});
