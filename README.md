# [WIP] Taslonic
> A very experimental UI library built on top of native custom elements

[![CircleCI](https://circleci.com/gh/glorious-codes/glorious-taslonic.svg?style=svg)](https://circleci.com/gh/glorious-codes/glorious-taslonic)
[![Coverage Status](https://coveralls.io/repos/github/glorious-codes/glorious-taslonic/badge.svg)](https://coveralls.io/github/glorious-codes/glorious-taslonic)

## Early definitions

1. Taslonic aims to be an easy to use UI library on top of the latest advances of Web Components specification.
2. The master goal is delivering a set of components that can be used for any SPA framework/library.
3. Different from famous libraries like Bootstrap, we'll focus on very few components. Although few in quantity, we're going to tackle components that have a lot of potencial to save development time like forms and data-grids.

## Suggested set of components

- row
- col
- loader
- alert
- button
- input
- email input
- field
- fieldset
- confirm
- dialog
- form
- data-grid

## Contributing

1. Install [Node](https://nodejs.org/en/). Download the "Recommend for Most Users" version.

2. Clone the repo:
``` bash
git clone git@github.com:glorious-codes/glorious-taslonic.git
```

3. Go to the project directory
``` bash
cd glorious-taslonic
```

4. Install the project dependencies
``` bash
npm install
```

5. In one terminal tab, run:
```
npm run build -- --watch
```

6. In another one, run:
``` bash
npm run start
```

Documentation will be running on `http://localhost:5000` and the browser will automatically reload with the changes you make in any source file.

## Tests

1. Ensure that all code that you have added is covered with unit tests:
``` bash
npm run test -- --coverage
```

## References

### W3C Custom Element Spec
- https://w3c.github.io/webcomponents/spec/custom/

### Web Components
- https://www.webcomponents.org/
- https://open-wc.org/
- https://developer.mozilla.org/en-US/docs/Web/Web_Components
- https://en.wikipedia.org/wiki/Web_Components

### Lifecycle Callbacks
- https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks

### Libraries
- https://github.com/ionic-team/ionic/tree/master/core
- http://slimjs.com/#/data-binding
- https://stenciljs.com/
- https://capacitor.ionicframework.com/
- https://x-tag.github.io/

### Articles
- https://css-tricks.com/modular-future-web-components/
- https://www.smashingmagazine.com/2016/12/styling-web-components-using-a-shared-style-sheet/

## Troubleshooting

- Failed to construct 'HTMLElement':
  - https://github.com/github/babel-plugin-transform-custom-element-classes
