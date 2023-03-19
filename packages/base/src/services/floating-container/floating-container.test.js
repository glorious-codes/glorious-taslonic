import floatingContainerService from './floating-container';

describe('Floating Container Service', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should build a base css class according given id', () => {
    const container = floatingContainerService.build();
    expect(container.getAttribute('class')).toEqual('t-floating-container');
  });

  it('should append no more than one container on body', () => {
    floatingContainerService.build();
    floatingContainerService.build();
    expect(document.querySelectorAll('[data-floating-container]').length).toEqual(1);
  });
});
