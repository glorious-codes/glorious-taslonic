import testService from './test';

describe('Test Service', () => {
  function ComponentMockInstance(){
    this.connectedCallback = jest.fn();
    this.innerHTML = '';
  }

  function mockComponent(instance){
    return jest.fn(() => instance);
  }

  it('should mount a component', () => {
    const instante = new ComponentMockInstance();
    const element = testService.mount(mockComponent(instante));
    expect(instante.connectedCallback).toHaveBeenCalled();
    expect(element).toEqual(instante);
  });

  it('should mount a component passing attributes', () => {
    const instante = new ComponentMockInstance();
    const attributes = { theme: 'primary' };
    const element = testService.mount(mockComponent(instante), { attributes });
    expect(element.getAttribute('theme')).toEqual('primary');
  });

  it('should mount a component passing some content', () => {
    const instante = new ComponentMockInstance();
    const content = '<p>Hello!</p>';
    const element = testService.mount(mockComponent(instante), { content });
    expect(element.innerHTML).toEqual(content);
  });
});
