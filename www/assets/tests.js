define('ttexp/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('app.js should pass jshint', function (assert) {
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('ttexp/tests/controllers/help.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/help.js should pass jshint', function (assert) {
    assert.ok(true, 'controllers/help.js should pass jshint.');
  });
});
define('ttexp/tests/controllers/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/index.js should pass jshint', function (assert) {
    assert.ok(true, 'controllers/index.js should pass jshint.');
  });
});
define('ttexp/tests/controllers/page-not-found.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/page-not-found.js should pass jshint', function (assert) {
    assert.ok(true, 'controllers/page-not-found.js should pass jshint.');
  });
});
define('ttexp/tests/controllers/play.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/play.js should pass jshint', function (assert) {
    assert.ok(true, 'controllers/play.js should pass jshint.');
  });
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

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/resolver.js should pass jshint', function (assert) {
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

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/start-app.js should pass jshint', function (assert) {
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('ttexp/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('router.js should pass jshint', function (assert) {
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('ttexp/tests/routes/help.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/help.js should pass jshint', function (assert) {
    assert.ok(true, 'routes/help.js should pass jshint.');
  });
});
define('ttexp/tests/routes/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/index.js should pass jshint', function (assert) {
    assert.ok(true, 'routes/index.js should pass jshint.');
  });
});
define('ttexp/tests/routes/page-not-found.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/page-not-found.js should pass jshint', function (assert) {
    assert.ok(true, 'routes/page-not-found.js should pass jshint.');
  });
});
define('ttexp/tests/routes/play.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/play.js should pass jshint', function (assert) {
    assert.ok(true, 'routes/play.js should pass jshint.');
  });
});
define('ttexp/tests/test-helper', ['exports', 'ttexp/tests/helpers/resolver', 'ember-qunit'], function (exports, _ttexpTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_ttexpTestsHelpersResolver['default']);
});
define('ttexp/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('test-helper.js should pass jshint', function (assert) {
    assert.ok(true, 'test-helper.js should pass jshint.');
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

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/pippo-test.js should pass jshint', function (assert) {
    assert.ok(true, 'unit/models/pippo-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('ttexp/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map