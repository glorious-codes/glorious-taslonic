import slotService from './slot';

describe('Slot Service', () => {
  it('should write slot content', () => {
    const template = '<div>{ slot }</div>';
    const content = '<p>Hello!</p>';
    const html = slotService.write(template, content);
    expect(html).toEqual('<div><p>Hello!</p></div>');
  });
});
