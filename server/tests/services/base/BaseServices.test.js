import BaseServices from '../../../dist/services/base/BaseServices.js';

describe('Base Services', () => {
  it('should be a class', () => {
    expect(BaseServices).to.be.a('class');
  });

  it('should have a constructor', () => {
    expect(BaseServices).to.have.property('constructor');
  });

  it('should have a constructor that takes 1 argument', () => {
    expect(BaseServices).to.have.lengthOf(1);
  });

  it("should have a 'repository' property", () => {
    expect(BaseServices).to.have.property('repository');
  });

  it("should have a 'find' method", () => {
    expect(BaseServices).to.have.property('find');
  });

  it("should have a 'findBy' method", () => {
    expect(BaseServices).to.have.property('findBy');
  });

  it("should have a 'findById' method", () => {
    expect(BaseServices).to.have.property('findById');
  });

  it("should have a 'create' method", () => {
    expect(BaseServices).to.have.property('create');
  });

  it("should have a 'update' method", () => {
    expect(BaseServices).to.have.property('update');
  });

  it("should have a 'delete' method", () => {
    expect(BaseServices).to.have.property('delete');
  });
});
