const { BaseEntity } = require('typeorm');
const Member = require('../../dist/entities/Member.js');

describe.skip('Member Entity', () => {
  it('should be a class', () => {
    expect(Member).toBeInstanceOf(Member);
  });

  it("should be extended from 'BaseEntity' class", () => {
    expect(Member.prototype).toBeInstanceOf(BaseEntity);
  });
});
