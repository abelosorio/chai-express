export default () => {
  it('should assert correctly that a route exists', () => {
    expect(router).to.have.route('get', /^\/users\/?$/i);
  });

  it('should assert correctly that a route doesn\'t exists', () => {
    expect(router).to.not.have.route('get', /^\/users_1\/?$/i);
    expect(router).to.not.have.route('put', /^\/users\/?$/i);
  });
};
