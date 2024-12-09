var React = require('react');
var enzyme = require('enzyme');
var sinon = require('sinon');
var Promise = require('bluebird');

var Component = require('../src/Component');

var mount = enzyme.mount;

function Page(wrapper) {
  this.wrapper = function() {
    return wrapper;
  };

  this.child = function() {
    return wrapper.find('.test-overlay');
  };
};


function createChild() {
  return React.createElement('div', {
    className: 'test-overlay'
  }, null);
}


function createComponent(props, children) {
  var componentProps = props || {};
  var componentChildren = children || null;

  var component = React.createElement(Component, componentProps, componentChildren);
  var wrapper = mount(component);
  var page = new Page(wrapper);

  return {
    page: page,
    wrapper: wrapper
  };
}


describe('<EasterEgg />', function() {
  beforeEach(function() {
    // jest.spyOn(Component.prototype, 'setState');
    jest.spyOn(Component.prototype, 'componentDidMount');
    // jest.spyOn(Component.prototype, 'componentWillUnmount');
  });


  afterEach(function() {
    // Component.prototype.setState.mockReset();
    // Component.prototype.setState.mockRestore();

    Component.prototype.componentDidMount.mockReset();
    Component.prototype.componentDidMount.mockRestore();

    // Component.prototype.componentWillUnmount.mockReset();
    // Component.prototype.componentWillUnmount.mockRestore();
  });


  it('Should render', function() {
    createComponent();

    expect(Component.prototype.componentDidMount).toHaveBeenCalledTimes(1);
  });


  it('Should handle keys sequently without timeout', function() {
    var child = createChild();
    var created = createComponent({
      keys: ['t', 'e', 's', 't']
    }, child);

    var wrapper = created.wrapper;
    var page = created.page;

    return new Promise(function(resolveAll) {
      return new Promise(function(resolve) {
        expect(page.wrapper().contains(child)).toEqual(false);

        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 't'}));
        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'e'}));
        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 's'}));
        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 't'}));

        setTimeout(function() {
          resolve();
        }, 500);
      }).then(function() {
        expect(page.wrapper().contains(child)).toEqual(true);
        setTimeout(function() {
          resolveAll();
        }, 500);
      });
    }).then(function() {
      expect(page.wrapper().contains(child)).toEqual(true);
    });
  });


  it('Should handle keys sequently with timeout', function() {
    var child = createChild();
    var created = createComponent({
      keys: ['t', 'e', 's', 't'],
      timeout: 300
    }, child);

    var wrapper = created.wrapper;
    var page = created.page;

    return new Promise(function(resolve) {
      expect(page.wrapper().contains(child)).toEqual(false);

      document.dispatchEvent(new KeyboardEvent('keydown', {'key': 't'}));
      document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'e'}));
      document.dispatchEvent(new KeyboardEvent('keydown', {'key': 's'}));
      document.dispatchEvent(new KeyboardEvent('keydown', {'key': 't'}));

      expect(page.wrapper().contains(child)).toEqual(true);

      setTimeout(function() {
        resolve();
      }, 1000);
    }).then(function() {
      expect(page.wrapper().contains(child)).toEqual(false);
    });
  });

  it('Should fire callback when keys are correct', function() {
    var handleKeysCoincide = sinon.stub();

    var child = createChild();
    var created = createComponent({
      keys: ['t', 'e', 's', 't'],
      onKeysCoincide: handleKeysCoincide
    }, child);

    var wrapper = created.wrapper;
    var page = created.page;

    return new Promise(function(resolveAll) {
      return new Promise(function(resolve) {
        expect(page.wrapper().contains(child)).toEqual(false);

        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 't'}));
        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'e'}));
        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 's'}));
        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 't'}));

        setTimeout(function() {
          resolve();
        }, 500);
      }).then(function() {
        expect(page.wrapper().contains(child)).toEqual(true);
        expect(handleKeysCoincide.callCount).toEqual(1);
        setTimeout(function() {
          resolveAll();
        }, 500);
      });
    }).then(function() {
      expect(page.wrapper().contains(child)).toEqual(true);
    });
  });

  it('Should fire callback when timer runs out', function() {
    var handleTimeout = sinon.stub();

    var child = createChild();
    var created = createComponent({
      keys: ['t', 'e', 's', 't'],
      timeout: 300,
      onTimeout: handleTimeout
    }, child);

    var wrapper = created.wrapper;
    var page = created.page;

    return new Promise(function(resolve) {
      expect(page.wrapper().contains(child)).toEqual(false);

      document.dispatchEvent(new KeyboardEvent('keydown', {'key': 't'}));
      document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'e'}));
      document.dispatchEvent(new KeyboardEvent('keydown', {'key': 's'}));
      document.dispatchEvent(new KeyboardEvent('keydown', {'key': 't'}));

      expect(page.wrapper().contains(child)).toEqual(true);

      setTimeout(function() {
        resolve();
      }, 1000);
    }).then(function() {
      expect(handleTimeout.callCount).toEqual(1);
      expect(page.wrapper().contains(child)).toEqual(false);
    });
  });
});
