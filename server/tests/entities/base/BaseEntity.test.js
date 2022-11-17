import BaseEntity from '../../../dist/entities/base/BaseEntity.js';

describe('Base Entity', () => {
  it('should be a class', () => {
    expect(BaseEntity).to.be.a('class');
  });

  it("should be extended from 'BaseEntity' class", () => {
    expect(Member.prototype).to.be.an.instanceOf(BaseEntity);
  });

  it("should have a 'id' property", () => {
    expect(BaseEntity).to.have.property('id');
  });

  it("should have a 'createdAt' property", () => {
    expect(BaseEntity).to.have.property('createdAt');
  });

  it("should have a 'updatedAt' property", () => {
    expect(BaseEntity).to.have.property('updatedAt');
  });

  it("should have a 'deletedAt' property", () => {
    expect(BaseEntity).to.have.property('deletedAt');
  });
});
