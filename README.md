# react-easter

Easily add Easter eggs to your React app


[![Build Status](https://travis-ci.org/devlato/react-easter.svg?branch=master)](https://travis-ci.org/devlato/react-easter)
[![Coverage Status](https://coveralls.io/repos/github/devlato/react-easter/badge.svg?branch=master)](https://coveralls.io/github/devlato/react-easter?branch=master)
[![Code Climate](https://codeclimate.com/github/devlato/react-easter/badges/gpa.svg)](https://codeclimate.com/github/devlato/react-easter)
[![Issue Count](https://codeclimate.com/github/devlato/react-easter/badges/issue_count.svg)](https://codeclimate.com/github/devlato/react-easter)
[![npm version](https://badge.fury.io/js/react-easter.svg)](https://badge.fury.io/js/react-easter)


## Installation

With npm:

```sh
$ npm install --save-dev react-easter
```

Or with Yarn:

```sh
$ yarn add react-easter
```


## Usage

The usage is very simple, there is just a couple of props to pass.

```jsx
const EasterEgg = require('react-easter');

// ...

render() {
  return (
    <EasterEgg
        keys={/* Array of keys to type to trigger the easter egg */}
        simultaneous={/* Add this prop if keys should be pressed all together */}
        timeout={/* Duration to show your easter egg, easter egg is displayed forever if prop is not set */}>
      {/* Your easter egg JSX goes here */}
    </EasterEgg>
  );
}
```

You can add `react-easter` anywhere in your component hierarchy, because it adds a global
keyboard events listener and doesn't stops any event bubbling.

For example:

```jsx
const EasterEgg = require('react-easter');


export default class YourComponent extends React.Component {
  render() {
    const konamiCode = [
      'arrowup',
      'arrowup',
      'arrowdown',
      'arrowdown',
      'arrowleft',
      'arrowright',
      'arrowleft',
      'arrowright',
      'b',
      'a',
      'enter'
    ];

    return (
      <EasterEgg keys={konamiCode}
                 timeout={5000}>
        <div class="overlay">
          <iframe class="sexy-nude-geek-girls-playing-mario"
                  src="https://www.youtube.com/embed/DLzxrzFCyOs?autoplay=1"
                  frameborder="0"
                  allowfullscreen />
        </div>
      </EasterEgg>
    );
  }
}
```


## Props

* `keys` – Just array of string representing each button to be pressed;
* `simultaneous` – Set this prop if user should press buttons all together;
* `timeout` – Amount of time in milliseconds while easter egg is displayed.


## Supported keys

All alphabetic letters and numbers could be passed as is, i.e. letter "a" is just "a".

If you use `simultaneous` mode and you have the `Shift` button in your hotkey combination,
please set the unmodified buttons.

For example, to have a `Shift+!` hotkey, you should pass `keys={["shift", "1"]}`,
because "Shift" and "1" pressed together produce "!".


## Dependencies

Project uses [react-shortcut](https://www.npmjs.com/package/react-shortcut) to handle keyboard shortcuts.


## Test coverage

Library has ~100% test coverage:

```sh
$ npm run test:coverage

> react-easter@1.0.0 test:coverage ~/projects/react-easter
> NODE_ENV=test jest --coverage --no-cache --config .jestrc

 PASS  test/Component.js
  <EasterEgg />
    ✓ Should render (16ms)
    ✓ Should handle keys sequently without timeout (1032ms)
    ✓ Should handle keys sequently with timeout (1011ms)

--------------|----------|----------|----------|----------|----------------|
File          |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
--------------|----------|----------|----------|----------|----------------|
All files     |      100 |    77.78 |      100 |      100 |                |
 Component.js |      100 |    77.78 |      100 |      100 |                |
--------------|----------|----------|----------|----------|----------------|
Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        3.831s
Ran all test suites.
```


## Code style

Library is 100% compatible with [airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) for ES5.


## Available commands

Library has the following commands available:

* Run the tests:

  ```
  $ npm test
  ```

* Run the tests and display test coverage:

  ```
  $ npm run test:coverage
  ```

* Run the linter:

  ```
  $ npm run lint
  ```

## Build

No building required, library is implemented with ES5 React syntax for better compatibility and shipped as is.


## License

Library is shipped "as is" under MIT License.


## Contributing

Feel free to contribute but don't forget to test everything properly.


[![NPM](https://nodei.co/npm/react-easter.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-easter/)
