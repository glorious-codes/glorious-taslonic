import componentBuilder from './component';

describe('Component Builder', () => {
  it('should render a component with no controller', () => {
    const component = { template: '<p>Hello!</p>' };
    const { element } = componentBuilder.build(component);
    expect(element.innerHTML).toEqual('Hello!');
  });

  it('should render a component containing a controller', () => {
    const name = 'Taslonic';
    window.alert = jest.fn();
    const component = {
      controller: {
        data(){
          return {
            name
          };
        },
        methods: {
          greet(){
            window.alert(this.name);
          }
        }
      },
      template: '<button @click="greet">Greet</button>'
    };
    const { element } = componentBuilder.build(component);
    element.click();
    expect(window.alert).toHaveBeenCalledWith(name);
  });
});
