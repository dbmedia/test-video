define('ttexp/tests/adapters/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | adapters/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass jshint.');
  });
});
define('ttexp/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('ttexp/tests/authenticators/oauth2.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | authenticators/oauth2.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'authenticators/oauth2.js should pass jshint.');
  });
});
define('ttexp/tests/authorizers/oauth2.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | authorizers/oauth2.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'authorizers/oauth2.js should pass jshint.');
  });
});
define('ttexp/tests/controllers/action.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/action.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/action.js should pass jshint.');
  });
});
define('ttexp/tests/controllers/help.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/help.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/help.js should pass jshint.');
  });
});
define('ttexp/tests/controllers/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/index.js should pass jshint.');
  });
});
define('ttexp/tests/controllers/login.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/login.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/login.js should pass jshint.');
  });
});
define('ttexp/tests/controllers/page-not-found.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/page-not-found.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/page-not-found.js should pass jshint.');
  });
});
define('ttexp/tests/controllers/play.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/play.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/play.js should pass jshint.');
  });
});
define('ttexp/tests/controllers/scenarios.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/scenarios.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/scenarios.js should pass jshint.');
  });
});
define('ttexp/tests/controllers/scores.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/scores.js');
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

  QUnit.module('JSHint | helpers/resolver.js');
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

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('ttexp/tests/initializers/cordova.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | initializers/cordova.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'initializers/cordova.js should pass jshint.');
  });
});
define('ttexp/tests/models/action.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/action.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/action.js should pass jshint.');
  });
});
define('ttexp/tests/models/item.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/item.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/item.js should pass jshint.');
  });
});
define('ttexp/tests/models/play-state.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/play-state.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/play-state.js should pass jshint.\nmodels/play-state.js: line 10, col 18, \'Ember\' is not defined.\n\n1 error');
  });
});
define('ttexp/tests/models/playthrough.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/playthrough.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/playthrough.js should pass jshint.');
  });
});
define('ttexp/tests/models/scenario.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/scenario.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/scenario.js should pass jshint.');
  });
});
define('ttexp/tests/models/score.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/score.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/score.js should pass jshint.\nmodels/score.js: line 13, col 12, \'Ember\' is not defined.\nmodels/score.js: line 32, col 9, \'Ember\' is not defined.\nmodels/score.js: line 48, col 14, \'Ember\' is not defined.\n\n3 errors');
  });
});
define('ttexp/tests/models/tank.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/tank.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/tank.js should pass jshint.');
  });
});
define('ttexp/tests/models/user.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/user.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/user.js should pass jshint.');
  });
});
define('ttexp/tests/models/video.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/video.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/video.js should pass jshint.\nmodels/video.js: line 12, col 13, \'Ember\' is not defined.\n\n1 error');
  });
});
define('ttexp/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('ttexp/tests/routes/action.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/action.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/action.js should pass jshint.\nroutes/action.js: line 10, col 21, \'transition\' is defined but never used.\nroutes/action.js: line 19, col 9, \'params\' is defined but never used.\nroutes/action.js: line 2, col 8, \'ENV\' is defined but never used.\n\n3 errors');
  });
});
define('ttexp/tests/routes/admin/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/admin/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin/index.js should pass jshint.');
  });
});
define('ttexp/tests/routes/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass jshint.');
  });
});
define('ttexp/tests/routes/help.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/help.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/help.js should pass jshint.');
  });
});
define('ttexp/tests/routes/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/index.js should pass jshint.\nroutes/index.js: line 6, col 9, \'params\' is defined but never used.\nroutes/index.js: line 2, col 8, \'ENV\' is defined but never used.\n\n2 errors');
  });
});
define('ttexp/tests/routes/page-not-found.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/page-not-found.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/page-not-found.js should pass jshint.');
  });
});
define('ttexp/tests/routes/play.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/play.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/play.js should pass jshint.\nroutes/play.js: line 13, col 9, \'self\' is defined but never used.\nroutes/play.js: line 17, col 11, \'playthrough\' is defined but never used.\nroutes/play.js: line 18, col 11, \'video\' is defined but never used.\nroutes/play.js: line 12, col 21, \'transition\' is defined but never used.\nroutes/play.js: line 61, col 10, \'item\' is defined but never used.\nroutes/play.js: line 57, col 7, \'$\' is not defined.\nroutes/play.js: line 2, col 8, \'ENV\' is defined but never used.\n\n7 errors');
  });
});
define('ttexp/tests/routes/scenarios.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/scenarios.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/scenarios.js should pass jshint.\nroutes/scenarios.js: line 6, col 9, \'params\' is defined but never used.\nroutes/scenarios.js: line 11, col 11, \'self\' is defined but never used.\nroutes/scenarios.js: line 18, col 13, \'fileTransfer\' is defined but never used.\nroutes/scenarios.js: line 20, col 13, \'fileName\' is defined but never used.\nroutes/scenarios.js: line 21, col 13, \'fileFullpath\' is defined but never used.\nroutes/scenarios.js: line 18, col 32, \'FileTransfer\' is not defined.\nroutes/scenarios.js: line 21, col 34, \'$fileName\' is not defined.\nroutes/scenarios.js: line 2, col 8, \'ENV\' is defined but never used.\n\n8 errors');
  });
});
define('ttexp/tests/routes/scores.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/scores.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/scores.js should pass jshint.\nroutes/scores.js: line 2, col 8, \'ENV\' is defined but never used.\n\n1 error');
  });
});
define('ttexp/tests/services/session.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | services/session.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/session.js should pass jshint.');
  });
});
define('ttexp/tests/test-helper', ['exports', 'ttexp/tests/helpers/resolver', 'ember-qunit'], function (exports, _ttexpTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_ttexpTestsHelpersResolver['default']);
});
define('ttexp/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('ttexp/tests/unit/adapters/scenario-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('adapter:scenario', 'Unit | Adapter | scenario', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('ttexp/tests/unit/adapters/scenario-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/adapters/scenario-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/scenario-test.js should pass jshint.');
  });
});
define('ttexp/tests/unit/controllers/scenario-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:scenario', 'Unit | Controller | scenario', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ttexp/tests/unit/controllers/scenario-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/scenario-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/scenario-test.js should pass jshint.');
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

  QUnit.module('JSHint | unit/initializers/cordova-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/initializers/cordova-test.js should pass jshint.');
  });
});
define('ttexp/tests/unit/models/action-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('action', 'Unit | Model | action', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('ttexp/tests/unit/models/action-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/action-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/action-test.js should pass jshint.');
  });
});
define('ttexp/tests/unit/models/item-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('item', 'Unit | Model | item', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('ttexp/tests/unit/models/item-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/item-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/item-test.js should pass jshint.');
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

  QUnit.module('JSHint | unit/models/pippo-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/pippo-test.js should pass jshint.');
  });
});
define('ttexp/tests/unit/models/play-state-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('play-state', 'Unit | Model | play state', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('ttexp/tests/unit/models/play-state-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/play-state-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/play-state-test.js should pass jshint.');
  });
});
define('ttexp/tests/unit/models/playthrough-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('playthrough', 'Unit | Model | playthrough', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('ttexp/tests/unit/models/playthrough-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/playthrough-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/playthrough-test.js should pass jshint.');
  });
});
define('ttexp/tests/unit/models/scenario-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('scenario', 'Unit | Model | scenario', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('ttexp/tests/unit/models/scenario-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/scenario-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/scenario-test.js should pass jshint.');
  });
});
define('ttexp/tests/unit/models/tank-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('tank', 'Unit | Model | tank', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('ttexp/tests/unit/models/tank-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/tank-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/tank-test.js should pass jshint.');
  });
});
define('ttexp/tests/unit/models/user-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('user', 'Unit | Model | user', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('ttexp/tests/unit/models/user-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/user-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/user-test.js should pass jshint.');
  });
});
define('ttexp/tests/unit/models/video-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('video', 'Unit | Model | video', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('ttexp/tests/unit/models/video-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/video-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/video-test.js should pass jshint.');
  });
});
define('ttexp/tests/unit/services/session-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('service:session', 'Unit | Service | session', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('ttexp/tests/unit/services/session-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/services/session-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/session-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('ttexp/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map