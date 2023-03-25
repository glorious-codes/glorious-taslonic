# Taslonic React
> Glorious components for React.

## Usage

To get started with Taslonic in your React project, please refer to the [instructions](https://taslonic.com/react) found on the Taslonic's Official Website.

## Contributing

**IMPORTANT**: Run the following commands from repository root.

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

5. In one terminal tab run:
``` bash
npm run build -w=packages/react -- --watch
```

6. In another run:
``` bash
npm run start
```

Docs will be running on `http://localhost:7000`.

## Tests

1. Ensure that all code that you have added is covered with unit tests:
``` bash
npm run test -w=packages/react
```

2. You can optionally generate coverage report after running tests:
``` bash
npm run test -w=packages/react -- --coverage
```
