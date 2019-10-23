import customElementsAPIService from './custom-elements-api';

describe('Custom Elements API Service', () => {
  it('should get custom elements API', () => {
    expect(customElementsAPIService.get()).toEqual(window.customElements);
  });
});
