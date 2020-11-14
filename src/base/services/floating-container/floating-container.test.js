import floatingContainerService from './floating-container';

describe('Floating Container Service', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should build a base css class according given id', () => {
    const id = 'toaster';
    const container = floatingContainerService.build(id);
    expect(container.getAttribute('class')).toEqual('t-toaster');
  });

  it('should append no more than one container on body', () => {
    const id = 'toaster';
    floatingContainerService.build(id);
    floatingContainerService.build(id);
    expect(document.querySelectorAll('[data-toaster]').length).toEqual(1);
  });
});
