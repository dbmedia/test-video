define('ttexp/tests/adapters/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - adapters/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass jshint.');
  });
});
define('ttexp/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('ttexp/tests/authenticators/oauth2.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - authenticators/oauth2.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'authenticators/oauth2.js should pass jshint.');
  });
});
define('ttexp/tests/authorizers/oauth2.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - authorizers/oauth2.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'authorizers/oauth2.js should pass jshint.');
  });
});
define('ttexp/tests/controllers/help.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/help.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/help.js should pass jshint.');
  });
});
define('ttexp/tests/controllers/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/index.js should pass jshint.');
  });
});
define('ttexp/tests/controllers/login.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/login.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/login.js should pass jshint.');
  });
});
define('ttexp/tests/controllers/page-not-found.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/page-not-found.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/page-not-found.js should pass jshint.');
  });
});
define('ttexp/tests/controllers/play.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/play.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/play.js should pass jshint.');
  });
});
define('ttexp/tests/controllers/scores.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/scores.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/scores.js should pass jshint.');
  });
});
define('ttexp/tests/helpers/ember-simple-auth', ['exports', 'ember-simple-auth/authenticators/test'], function (exports, _emberSimpleAuthAuthenticatorsTest) {
  exports.authenticateSession = authenticateSession;
  exports.currentSession = currentSession;
  exports.invalidateSession = invalidateSession;

  var TEST_CONTAINER_KEY = 'authenticator:test';

  function ensureAuthenticator(app, container) {
    var authenticator = container.lookup(TEST_CONTAINER_KEY);
    if (!authenticator) {
      app.register(TEST_CONTAINER_KEY, _emberSimpleAuthAuthenticatorsTest['default']);
    }
  }

  function authenticateSession(app, sessionData) {
    var container = app.__container__;

    var session = container.lookup('service:session');
    ensureAuthenticator(app, container);
    session.authenticate(TEST_CONTAINER_KEY, sessionData);
    return wait();
  }

  ;

  function currentSession(app) {
    return app.__container__.lookup('service:session');
  }

  ;

  function invalidateSession(app) {
    var session = app.__container__.lookup('service:session');
    if (session.get('isAuthenticated')) {
      session.invalidate();
    }
    return wait();
  }

  ;
});
define('ttexp/tests/helpers/resolver', ['exports', 'ember/resolver', 'ttexp/config/environment'], function (exports, _emberResolver, _ttexpConfigEnvironment) {

  var resolver = _emberResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _ttexpConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _ttexpConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('ttexp/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('ttexp/tests/helpers/start-app', ['exports', 'ember', 'ttexp/app', 'ttexp/config/environment'], function (exports, _ember, _ttexpApp, _ttexpConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application;

    var attributes = _ember['default'].merge({}, _ttexpConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _ttexpApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('ttexp/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('ttexp/tests/initializers/cordova.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - initializers/cordova.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'initializers/cordova.js should pass jshint.');
  });
});
define('ttexp/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('ttexp/tests/routes/admin/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/admin/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin/index.js should pass jshint.');
  });
});
define('ttexp/tests/routes/admin/scenario.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/admin/scenario.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin/scenario.js should pass jshint.');
  });
});
define('ttexp/tests/routes/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass jshint.');
  });
});
define('ttexp/tests/routes/help.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/help.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/help.js should pass jshint.');
  });
});
define('ttexp/tests/routes/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass jshint.');
  });
});
define('ttexp/tests/routes/page-not-found.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/page-not-found.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/page-not-found.js should pass jshint.');
  });
});
define('ttexp/tests/routes/play.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/play.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/play.js should pass jshint.\nroutes/play.js: line 2, col 8, \'AuthenticatedRouteMixin\' is defined but never used.\n\n1 error');
  });
});
define('ttexp/tests/routes/scores.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/scores.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/scores.js should pass jshint.');
  });
});
define('ttexp/tests/test-helper', ['exports', 'ttexp/tests/helpers/resolver', 'ember-qunit'], function (exports, _ttexpTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_ttexpTestsHelpersResolver['default']);
});
define('ttexp/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('ttexp/tests/unit/initializers/cordova-test', ['exports', 'ember', 'ttexp/initializers/cordova', 'qunit'], function (exports, _ember, _ttexpInitializersCordova, _qunit) {

  var application = undefined;

  (0, _qunit.module)('Unit | Initializer | cordova', {
    beforeEach: function beforeEach() {
      _ember['default'].run(function () {
        application = _ember['default'].Application.create();
        application.deferReadiness();
      });
    }
  });

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    _ttexpInitializersCordova['default'].initialize(application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});
define('ttexp/tests/unit/initializers/cordova-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/initializers/cordova-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/initializers/cordova-test.js should pass jshint.');
  });
});
define('ttexp/tests/unit/models/pippo-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('pippo', 'Unit | Model | pippo', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('ttexp/tests/unit/models/pippo-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/pippo-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/pippo-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('ttexp/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map