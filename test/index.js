import chaiExpress from '../src';

describe('chai-express', () => {
  it('should export a function', () => {
    expect(chaiExpress).to.be.a('function');
  });
});
