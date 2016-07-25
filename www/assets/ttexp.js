"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('ttexp/adapters/application', ['exports', 'ember-data', 'ttexp/config/environment', 'ember-simple-auth/mixins/data-adapter-mixin'], function (exports, _emberData, _ttexpConfigEnvironment, _emberSimpleAuthMixinsDataAdapterMixin) {
	exports['default'] = _emberData['default'].JSONAPIAdapter.extend(_emberSimpleAuthMixinsDataAdapterMixin['default'], {
		host: _ttexpConfigEnvironment['default'].APP.serverApiUrl,
		authorizer: 'authorizer:oauth2'
	});
});
define('ttexp/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'ttexp/config/environment'], function (exports, _ember, _emberResolver, _emberLoadInitializers, _ttexpConfigEnvironment) {

	var App;

	_ember['default'].MODEL_FACTORY_INJECTIONS = true;

	App = _ember['default'].Application.extend({
		modulePrefix: _ttexpConfigEnvironment['default'].modulePrefix,
		podModulePrefix: _ttexpConfigEnvironment['default'].podModulePrefix,
		Resolver: _emberResolver['default'],

		LOG_TRANSITIONS: true,
		LOG_TRANSITIONS_INTERNAL: true
	});

	(0, _emberLoadInitializers['default'])(App, _ttexpConfigEnvironment['default'].modulePrefix);

	exports['default'] = App;
});
define('ttexp/authenticators/oauth2', ['exports', 'ember-simple-auth/authenticators/oauth2-password-grant', 'ttexp/config/environment'], function (exports, _emberSimpleAuthAuthenticatorsOauth2PasswordGrant, _ttexpConfigEnvironment) {
	exports['default'] = _emberSimpleAuthAuthenticatorsOauth2PasswordGrant['default'].extend({
		serverTokenEndpoint: _ttexpConfigEnvironment['default'].APP.serverApiUrl + '/access_token',

		makeRequest: function makeRequest(url, data) {
			data.client_id = 'ttexp';
			data.client_secret = 'public';
			return this._super(url, data);
		}
	});
});
define('ttexp/authorizers/oauth2', ['exports', 'ember-simple-auth/authorizers/oauth2-bearer'], function (exports, _emberSimpleAuthAuthorizersOauth2Bearer) {
  exports['default'] = _emberSimpleAuthAuthorizersOauth2Bearer['default'].extend();
});
define('ttexp/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'ttexp/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _ttexpConfigEnvironment) {

  var name = _ttexpConfigEnvironment['default'].APP.name;
  var version = _ttexpConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('ttexp/components/cdv-nav-bar', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'header'
  });
});
define('ttexp/controllers/action', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session')
  });
});
define('ttexp/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('ttexp/controllers/help', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session')
  });
});
define('ttexp/controllers/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    firstName: 'Nome',
    lastName: 'Cognome',
    actions: {
      closeApp: function closeApp() {
        if (confirm("Vuoi davvero uscire dall'applicazione?")) {
          navigator.app.exitApp();
        }
      },
      invalidateSession: function invalidateSession() {
        this.get('session').invalidate();
      }
    }
  });

  /*
  document.addEventListener("deviceready", onDeviceReady, true);
  function onDeviceReady() {
    alert('device ready!!!');
  }
  */

  function exitFromApp() {
    navigator.app.exitApp();
  }
});
define('ttexp/controllers/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),

    actions: {
      authenticate: function authenticate() {
        var _this = this;

        var _getProperties = this.getProperties('identification', 'password');

        var identification = _getProperties.identification;
        var password = _getProperties.password;

        console.log(identification);
        console.log(password);
        this.get('session').authenticate('authenticator:oauth2', identification, password)['catch'](function (reason) {
          console.log(reason);
          _this.set('errorMessage', reason.error_description || reason.error || reason);
        });
      }
    }
  });
});
define('ttexp/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('ttexp/controllers/page-not-found', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({});
});
define('ttexp/controllers/play', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session')
  });
});
define('ttexp/controllers/scenarios', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    firstName: 'Nome',
    lastName: 'Cognome',
    actions: {
      closeApp: function closeApp() {
        if (confirm("Vuoi davvero uscire dall'applicazione?")) {
          navigator.app.exitApp();
        }
      },
      invalidateSession: function invalidateSession() {
        this.get('session').invalidate();
      }
    }
  });
});
define('ttexp/controllers/scores', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session')
  });
});
define('ttexp/helpers/add', ['exports', 'ember-math-helpers/helpers/add'], function (exports, _emberMathHelpersHelpersAdd) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersAdd['default'];
    }
  });
  Object.defineProperty(exports, 'add', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersAdd.add;
    }
  });
});
define('ttexp/helpers/ceil', ['exports', 'ember-math-helpers/helpers/ceil'], function (exports, _emberMathHelpersHelpersCeil) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersCeil['default'];
    }
  });
  Object.defineProperty(exports, 'ceil', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersCeil.ceil;
    }
  });
});
define('ttexp/helpers/div', ['exports', 'ember-math-helpers/helpers/div'], function (exports, _emberMathHelpersHelpersDiv) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersDiv['default'];
    }
  });
  Object.defineProperty(exports, 'div', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersDiv.div;
    }
  });
});
define('ttexp/helpers/floor', ['exports', 'ember-math-helpers/helpers/floor'], function (exports, _emberMathHelpersHelpersFloor) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersFloor['default'];
    }
  });
  Object.defineProperty(exports, 'floor', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersFloor.floor;
    }
  });
});
define('ttexp/helpers/max', ['exports', 'ember-math-helpers/helpers/max'], function (exports, _emberMathHelpersHelpersMax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersMax['default'];
    }
  });
  Object.defineProperty(exports, 'max', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersMax.max;
    }
  });
});
define('ttexp/helpers/min', ['exports', 'ember-math-helpers/helpers/min'], function (exports, _emberMathHelpersHelpersMin) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersMin['default'];
    }
  });
  Object.defineProperty(exports, 'min', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersMin.min;
    }
  });
});
define('ttexp/helpers/mod', ['exports', 'ember-math-helpers/helpers/mod'], function (exports, _emberMathHelpersHelpersMod) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersMod['default'];
    }
  });
  Object.defineProperty(exports, 'mod', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersMod.mod;
    }
  });
});
define('ttexp/helpers/mult', ['exports', 'ember-math-helpers/helpers/mult'], function (exports, _emberMathHelpersHelpersMult) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersMult['default'];
    }
  });
  Object.defineProperty(exports, 'mult', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersMult.mult;
    }
  });
});
define('ttexp/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('ttexp/helpers/pow', ['exports', 'ember-math-helpers/helpers/pow'], function (exports, _emberMathHelpersHelpersPow) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersPow['default'];
    }
  });
  Object.defineProperty(exports, 'pow', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersPow.pow;
    }
  });
});
define('ttexp/helpers/round', ['exports', 'ember-math-helpers/helpers/round'], function (exports, _emberMathHelpersHelpersRound) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersRound['default'];
    }
  });
  Object.defineProperty(exports, 'round', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersRound.round;
    }
  });
});
define('ttexp/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('ttexp/helpers/sqrt', ['exports', 'ember-math-helpers/helpers/sqrt'], function (exports, _emberMathHelpersHelpersSqrt) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersSqrt['default'];
    }
  });
  Object.defineProperty(exports, 'sqrt', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersSqrt.sqrt;
    }
  });
});
define('ttexp/helpers/sub', ['exports', 'ember-math-helpers/helpers/sub'], function (exports, _emberMathHelpersHelpersSub) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersSub['default'];
    }
  });
  Object.defineProperty(exports, 'sub', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersSub.sub;
    }
  });
});
define('ttexp/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ttexp/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _ttexpConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_ttexpConfigEnvironment['default'].APP.name, _ttexpConfigEnvironment['default'].APP.version)
  };
});
define('ttexp/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define("ttexp/initializers/cordova", ["exports"], function (exports) {
	exports.initialize = initialize;
	// https://github.com/poetic/ember-cli-cordova/issues/153
	// http://stackoverflow.com/questions/30790605/ember-2-0-cordova-and-ondeviceready
	// http://incorrectcode.news/question/35240/how-to-fire-deviceready-event-in-chrome-browser-trying-to-debug-phonegap-project/
	// https://gist.github.com/htulipe/44d899e56e2526a82e46

	function initialize(application) {
		// application.inject('route', 'foo', 'service:foo');

		//if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
		if (window.cordova) {
			application.deferReadiness();
			document.addEventListener("deviceready", function () {
				console.log("DEVICE READY FIRED");
				application.advanceReadiness();

				/*
    // Spostare in una variabile globale
    // http://w3foverflow.com/question/get-controller-var-from-run-schedule/
    Ember.$(function() {
    	if (navigator.userAgent.match(/(iPod|iPhone|iPad)/i)) {
    	    Ember.$('.showIOS').show();
    	}
    	if (1 || navigator.userAgent.match(/Android/i)){
    	    Ember.$('.showAndroid').show();
    	}
    });
    */

				//			cordova.plugins.Keyboard.disableScroll(true);
				//			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				//			window.addEventListener('native.keyboardshow', keyboardShowHandler);
				//			window.addEventListener('native.keyboardhide', keyboardHideHandler);

				//			StatusBar.backgroundColorByHexString('#ffffff');
				//			StatusBar.overlaysWebView(false);
				//			StatusBar.styleDefault();
				//			StatusBar.show();
			}, false);
		}
	}

	exports["default"] = {
		name: 'cordova',
		initialize: initialize
	};
});
define('ttexp/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('ttexp/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('ttexp/initializers/ember-simple-auth', ['exports', 'ember', 'ttexp/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service'], function (exports, _ember, _ttexpConfigEnvironment, _emberSimpleAuthConfiguration, _emberSimpleAuthInitializersSetupSession, _emberSimpleAuthInitializersSetupSessionService) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(registry) {
      var config = _ttexpConfigEnvironment['default']['ember-simple-auth'] || {};
      config.baseURL = _ttexpConfigEnvironment['default'].baseURL;
      _emberSimpleAuthConfiguration['default'].load(config);

      (0, _emberSimpleAuthInitializersSetupSession['default'])(registry);
      (0, _emberSimpleAuthInitializersSetupSessionService['default'])(registry);
    }
  };
});
define('ttexp/initializers/export-application-global', ['exports', 'ember', 'ttexp/config/environment'], function (exports, _ember, _ttexpConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_ttexpConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _ttexpConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_ttexpConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('ttexp/initializers/in-app-livereload', ['exports', 'ttexp/config/environment', 'ember-cli-cordova/initializers/in-app-livereload'], function (exports, _ttexpConfigEnvironment, _emberCliCordovaInitializersInAppLivereload) {

  var inAppReload = _emberCliCordovaInitializersInAppLivereload['default'].initialize;

  var initialize = function initialize(container, app) {
    if (typeof cordova === 'undefined' || _ttexpConfigEnvironment['default'].environment !== 'development' || _ttexpConfigEnvironment['default'].cordova && (!_ttexpConfigEnvironment['default'].cordova.liveReload || !_ttexpConfigEnvironment['default'].cordova.liveReload.enabled)) {
      return;
    }

    return inAppReload(container, app, _ttexpConfigEnvironment['default']);
  };

  exports.initialize = initialize;
  exports['default'] = {
    name: 'cordova:in-app-livereload',
    initialize: initialize
  };
});
/* globals cordova */
define('ttexp/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('ttexp/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('ttexp/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("ttexp/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('ttexp/instance-initializers/ember-simple-auth', ['exports', 'ember-simple-auth/instance-initializers/setup-session-restoration'], function (exports, _emberSimpleAuthInstanceInitializersSetupSessionRestoration) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(instance) {
      (0, _emberSimpleAuthInstanceInitializersSetupSessionRestoration['default'])(instance);
    }
  };
});
define('ttexp/models/action', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    playthrough: _emberData['default'].belongsTo('playthrough'),
    tank: _emberData['default'].belongsTo('tank'),
    item: _emberData['default'].belongsTo('item')
  });
});
define('ttexp/models/item', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    action: _emberData['default'].hasMany('action'),
    text: _emberData['default'].attr('string')
  });
});
define('ttexp/models/play-state', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    scenario: _emberData['default'].belongsTo('scenario'),
    playthrough: _emberData['default'].belongsTo('playthrough'),
    video: _emberData['default'].belongsTo('video'),
    prevVideo: _emberData['default'].belongsTo('video'),

    stepsCount: _emberData['default'].attr('number'),

    gameCompleted: Ember.computed('scenario', 'playthrough', 'video', function () {
      var playthrough = this.get('playthrough');
      var video = this.get('video');
      if (video.get('closing') || playthrough.get('completedAt')) {
        return true;
      } else {
        return false;
      }
    })
  });
});
define('ttexp/models/playthrough', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    user: _emberData['default'].belongsTo('user'),
    scenario: _emberData['default'].belongsTo('scenario'),
    action: _emberData['default'].hasMany('action'),
    playState: _emberData['default'].belongsTo('playState'),
    scores: _emberData['default'].hasMany('score'),

    success: _emberData['default'].attr('boolean'),
    startedAt: _emberData['default'].attr('date'),
    completedAt: _emberData['default'].attr('date')
  });
});
define('ttexp/models/scenario', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    code: _emberData['default'].attr('string'),
    name: _emberData['default'].attr('string'),
    attempts: _emberData['default'].attr('number'),

    playthroughs: _emberData['default'].hasMany('playthrough'),
    playState: _emberData['default'].belongsTo('playState')
  });
});
define('ttexp/models/score', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    playthrough: _emberData['default'].belongsTo('playthrough'),

    value: _emberData['default'].attr('number'),
    minValue: _emberData['default'].attr('number'),
    maxValue: _emberData['default'].attr('number'),
    variableId: _emberData['default'].attr('string'),
    variableCode: _emberData['default'].attr('string'),
    variableName: _emberData['default'].attr('string'),

    percent: Ember.computed('value', 'minValue', 'maxValue', function () {
      var value = this.get('value');
      var minValue = this.get('minValue');
      var maxValue = this.get('maxValue');

      var absValue = value - minValue;
      var maxAbsValue = maxValue - minValue;
      if (maxAbsValue > 0) {
        var percent = Math.round(absValue / maxAbsValue * 100);
        if (percent > 100) {
          percent = 100;
        } else if (percent < 0) {
          percent = 0;
        }
        return percent;
      } else {
        return null;
      }
    }),
    vote: Ember.computed('value', function () {
      var value = this.get('value');
      if (value == null) {
        return 'non pervenuto';
      } else if (value <= -6) {
        return 'critico';
      } else if (value <= -1) {
        return 'debole';
      } else if (value <= 2) {
        return 'medio';
      } else if (value <= 7) {
        return 'buono';
      } else {
        return 'eccellente';
      }
    }),
    voteClass: Ember.computed('value', function () {
      var value = this.get('value');
      if (value == null) {
        return 'vote-unknown';
      } else if (value <= -6) {
        return 'vote-1';
      } else if (value <= -1) {
        return 'vote-2';
      } else if (value <= 2) {
        return 'vote-3';
      } else if (value <= 7) {
        return 'vote-4';
      } else {
        return 'vote-5';
      }
    })
  });
});
define('ttexp/models/tank', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    action: _emberData['default'].hasMany('action')
  });
});
define('ttexp/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    playthroughs: _emberData['default'].hasMany('playthrough')
  });
});
define('ttexp/models/video', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    uniqueCode: _emberData['default'].attr('string'),
    scenarioCode: _emberData['default'].attr('string'),
    transcript: _emberData['default'].attr('string'),
    closing: _emberData['default'].attr('boolean'),

    items: _emberData['default'].hasMany('item'),
    playState: _emberData['default'].belongsTo('playState', { inverse: 'video' }),

    fullPath: Ember.computed('uniqueCode', 'scenarioCode', function () {
      //    return 'assets/media/video/'+this.get('scenarioCode').toLowerCase()+'/'+this.get('uniqueCode')+'.mp4';
      return this.get('scenarioCode').toLowerCase() + '/' + this.get('uniqueCode') + '.mp4';
    })
  });
});
define('ttexp/router', ['exports', 'ember', 'ttexp/config/environment'], function (exports, _ember, _ttexpConfigEnvironment) {

	var Router = _ember['default'].Router.extend({
		location: _ttexpConfigEnvironment['default'].locationType
	});

	Router.map(function () {
		this.route('index', { path: '/' });
		this.route('scenarios', { path: '/scenarios' });
		this.route('login', { path: '/login' });
		this.route('help');
		this.route('play', { path: '/play/:scenario_id' });
		this.route('action', { path: '/action/:scenario_id/:item_id' });
		this.route('scores', { path: '/scores/:playthrough_id' });
		this.route('page-not-found', { path: '/*wildcard' });
	});

	exports['default'] = Router;

	_ember['default'].Route.reopen({
		activate: function activate() {
			var cssClass = this.toCssClass();
			if (cssClass !== "application") {
				_ember['default'].$('body').addClass(cssClass);
			}
			_ember['default'].$('#main-menu a[data-page-route="' + this.routeName + '"]').addClass('active');
		},
		deactivate: function deactivate() {
			_ember['default'].$('body').removeClass(this.toCssClass());
		},
		toCssClass: function toCssClass() {
			var pageClass = "page-" + this.routeName.replace(/\./g, '-').dasherize();
			return pageClass;
		}
	});
});
define('ttexp/routes/action', ['exports', 'ember', 'ttexp/config/environment', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _ttexpConfigEnvironment, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  //http://emberigniter.com/real-world-authentication-with-ember-simple-auth/
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {

    //  beforeModel() {
    //    console.log("beforeModel");
    //  },
    afterModel: function afterModel(model, transition) {
      console.log(model);
      console.log("afterModel");
      if (model.get('length') === 1) {
        //      this.route('index');
        //      this.route('play', params.scenario_id);
        //      this.transitionTo('play', model.get('firstObject'));
      }
    },
    model: function model(params) {
      var model = {};
      //console.log("ACTION");
      //console.log(params.scenario_id);
      //console.log(params.scenario_id);
      //    model.scenario = this.store.findRecord('scenario',params.scenario_id, { reload: true });

      //      this.route('index');
      return model;
    }
  });
});
define('ttexp/routes/application', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsApplicationRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsApplicationRouteMixin['default']);
});
define("ttexp/routes/help", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({});
});
define('ttexp/routes/index', ['exports', 'ember', 'ttexp/config/environment', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _ttexpConfigEnvironment, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
    exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
        model: function model(params) {
            return _ember['default'].RSVP.hash({});
        }
    });
});
define("ttexp/routes/page-not-found", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({});
});
define('ttexp/routes/play', ['exports', 'ember', 'ttexp/config/environment', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _ttexpConfigEnvironment, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  //http://emberigniter.com/real-world-authentication-with-ember-simple-auth/
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    model: function model(params) {
      return _ember['default'].RSVP.hash({
        scenario: this.store.findRecord('scenario', params.scenario_id, { reload: true })
      });
    },

    afterModel: function afterModel(model, transition) {
      var self = this;
      var scenario = model.scenario;
      var playState = scenario.get('playState');
      if (playState) {
        var playthrough = playState.get('playthrough');
        var video = playState.get('video');
      }
    },

    actions: {
      clickItem: function clickItem(item) {
        var self = this;
        var model = this.currentModel;
        var scenario = model.scenario;
        var playState = scenario.get('playState');
        if (playState) {
          playState.get('playthrough').then(function (playthrough) {
            if (playthrough) {
              var action = self.store.createRecord('action', {
                playthrough: playthrough,
                item: item
              });
              action.save().then(function () {
                if (item) {
                  model.scenario.reload().then(function () {
                    self.send('startVideo');
                  });
                } else {
                  self.transitionTo('scenarios');
                }
              });
            }
          });
        }
      },
      // https://www.icanlocalize.com/site/2010/03/using-amazon-s3-to-host-streaming-videos/
      // http://www.inwebson.com/html5/custom-html5-video-controls-with-jquery/ (BUFFERING)
      startVideo: function startVideo() {
        var url = this.currentModel.scenario.get('playState').get('video').get('fullPath');
        url = "http://d1ceamasw3ytjh.cloudfront.net/480/" + url;
        var videoPlayer = _ember['default'].$("#video-player");
        videoPlayer.hide();
        videoPlayer.attr("src", url);
        //      videoPlayer.get(0).load();
        $("#overlay").hide();
        videoPlayer.show();
        videoPlayer.get(0).play();
      },
      exit: function exit(item) {
        if (confirm("Vuoi uscire dalla sessione di gioco?")) {
          this.send('clickItem', false);
        }
      },
      error: function error(reason) {
        alert(reason);

        // Can transition to another route here, e.g. this.transitionTo('index');

        return true;
      }
    }
  });
});
define('ttexp/routes/scenarios', ['exports', 'ember', 'ttexp/config/environment', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _ttexpConfigEnvironment, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    model: function model(params) {
      return this.store.findAll('scenario');
    },
    actions: {
      download: function download(scenario) {
        var self = this;
        if (scenario) {
          //https://github.com/apache/cordova-plugin-file-transfer/blob/1882bfbd2d150c6db501b2092374d644cb056505/doc/index.md
          //https://github.com/apache/cordova-plugin-file-transfer
          //http://docs.phonegap.com/en/1.8.0/cordova_file_file.md.html#FileTransfer

          console.log("DOWNLOAD " + scenario.id);
          var fileTransfer = new FileTransfer();
          var uri = encodeURI("http://d1ceamasw3ytjh.cloudfront.net/480/tel/");
          var fileName = "TEL-I0-T0-A.mp4";
          var fileFullpath = uri + fileName;

          window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {
            console.log(fs);
            console.log('file system open: ' + fs.name);

            // Make sure you add the domain name to the Content-Security-Policy <meta> element.
            var url = 'http://cordova.apache.org/static/img/cordova_bot.png';
            // Parameters passed to getFile create a new file or return the file if it already exists.
            fs.root.getFile('downloaded-image.png', { create: true, exclusive: false }, function (fileEntry) {
              console.log("File Entry:");
              console.log(fileEntry);
              _download(fileEntry, url, false);
            }, function () {});
          }, function () {});
        }

        /*
        var model = this.currentModel;
        var scenario = model.scenario;
        var playState = scenario.get('playState');
        if (playState) {
          playState.get('playthrough').then(function (playthrough) {
            if (playthrough) {
              var action = self.store.createRecord('action', {
                playthrough: playthrough,
                item: item,
              });
              action.save().then(function() {
                if (item) {
                  self.refresh();
                } else {
                  self.transitionTo('scenarios');
                }
              });
            }
          });
        }
        */
      }
    }
  });

  function _download(fileEntry, uri, readBinaryData) {

    var fileTransfer = new FileTransfer();
    var fileURL = fileEntry.toURL();

    fileTransfer.download(uri, fileURL, function (entry) {
      console.log("Successful download...");
      console.log("download complete: " + entry.toURL());
      if (readBinaryData) {
        // Read the file...
        readBinaryFile(entry);
      } else {
        // Or just display it.
        displayImageByFileURL(entry);
      }
    }, function (error) {
      console.log("download error source " + error.source);
      console.log("download error target " + error.target);
      console.log("upload error code" + error.code);
    }, null, // or, pass false
    {
      //headers: {
      //    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
      //}
    });
  }
});
define('ttexp/routes/scores', ['exports', 'ember', 'ttexp/config/environment', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _ttexpConfigEnvironment, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    model: function model(params) {
      return _ember['default'].RSVP.hash({
        playthrough: this.store.findRecord('playthrough', params.playthrough_id, { reload: true })
      });
    },

    setupController: function setupController(controller, model) {
      if (model.id) {
        // Passaggio modello da link-to, in alternativa nel link-to passare solo l'id e non tutto il playthrough
        model = { playthrough: model };
      }
      controller.set('model', model);
    }
  });
});
define('ttexp/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('ttexp/services/session', ['exports', 'ember', 'ember-data', 'ember-simple-auth/services/session'], function (exports, _ember, _emberData, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'].extend({

    store: _ember['default'].inject.service(),

    currentUser: _ember['default'].computed('isAuthenticated', function () {
      if (this.get('isAuthenticated')) {
        var promise = this.get('store').queryRecord('user', {});
        return _emberData['default'].PromiseObject.create({ promise: promise });
      }
    })

  });
});
define('ttexp/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _emberSimpleAuthSessionStoresAdaptive) {
  exports['default'] = _emberSimpleAuthSessionStoresAdaptive['default'].extend();
});
define("ttexp/templates/action", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 13
          }
        },
        "moduleName": "ttexp/templates/action.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("PAGINA ACTION");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("ttexp/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 10
          }
        },
        "moduleName": "ttexp/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("\n<nav>\n	{{#link-to \"index\"}}Index{{/link-to}}\n	{{#link-to \"help\"}}Help{{/link-to}}\n	{{#link-to \"play\" \"new\" class=\"btn btn-link\"}}Play{{/link-to}}\n</nav>\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [8, 0], [8, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("ttexp/templates/cdv-generic-nav-bar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 4
              },
              "end": {
                "line": 5,
                "column": 4
              }
            },
            "moduleName": "ttexp/templates/cdv-generic-nav-bar.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("i");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element2 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createElementMorph(element2);
            return morphs;
          },
          statements: [["element", "bind-attr", [], ["class", ":icon nav.leftButton.icon"], ["loc", [null, [4, 9], [4, 56]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "modifiers",
            "modifiers": ["action"]
          },
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "ttexp/templates/cdv-generic-nav-bar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createElementMorph(element3);
          morphs[1] = dom.createMorphAt(element3, 1, 1);
          morphs[2] = dom.createMorphAt(element3, 3, 3);
          return morphs;
        },
        statements: [["element", "action", ["leftButton"], [], ["loc", [null, [2, 10], [2, 33]]]], ["block", "if", [["get", "nav.leftButton.icon", ["loc", [null, [3, 10], [3, 29]]]]], [], 0, null, ["loc", [null, [3, 4], [5, 11]]]], ["content", "nav.leftButton.text", ["loc", [null, [6, 4], [6, 27]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 0
            },
            "end": {
              "line": 14,
              "column": 0
            }
          },
          "moduleName": "ttexp/templates/cdv-generic-nav-bar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h1");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["content", "nav.title.text", ["loc", [null, [12, 4], [12, 22]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 18,
                "column": 4
              },
              "end": {
                "line": 20,
                "column": 4
              }
            },
            "moduleName": "ttexp/templates/cdv-generic-nav-bar.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("i");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createElementMorph(element0);
            return morphs;
          },
          statements: [["element", "bind-attr", [], ["class", ":icon nav.rightButton.icon"], ["loc", [null, [19, 9], [19, 57]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 0
            },
            "end": {
              "line": 23,
              "column": 0
            }
          },
          "moduleName": "ttexp/templates/cdv-generic-nav-bar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createElementMorph(element1);
          morphs[1] = dom.createMorphAt(element1, 1, 1);
          morphs[2] = dom.createMorphAt(element1, 3, 3);
          return morphs;
        },
        statements: [["element", "action", ["rightButton"], [], ["loc", [null, [17, 10], [17, 34]]]], ["block", "if", [["get", "nav.rightButton.icon", ["loc", [null, [18, 10], [18, 30]]]]], [], 0, null, ["loc", [null, [18, 4], [20, 11]]]], ["content", "nav.rightButton.text", ["loc", [null, [21, 4], [21, 28]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 24,
            "column": 0
          }
        },
        "moduleName": "ttexp/templates/cdv-generic-nav-bar.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "nav.leftButton.text", ["loc", [null, [1, 6], [1, 25]]]]], [], 0, null, ["loc", [null, [1, 0], [8, 7]]]], ["block", "if", [["get", "nav.title.text", ["loc", [null, [10, 6], [10, 20]]]]], [], 1, null, ["loc", [null, [10, 0], [14, 7]]]], ["block", "if", [["get", "nav.rightButton.text", ["loc", [null, [16, 6], [16, 26]]]]], [], 2, null, ["loc", [null, [16, 0], [23, 7]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("ttexp/templates/components/cdv-nav-bar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "ttexp/templates/components/cdv-nav-bar.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("ttexp/templates/help", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 10
          }
        },
        "moduleName": "ttexp/templates/help.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("This is the HELP");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [3, 0], [3, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("ttexp/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 34,
            "column": 10
          }
        },
        "moduleName": "ttexp/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "container-fluid");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "col-md-3 sidebar");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "id", "menu-header");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        var el7 = dom.createTextNode("Salve, ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("strong");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode(" ");
        dom.appendChild(el7, el8);
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("!");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "col-md-9 col-md-offset-3 content");
        dom.setAttribute(el4, "style", "margin-left: 25%;");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "row hidden-xs");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "col-sm-12");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "id", "logo-app");
        var el8 = dom.createElement("img");
        dom.setAttribute(el8, "src", "assets/images/logo-app.png");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "id", "main-content");
        dom.setAttribute(el5, "class", "panel panel-default");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "panel-heading");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("h3");
        dom.setAttribute(el7, "class", "panel-title");
        var el8 = dom.createTextNode("Home");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "panel-body");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("br");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("br");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("br");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("br");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("br");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("br");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("center");
        var el8 = dom.createTextNode("Benvenuto in TTExp");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "customer-logo");
        var el2 = dom.createElement("img");
        dom.setAttribute(el2, "src", "assets/images/logo-customer.png");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1, 1, 1]);
        var element1 = dom.childAt(element0, [1, 1, 1]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(element1, 0, 0);
        morphs[1] = dom.createMorphAt(element1, 2, 2);
        morphs[2] = dom.createMorphAt(element0, 3, 3);
        morphs[3] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "firstName", ["loc", [null, [6, 26], [6, 39]]]], ["content", "lastName", ["loc", [null, [6, 40], [6, 52]]]], ["inline", "partial", ["layout/menu"], [], ["loc", [null, [8, 4], [8, 29]]]], ["content", "outlet", ["loc", [null, [34, 0], [34, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("ttexp/templates/layout/menu", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 1
            },
            "end": {
              "line": 2,
              "column": 73
            }
          },
          "moduleName": "ttexp/templates/layout/menu.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Home");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 1
            },
            "end": {
              "line": 3,
              "column": 88
            }
          },
          "moduleName": "ttexp/templates/layout/menu.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Simulazioni");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 1
            },
            "end": {
              "line": 11,
              "column": 1
            }
          },
          "moduleName": "ttexp/templates/layout/menu.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          dom.setAttribute(el1, "class", "list-group-item");
          var el2 = dom.createTextNode("Logout");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [["element", "action", ["invalidateSession"], [], ["loc", [null, [10, 29], [10, 59]]]]],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 12,
                "column": 2
              },
              "end": {
                "line": 12,
                "column": 51
              }
            },
            "moduleName": "ttexp/templates/layout/menu.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Login");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 11,
              "column": 1
            },
            "end": {
              "line": 13,
              "column": 1
            }
          },
          "moduleName": "ttexp/templates/layout/menu.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["block", "link-to", ["login"], ["class", "list-group-item"], 0, null, ["loc", [null, [12, 2], [12, 63]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 6
          }
        },
        "moduleName": "ttexp/templates/layout/menu.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "main-menu");
        dom.setAttribute(el1, "class", "list-group");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "class", "list-group-item disabled");
        dom.setAttribute(el2, "data-page-route", "messages");
        var el3 = dom.createTextNode("Messaggi");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "class", "list-group-item disabled");
        dom.setAttribute(el2, "data-page-route", "help");
        var el3 = dom.createTextNode("Help");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "class", "list-group-item disabled");
        dom.setAttribute(el2, "data-page-route", "user");
        var el3 = dom.createTextNode("Profilo Utente");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "class", "list-group-item hiddenXXX showAndroid");
        var el3 = dom.createTextNode("Esci");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0]);
        var element2 = dom.childAt(element1, [11]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(element1, 1, 1);
        morphs[1] = dom.createMorphAt(element1, 3, 3);
        morphs[2] = dom.createElementMorph(element2);
        morphs[3] = dom.createMorphAt(element1, 13, 13);
        return morphs;
      },
      statements: [["block", "link-to", ["index"], ["class", "list-group-item", "data-page-route", "index"], 0, null, ["loc", [null, [2, 1], [2, 85]]]], ["block", "link-to", ["scenarios"], ["class", "list-group-item", "data-page-route", "scenarios"], 1, null, ["loc", [null, [3, 1], [3, 100]]]], ["element", "action", ["closeApp"], [], ["loc", [null, [7, 50], [7, 71]]]], ["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [9, 7], [9, 30]]]]], [], 2, 3, ["loc", [null, [9, 1], [13, 8]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
});
define("ttexp/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 23,
              "column": 3
            },
            "end": {
              "line": 25,
              "column": 3
            }
          },
          "moduleName": "ttexp/templates/login.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["content", "errorMessage", ["loc", [null, [24, 7], [24, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 28,
            "column": 6
          }
        },
        "moduleName": "ttexp/templates/login.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("style");
        var el2 = dom.createTextNode("\n.form-signin {\n    margin: 0 auto;\n    max-width: 330px;\n    padding: 15px;\n}}\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("form");
        dom.setAttribute(el2, "class", "form-signin");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        var el4 = dom.createTextNode("Login TTExp");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "form-group");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4, "for", "identification");
        dom.setAttribute(el4, "class", "sr-only");
        var el5 = dom.createTextNode("Email");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "form-group");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4, "for", "password");
        dom.setAttribute(el4, "class", "sr-only");
        var el5 = dom.createTextNode("Password");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "form-group");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "type", "submit");
        dom.setAttribute(el4, "class", "btn btn-lg btn-primary btn-block");
        var el5 = dom.createTextNode("Login");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "form-group");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2, 1]);
        var morphs = new Array(4);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 3, 3);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]), 3, 3);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [9]), 1, 1);
        return morphs;
      },
      statements: [["element", "action", ["authenticate"], ["on", "submit", "method", "get"], ["loc", [null, [9, 7], [9, 57]]]], ["inline", "input", [], ["class", "form-control", "id", "identification", "placeholder", "Email address", "value", ["subexpr", "@mut", [["get", "identification", ["loc", [null, [13, 86], [13, 100]]]]], [], []]], ["loc", [null, [13, 3], [13, 102]]]], ["inline", "input", [], ["class", "form-control", "id", "password", "placeholder", "Password", "type", "password", "value", ["subexpr", "@mut", [["get", "password", ["loc", [null, [17, 91], [17, 99]]]]], [], []]], ["loc", [null, [17, 3], [17, 101]]]], ["block", "if", [["get", "errorMessage", ["loc", [null, [23, 9], [23, 21]]]]], [], 0, null, ["loc", [null, [23, 3], [25, 10]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("ttexp/templates/page-not-found", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 10
          }
        },
        "moduleName": "ttexp/templates/page-not-found.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("ERROR: Page not found");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [3, 0], [3, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("ttexp/templates/play", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 29,
                "column": 32
              },
              "end": {
                "line": 29,
                "column": 116
              }
            },
            "moduleName": "ttexp/templates/play.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Scopri il tuo punteggio...");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 28,
              "column": 3
            },
            "end": {
              "line": 30,
              "column": 3
            }
          },
          "moduleName": "ttexp/templates/play.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.setAttribute(el1, "class", "list-group-item");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["block", "link-to", ["scores", ["get", "model.scenario.playState.playthrough", ["loc", [null, [29, 52], [29, 88]]]]], [], 0, null, ["loc", [null, [29, 32], [29, 128]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 31,
                "column": 4
              },
              "end": {
                "line": 34,
                "column": 4
              }
            },
            "moduleName": "ttexp/templates/play.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("					");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            dom.setAttribute(el1, "class", "list-group-item");
            var el2 = dom.createElement("a");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n					");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("<li class=\"list-group-item\">{{#link-to \"action\" model.scenario.id item.id}}{{item.text}}{{/link-to}}</li>");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element2 = dom.childAt(fragment, [1, 0]);
            var morphs = new Array(2);
            morphs[0] = dom.createElementMorph(element2);
            morphs[1] = dom.createMorphAt(element2, 0, 0);
            return morphs;
          },
          statements: [["element", "action", ["clickItem", ["get", "item", ["loc", [null, [32, 57], [32, 61]]]]], [], ["loc", [null, [32, 36], [32, 63]]]], ["content", "item.text", ["loc", [null, [32, 64], [32, 77]]]]],
          locals: ["item"],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 30,
              "column": 3
            },
            "end": {
              "line": 35,
              "column": 3
            }
          },
          "moduleName": "ttexp/templates/play.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "each", [["get", "model.scenario.playState.video.items", ["loc", [null, [31, 12], [31, 48]]]]], [], 0, null, ["loc", [null, [31, 4], [34, 13]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 55,
                "column": 3
              },
              "end": {
                "line": 57,
                "column": 3
              }
            },
            "moduleName": "ttexp/templates/play.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("				(prev: ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode(")\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "model.scenario.playState.prevVideo.uniqueCode", ["loc", [null, [56, 11], [56, 60]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.6.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 61,
                  "column": 4
                },
                "end": {
                  "line": 63,
                  "column": 4
                }
              },
              "moduleName": "ttexp/templates/play.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("					");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("span");
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode(": ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode(" => tot:");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode(" - min:");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode(" - max:");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("br");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element0 = dom.childAt(fragment, [1]);
              var morphs = new Array(6);
              morphs[0] = dom.createAttrMorph(element0, 'title');
              morphs[1] = dom.createMorphAt(element0, 0, 0);
              morphs[2] = dom.createMorphAt(fragment, 3, 3, contextualElement);
              morphs[3] = dom.createMorphAt(fragment, 5, 5, contextualElement);
              morphs[4] = dom.createMorphAt(fragment, 7, 7, contextualElement);
              morphs[5] = dom.createMorphAt(fragment, 9, 9, contextualElement);
              return morphs;
            },
            statements: [["attribute", "title", ["concat", [["get", "score.variableName", ["loc", [null, [62, 20], [62, 38]]]]]]], ["content", "score.variableCode", ["loc", [null, [62, 42], [62, 64]]]], ["inline", "div", [["subexpr", "round", [["subexpr", "mult", [["subexpr", "div", [["get", "score.value", ["loc", [null, [62, 97], [62, 108]]]], ["get", "model.scenario.playState.stepsCount", ["loc", [null, [62, 109], [62, 144]]]]], [], ["loc", [null, [62, 92], [62, 145]]]], 100], [], ["loc", [null, [62, 86], [62, 150]]]]], [], ["loc", [null, [62, 79], [62, 151]]]], 100], [], ["loc", [null, [62, 73], [62, 157]]]], ["content", "score.value", ["loc", [null, [62, 165], [62, 180]]]], ["content", "score.minValue", ["loc", [null, [62, 187], [62, 205]]]], ["content", "score.maxValue", ["loc", [null, [62, 212], [62, 230]]]]],
            locals: ["score"],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 60,
                "column": 3
              },
              "end": {
                "line": 64,
                "column": 3
              }
            },
            "moduleName": "ttexp/templates/play.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "each", [["get", "model.scenario.playState.playthrough.scores", ["loc", [null, [61, 12], [61, 55]]]]], [], 0, null, ["loc", [null, [61, 4], [63, 13]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 52,
              "column": 1
            },
            "end": {
              "line": 66,
              "column": 1
            }
          },
          "moduleName": "ttexp/templates/play.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "id", "debug-window");
          var el2 = dom.createTextNode("\n			Video: ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("			");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n			Passi: ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("		");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(4);
          morphs[0] = dom.createMorphAt(element1, 1, 1);
          morphs[1] = dom.createMorphAt(element1, 3, 3);
          morphs[2] = dom.createMorphAt(element1, 7, 7);
          morphs[3] = dom.createMorphAt(element1, 10, 10);
          return morphs;
        },
        statements: [["content", "model.scenario.playState.video.uniqueCode", ["loc", [null, [54, 10], [54, 55]]]], ["block", "if", [["get", "model.scenario.playState.prevVideo", ["loc", [null, [55, 9], [55, 43]]]]], [], 0, null, ["loc", [null, [55, 3], [57, 10]]]], ["content", "model.scenario.playState.stepsCount", ["loc", [null, [59, 10], [59, 49]]]], ["block", "if", [["get", "model.scenario.playState.stepsCount", ["loc", [null, [60, 9], [60, 44]]]]], [], 1, null, ["loc", [null, [60, 3], [64, 10]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 69,
            "column": 0
          }
        },
        "moduleName": "ttexp/templates/play.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("audio");
        dom.setAttribute(el2, "autoplayXXX", "");
        dom.setAttribute(el2, "loop", "");
        var el3 = dom.createTextNode("\n		 ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("source");
        dom.setAttribute(el3, "src", "assets/media/music.mp3");
        dom.setAttribute(el3, "type", "audio/mp3");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		 Your browser does not support the audio element.\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" \n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "id", "overlay");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "id", "overlay-button");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "class", "btn btn-default");
        var el5 = dom.createTextNode("INIZIA SIMULAZIONE");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "id", "video-container");
        dom.setAttribute(el2, "class", "cinemaOff hiddenxxx");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("video");
        dom.setAttribute(el3, "id", "video-player");
        var el4 = dom.createTextNode("\n			Your browser does not support the video element.\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "id", "text-container");
        dom.setAttribute(el2, "class", "fullscreenXXX subtitles hidden");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "id", "text-dialog");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "id", "text-baloon");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "id", "side-chat");
        dom.setAttribute(el2, "class", "minimizedXXX");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "id", "button-chat");
        dom.setAttribute(el3, "class", "btn btn-link ttexp-btn ttexp-position-absolute top-left");
        dom.setAttribute(el3, "role", "button");
        var el4 = dom.createElement("span");
        dom.setAttribute(el4, "class", "glyphicon glyphicon glyphicon-comment");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "id", "button-audio");
        dom.setAttribute(el3, "class", "btn btn-link ttexp-btn ttexp-position-absolute top-right");
        dom.setAttribute(el3, "role", "button");
        var el4 = dom.createElement("span");
        dom.setAttribute(el4, "class", "glyphicon glyphicon-volume-up");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "id", "chat-options");
        dom.setAttribute(el3, "class", "list-group ");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("			\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("\n			<li class=\"list-group-item\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenenan massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas.</li>\n			<li class=\"list-group-item\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenenan massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas.</li>\n			<li class=\"list-group-item\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenenan massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas.</li>\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "id", "button-close");
        dom.setAttribute(el2, "class", "btn btn-link ttexp-btn ttexp-position-absolute top-left");
        var el3 = dom.createElement("span");
        dom.setAttribute(el3, "class", "glyphicon glyphicon glyphicon-remove-circle");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("\n	{{#link-to \"scenarios\" id=\"button-close\" class=\"btn btn-link ttexp-btn ttexp-position-absolute top-left\"}}<span class=\"glyphicon glyphicon glyphicon-remove-circle\"></span>{{/link-to}}\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "id", "customer-logo");
        var el3 = dom.createElement("img");
        dom.setAttribute(el3, "src", "assets/images/logo-customer.png");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element3 = dom.childAt(fragment, [0]);
        var element4 = dom.childAt(element3, [3, 1, 1]);
        var element5 = dom.childAt(element3, [11]);
        var morphs = new Array(6);
        morphs[0] = dom.createElementMorph(element4);
        morphs[1] = dom.createMorphAt(dom.childAt(element3, [7, 1, 1]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element3, [9, 5]), 1, 1);
        morphs[3] = dom.createElementMorph(element5);
        morphs[4] = dom.createMorphAt(element3, 17, 17);
        morphs[5] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["element", "action", ["startVideo"], [], ["loc", [null, [8, 6], [8, 29]]]], ["content", "model.scenario.playState.video.transcript", ["loc", [null, [19, 4], [19, 49]]]], ["block", "if", [["get", "model.scenario.playState.gameCompleted", ["loc", [null, [28, 9], [28, 47]]]]], [], 0, 1, ["loc", [null, [28, 3], [35, 10]]]], ["element", "action", ["exit"], [], ["loc", [null, [45, 86], [45, 103]]]], ["block", "if", [true], [], 2, null, ["loc", [null, [52, 1], [66, 8]]]], ["content", "outlet", ["loc", [null, [68, 0], [68, 10]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("ttexp/templates/scenarios", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 35,
                "column": 27
              },
              "end": {
                "line": 35,
                "column": 171
              }
            },
            "moduleName": "ttexp/templates/scenarios.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "glyphicon glyphicon-play-circle");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 36,
                "column": 15
              },
              "end": {
                "line": 36,
                "column": 124
              }
            },
            "moduleName": "ttexp/templates/scenarios.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["content", "scenario.name", ["loc", [null, [36, 107], [36, 124]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 33,
              "column": 9
            },
            "end": {
              "line": 41,
              "column": 9
            }
          },
          "moduleName": "ttexp/templates/scenarios.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("									  	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          var el2 = dom.createTextNode("\n											");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2, "class", "fit");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n											");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n									  		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n									  		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("-");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n									  		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createElement("a");
          var el4 = dom.createElement("span");
          dom.setAttribute(el4, "class", "glyphicon glyphicon-download");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n									  	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [9, 0]);
          var morphs = new Array(4);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
          morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]), 0, 0);
          morphs[3] = dom.createElementMorph(element1);
          return morphs;
        },
        statements: [["block", "link-to", ["play", ["get", "scenario.id", ["loc", [null, [35, 45], [35, 56]]]]], ["id", ["subexpr", "concat", ["button-play-", ["get", "scenario.id", ["loc", [null, [35, 83], [35, 94]]]]], [], ["loc", [null, [35, 60], [35, 95]]]], "class", "btn btn-link"], 0, null, ["loc", [null, [35, 27], [35, 183]]]], ["block", "link-to", ["play", ["get", "scenario.id", ["loc", [null, [36, 33], [36, 44]]]]], ["id", ["subexpr", "concat", ["button-play-text-", ["get", "scenario.id", ["loc", [null, [36, 76], [36, 87]]]]], [], ["loc", [null, [36, 48], [36, 88]]]], "class", "btn-link"], 1, null, ["loc", [null, [36, 15], [36, 136]]]], ["content", "scenario.attempts", ["loc", [null, [37, 17], [37, 38]]]], ["element", "action", ["download", ["get", "scenario", ["loc", [null, [39, 40], [39, 48]]]]], [], ["loc", [null, [39, 20], [39, 50]]]]],
        locals: ["scenario"],
        templates: [child0, child1]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 41,
              "column": 9
            },
            "end": {
              "line": 45,
              "column": 9
            }
          },
          "moduleName": "ttexp/templates/scenarios.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("									  	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          var el2 = dom.createTextNode("\n									  		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2, "colspan", "5");
          var el3 = dom.createTextNode("Nessuna simulazione disponibile");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n								  		");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 58,
            "column": 10
          }
        },
        "moduleName": "ttexp/templates/scenarios.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "container-fluid");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "col-md-3 sidebar");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "id", "menu-header");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        var el7 = dom.createTextNode("Salve, ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("strong");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode(" ");
        dom.appendChild(el7, el8);
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("!");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "col-md-9 col-md-offset-3 content");
        dom.setAttribute(el4, "style", "margin-left: 25%;");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "row hidden-xs");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "col-sm-12");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "id", "logo-app");
        var el8 = dom.createElement("img");
        dom.setAttribute(el8, "src", "assets/images/logo-app.png");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "id", "main-content");
        dom.setAttribute(el5, "class", "panel panel-default");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "panel-heading");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("h3");
        dom.setAttribute(el7, "class", "panel-title");
        var el8 = dom.createTextNode("Simulazioni disponibili");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "panel-body");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "table-responsive");
        var el8 = dom.createTextNode("\n							");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("table");
        dom.setAttribute(el8, "class", "table table-striped");
        var el9 = dom.createTextNode("\n								");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("thead");
        var el10 = dom.createTextNode("\n									");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("tr");
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("th");
        dom.setAttribute(el11, "class", "fit");
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("th");
        var el12 = dom.createTextNode("Simulazione");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("th");
        var el12 = dom.createTextNode("Tentativi");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("th");
        var el12 = dom.createTextNode("Media");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("th");
        dom.setAttribute(el11, "class", "fit");
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n									");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n								");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n								");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("tbody");
        var el10 = dom.createTextNode("\n");
        dom.appendChild(el9, el10);
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("								");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n							");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n						");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode(" \n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "customer-logo");
        var el2 = dom.createElement("img");
        dom.setAttribute(el2, "src", "assets/images/logo-customer.png");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [0, 1, 1]);
        var element3 = dom.childAt(element2, [1]);
        var element4 = dom.childAt(element3, [1, 1, 1]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(element4, 0, 0);
        morphs[1] = dom.createMorphAt(element4, 2, 2);
        morphs[2] = dom.createMorphAt(element3, 3, 3);
        morphs[3] = dom.createMorphAt(dom.childAt(element2, [3, 3, 3, 1, 1, 3]), 1, 1);
        morphs[4] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "firstName", ["loc", [null, [6, 26], [6, 39]]]], ["content", "lastName", ["loc", [null, [6, 40], [6, 52]]]], ["inline", "partial", ["layout/menu"], [], ["loc", [null, [8, 4], [8, 29]]]], ["block", "each", [["get", "model", ["loc", [null, [33, 17], [33, 22]]]]], [], 0, 1, ["loc", [null, [33, 9], [45, 18]]]], ["content", "outlet", ["loc", [null, [58, 0], [58, 10]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("ttexp/templates/scores", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 2,
              "column": 171
            }
          },
          "moduleName": "ttexp/templates/scores.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "class", "glyphicon glyphicon glyphicon-remove-circle");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 11,
                "column": 7
              },
              "end": {
                "line": 12,
                "column": 7
              }
            },
            "moduleName": "ttexp/templates/scores.hbs"
          },
          isEmpty: true,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 12,
                "column": 7
              },
              "end": {
                "line": 14,
                "column": 7
              }
            },
            "moduleName": "ttexp/templates/scores.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("								");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("br");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("%");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element1 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(element1, 0, 0);
            morphs[1] = dom.createMorphAt(element1, 2, 2);
            return morphs;
          },
          statements: [["content", "score.variableName", ["loc", [null, [13, 13], [13, 35]]]], ["content", "score.percent", ["loc", [null, [13, 40], [13, 57]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 6
            },
            "end": {
              "line": 15,
              "column": 6
            }
          },
          "moduleName": "ttexp/templates/scores.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "score.variableId", ["loc", [null, [11, 13], [11, 29]]]]], [], 0, 1, ["loc", [null, [11, 7], [14, 14]]]]],
        locals: ["score"],
        templates: [child0, child1]
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 21,
              "column": 6
            },
            "end": {
              "line": 23,
              "column": 6
            }
          },
          "moduleName": "ttexp/templates/scores.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("							Raggiunto\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 23,
              "column": 6
            },
            "end": {
              "line": 25,
              "column": 6
            }
          },
          "moduleName": "ttexp/templates/scores.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("							Mancato\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child4 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 42,
                "column": 11
              },
              "end": {
                "line": 46,
                "column": 11
              }
            },
            "moduleName": "ttexp/templates/scores.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("												");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("th");
            var el2 = dom.createTextNode("\n													");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "score-name");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n												");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]), 0, 0);
            return morphs;
          },
          statements: [["content", "score.variableName", ["loc", [null, [44, 37], [44, 59]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 41,
              "column": 10
            },
            "end": {
              "line": 47,
              "column": 10
            }
          },
          "moduleName": "ttexp/templates/scores.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "score.variableId", ["loc", [null, [42, 17], [42, 33]]]]], [], 0, null, ["loc", [null, [42, 11], [46, 18]]]]],
        locals: ["score"],
        templates: [child0]
      };
    })();
    var child5 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 53,
                "column": 11
              },
              "end": {
                "line": 57,
                "column": 11
              }
            },
            "moduleName": "ttexp/templates/scores.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("												");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("td");
            var el2 = dom.createTextNode("\n													");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n												");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1, 1]);
            var morphs = new Array(2);
            morphs[0] = dom.createAttrMorph(element0, 'class');
            morphs[1] = dom.createMorphAt(element0, 0, 0);
            return morphs;
          },
          statements: [["attribute", "class", ["concat", ["score-vote ", ["get", "score.voteClass", ["loc", [null, [55, 38], [55, 53]]]]]]], ["content", "score.vote", ["loc", [null, [55, 57], [55, 71]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 52,
              "column": 10
            },
            "end": {
              "line": 58,
              "column": 10
            }
          },
          "moduleName": "ttexp/templates/scores.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "score.variableId", ["loc", [null, [53, 17], [53, 33]]]]], [], 0, null, ["loc", [null, [53, 11], [57, 18]]]]],
        locals: ["score"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 73,
            "column": 10
          }
        },
        "moduleName": "ttexp/templates/scores.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("<div id=\"scores-container\" style=\"background-image: url('./assets/images/results-.png');\"></div>");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "scores-container");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "id", "main-content");
        dom.setAttribute(el2, "class", "panel panel-default");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "panel-body");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "row");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "col-xs-6");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "id", "general-score-container");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "col-xs-6");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "id", "objectives-container");
        var el7 = dom.createTextNode("\n						Obiettivo");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("br");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("\n				<div class=\"col-md-6\">\n					<div id=\"hints-container\">Suggerimento</div>\n				</div>\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "row");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "col-md-12");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "id", "variables-score-container");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "table-responsive");
        var el8 = dom.createTextNode("\n							");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("table");
        var el9 = dom.createTextNode("\n								");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("thead");
        var el10 = dom.createTextNode("\n									");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("tr");
        var el11 = dom.createTextNode("\n");
        dom.appendChild(el10, el11);
        var el11 = dom.createComment("");
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("									");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n								");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n								");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("tbody");
        var el10 = dom.createTextNode("\n									");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("tr");
        var el11 = dom.createTextNode("\n");
        dom.appendChild(el10, el11);
        var el11 = dom.createComment("");
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("									");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n								");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n							");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n						");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "customer-logo");
        var el2 = dom.createElement("img");
        dom.setAttribute(el2, "src", "assets/images/logo-customer.png");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [4, 1, 1]);
        var element3 = dom.childAt(element2, [1]);
        var element4 = dom.childAt(element2, [3, 1, 1, 1, 1]);
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(element3, [1, 1]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element3, [3, 1]), 3, 3);
        morphs[3] = dom.createMorphAt(dom.childAt(element4, [1, 1]), 1, 1);
        morphs[4] = dom.createMorphAt(dom.childAt(element4, [3, 1]), 1, 1);
        morphs[5] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "link-to", ["scenarios"], ["id", "button-close", "class", "btn btn-link ttexp-btn ttexp-position-absolute top-left"], 0, null, ["loc", [null, [2, 0], [2, 183]]]], ["block", "each", [["get", "model.playthrough.scores", ["loc", [null, [10, 14], [10, 38]]]]], [], 1, null, ["loc", [null, [10, 6], [15, 15]]]], ["block", "if", [["get", "model.playthrough.success", ["loc", [null, [21, 12], [21, 37]]]]], [], 2, 3, ["loc", [null, [21, 6], [25, 13]]]], ["block", "each", [["get", "model.playthrough.scores", ["loc", [null, [41, 18], [41, 42]]]]], [], 4, null, ["loc", [null, [41, 10], [47, 19]]]], ["block", "each", [["get", "model.playthrough.scores", ["loc", [null, [52, 18], [52, 42]]]]], [], 5, null, ["loc", [null, [52, 10], [58, 19]]]], ["content", "outlet", ["loc", [null, [73, 0], [73, 10]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5]
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('ttexp/config/environment', ['ember'], function(Ember) {
  var prefix = 'ttexp';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("ttexp/app")["default"].create({"serverApiUrl":"http://demo.ttexp.net/api","LOG_ACTIVE_GENERATION":false,"LOG_VIEW_LOOKUPS":false,"name":"ttexp","version":"0.1.0+627a3193"});
}

/* jshint ignore:end */
//# sourceMappingURL=ttexp.map