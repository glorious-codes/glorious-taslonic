import * as components from '@vue/components';
import plugin from './plugin';

describe('Plugin', () => {
  it('should register vue components on install', () => {
    const VueMock = { component: jest.fn() };
    plugin.install(VueMock);
    Object.keys(components).forEach(key => {
      const component = components[key];
      expect(VueMock.component).toHaveBeenCalledWith(component.name, component);
    });
  });
});
