import React from 'react';
import componentBuilder from './component';

describe('Component Builder', () => {
  function buildContainer(){
    return document.createElement('div');
  }

  it('should build a component', done => {
    const container = buildContainer();
    componentBuilder.build(
      <p>Hello!</p>,
      container,
      () => {
        expect(container.querySelector('p').innerHTML).toEqual('Hello!');
        done();
      }
    );
  });

  it('should destroyed a built component', done => {
    const container = buildContainer();
    componentBuilder.build(
      <p>Hello!</p>,
      container,
      () => {
        expect(componentBuilder.destroy(container)).toEqual(true);
        done();
      }
    );
  });
});
