export default () => {
  let router;

  before('Initialize', () => {
    router = initializeApp().router;
  });

  it('should assert correctly that a route exists', () => {
    expect(router).to.have.route('get', /^\/users\/?$/i);
  });

  it('should assert correctly that a route doesn\'t exists', () => {
    expect(router).to.not.have.route('get', /^\/users_1\/?$/i);
    expect(router).to.not.have.route('put', /^\/users\/?$/i);
  });

  it('should assert router accepts provided route', () => {
    expect(router).to.acceptRoute('get', '/api/v1/lookup-by-id/1');
  });

  it('should assert router do not accepts provided route', () => {
    expect(router).to.not.acceptRoute('get', '/api/v1/lookup-by-id/');
    expect(router).to.not.acceptRoute('put', '/api/v1/lookup-by-id/1');
  });
};
