"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('ttexp/adapters/application', ['exports', 'ember-data', 'ember-simple-auth/mixins/data-adapter-mixin'], function (exports, _emberData, _emberSimpleAuthMixinsDataAdapterMixin) {
	exports['default'] = _emberData['default'].JSONAPIAdapter.extend(_emberSimpleAuthMixinsDataAdapterMixin['default'], {
		authorizer: 'authorizer:oauth2'
	});
});
define('ttexp/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'ttexp/config/environment'], function (exports, _ember, _emberResolver, _emberLoadInitializers, _ttexpConfigEnvironment) {

	var App;

	_ember['default'].MODEL_FACTORY_INJECTIONS = true;

	App = _ember['default'].Application.extend({
		modulePrefix: _ttexpConfigEnvironment['default'].modulePrefix,
		podModulePrefix: _ttexpConfigEnvironment['default'].podModulePrefix,
		Resolver: _emberResolver['default']
	});

	(0, _emberLoadInitializers['default'])(App, _ttexpConfigEnvironment['default'].modulePrefix);

	exports['default'] = App;
});
define('ttexp/authenticators/oauth2', ['exports', 'ember-simple-auth/authenticators/oauth2-password-grant'], function (exports, _emberSimpleAuthAuthenticatorsOauth2PasswordGrant) {
	exports['default'] = _emberSimpleAuthAuthenticatorsOauth2PasswordGrant['default'].extend({
		serverTokenEndpoint: 'http://ttexp-server.localhost/api/access_token',

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
define('ttexp/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('ttexp/controllers/help', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({});
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
 alert('pippo');
 document.addEventListener("deviceready", onDeviceReady, true);
 
 function exitFromApp() {
 	navigator.app.exitApp();
 }
 */
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
					_this.set('errorMessage', reason.error || reason);
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
	exports['default'] = _ember['default'].Controller.extend({});
});
define('ttexp/controllers/scores', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({});
});
define('ttexp/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('ttexp/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
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
define('ttexp/router', ['exports', 'ember', 'ttexp/config/environment'], function (exports, _ember, _ttexpConfigEnvironment) {

	var Router = _ember['default'].Router.extend({
		location: _ttexpConfigEnvironment['default'].locationType
	});

	Router.map(function () {
		this.route('index', { path: '/' });
		this.route('login', { path: '/login' });
		this.route('help');
		this.route('play', { path: '/play/:video_id' });
		this.route('scores', { path: '/scores/:session_id' });
		this.route('admin/index', { path: '/admin' });
		this.route('admin/scenario', { path: '/admin/scenario' });
		this.route('page-not-found', { path: '/*wildcard' });
	});

	exports['default'] = Router;

	_ember['default'].Route.reopen({
		activate: function activate() {
			var cssClass = this.toCssClass();
			if (cssClass !== "application") {
				_ember['default'].$('body').addClass(cssClass);
			}
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
define("ttexp/routes/admin/index", ["exports", "ember", "ember-simple-auth/mixins/authenticated-route-mixin"], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports["default"] = _ember["default"].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin["default"]);
});
define("ttexp/routes/admin/scenario", ["exports", "ember"], function (exports, _ember) {
	exports["default"] = _ember["default"].Route.extend({
		model: function model(params) {
			return params.session_id;
		}
	});
});
define('ttexp/routes/application', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsApplicationRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsApplicationRouteMixin['default']);
});
define("ttexp/routes/help", ["exports", "ember"], function (exports, _ember) {
	exports["default"] = _ember["default"].Route.extend({});
});
define("ttexp/routes/index", ["exports", "ember"], function (exports, _ember) {
	exports["default"] = _ember["default"].Route.extend({});
});
define("ttexp/routes/page-not-found", ["exports", "ember"], function (exports, _ember) {
	exports["default"] = _ember["default"].Route.extend({});
});
define("ttexp/routes/play", ["exports", "ember", "ember-simple-auth/mixins/authenticated-route-mixin"], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {

	//export default Ember.Route.extend(AuthenticatedRouteMixin);
	exports["default"] = _ember["default"].Route.extend({
		actions: {
			closeApp: function closeApp() {
				alert("closing app");
				navigator.app.exitApp();
			}
		},
		model: function model(params) {

			var steps = {};

			steps['start'] = {
				'dialog': '*risponde al telefono*',
				'items': [{
					'text': 'Pronto, Giovanni Borini?',
					'link': '1'
				}, {
					'text': 'Pronto? Buongiorno.',
					'link': false
				}, {
					'text': 'Giovanni Borini?',
					'link': '2'
				}]
			};

			steps['1'] = {
				'dialog': 'Sì… Chi parla scusi?',
				'items': [{
					'text': 'Buongiorno Giovanni, sono Francesco Mariani, di Generali: suo cugino Filippo la ha avvisata della mia chiamata?',
					'link': '1-A'
				}, {
					'text': 'Buongiorno, sono Francesco Mariani, di Generali. Possiamo parlare o la disturbo?',
					'link': false
				}, {
					'text': 'La chiamo da Generali. Mi dica, la disturbo, adesso?',
					'link': false
				}]
			};
			steps['1-A'] = {
				'dialog': 'Ehm… Penso di sì… Di preciso di cosa aveva bisogno?',
				'items': [{
					'text': 'Vorrei proporle un incontro per parlare di previdenza, come ho fatto con Filippo.',
					'link': '1-B'
				}, {
					'text': 'La chiamo per fissare un incontro e parlare come abbiamo fatto con suo cugino. Lei ha un negozio di ottica, vero? Ottica Borini?',
					'link': false
				}, {
					'text': 'Le rubo qualche minuto. La disturbo, adesso?',
					'link': false
				}]
			};
			steps['1-B'] = {
				'dialog': 'Mmm… Quindi per quella cosa della pensione...',
				'items': [{
					'text': 'Abbiamo parlato con lui anche di questo, certo. Poi mi diceva che ha un negozio: ottica Borini, giusto?',
					'link': '1-C'
				}, {
					'text': 'Si può dire di sì… Va bene se passo da lei questa sera, alle 18,30?',
					'link': false
				}, {
					'text': 'Sì: ora vorrei parlarne anche con lei. Quando possiamo vederci?',
					'link': false
				}]
			};
			steps['1-C'] = {
				'dialog': 'Sì… ',
				'items': [{
					'text': 'È un negozio storico della città, mi sembra. Siete aperti da molti anni, giusto?',
					'link': '1-D'
				}, {
					'text': 'Beh, il vostro negozio deve avere un gran giro di affari, visto che siete aperti da tanto tempo.',
					'link': false
				}, {
					'text': 'E gli affari andranno bene, giusto?',
					'link': false
				}]
			};
			steps['1-D'] = {
				'dialog': 'Mah, sì… Diciamo che lo gestiamo da un po\' di anni.',
				'items': [{
					'text': 'Complimenti! Giovanni, Filippo ci teneva che parlassi anche con lei e la sua famiglia del programma che ho discusso con lui: io stasera posso passare per le sei e mezza oppure per le otto e mezza.',
					'link': '1-E'
				}, {
					'text': 'Ottimo. Allora io passerei da lei questa sera. Che ne dice?',
					'link': false
				}, {
					'text': 'Ottimo. Mi dica, quando pensa che potremmo vederci?',
					'link': false
				}]
			};
			steps['1-E'] = {
				'dialog': 'No, stasera no… Portiamo i bambini dalla nonna per qualche giorno.',
				'items': [{
					'text': 'Allora domani: io sono già a Monza. Facciamo alle 20,30.',
					'link': '1-F'
				}, {
					'text': 'E quando preferirebbe?',
					'link': false
				}, {
					'text': 'Capisco, certo. Quanti anni hanno i bambini?',
					'link': false
				}]
			};
			steps['1-F'] = {
				'dialog': 'Sì... Ma guardi che noi siamo a posto… Non faccia un viaggio per niente.',
				'items': [{
					'text': 'Io comunque domani sono in zona, poi Filippo mi ha chiesto espressamente di passare. Lei abita in via Falcone, al 10?',
					'link': '1-G'
				}, {
					'text': 'Ma ci mancherebbe. Se vuole possiamo fare sabato mattina: per me non ci sono problemi.',
					'link': false
				}, {
					'text': 'Ma non le interessa parlare del suo futuro?',
					'link': false
				}]
			};
			steps['1-G'] = {
				'dialog': 'Beh, se è in zona… L\'indirizzo è quello.',
				'items': [{
					'text': 'Va benissimo: allora a domani, alle 20,30.',
					'link': '1-H'
				}, {
					'text': 'Certo. Allora ci vediamo domani.',
					'link': false
				}, {
					'text': 'Allora ci vediamo domani. Ci sarà anche la moglie, immagino.',
					'link': false
				}]
			};
			steps['1-H'] = {
				'dialog': 'Senta, però… Mi lasci un numero per confermare… Sa, non si sa mai in negozio…',
				'items': [{
					'text': 'Fissiamo adesso. Se preferisce facciamo un quarto d\'ora dopo, così vi organizzate con calma.',
					'link': '1-I'
				}, {
					'text': 'Può chiamare in agenzia, d\'accordo?',
					'link': false
				}, {
					'text': 'Ma non ce n\'è bisogno. La chiamo io nel pomeriggio di domani.',
					'link': false
				}]
			};
			steps['1-I'] = {
				'dialog': 'Ah… Va bene… nove meno un quarto?',
				'items': [{
					'text': 'Perfetto: allora a domani, alle 20,45 Giovanni. Buona serata (CHIUDI)',
					'link': 'end-1'
				}, {
					'text': 'Esatto. A domani. (CHIUDI)',
					'link': false
				}, {
					'text': 'Se per lei va bene… Sì.',
					'link': false
				}]
			};
			steps['end-1'] = {
				'dialog': 'A domani… *aggancia*',
				'items': [],
				'scores': 'a1'
			};

			steps['2'] = {
				'dialog': 'Si, chi parla scusi?',
				'items': [{
					'text': 'Buongiorno Giovanni, sono Francesco Mariani, di Generali: suo cugino Filippo la ha avvisata della mia chiamata?',
					'link': '2-A'
				}, {
					'text': 'Buongiorno, sono Francesco Mariani, di Generali. Possiamo parlare o la disturbo?',
					'link': false
				}, {
					'text': 'La chiamo da Generali. Mi dica, la disturbo, adesso?',
					'link': false
				}]
			};
			steps['2-A'] = {
				'dialog': 'Ehm… Penso di sì… Di preciso di cosa aveva bisogno?',
				'items': [{
					'text': 'Le rubo qualche minuto. La disturbo, adesso?',
					'link': '2-B'
				}, {
					'text': 'La chiamo per fissare un incontro e parlare come abbiamo fatto con suo cugino. Lei ha un negozio di ottica, vero? Ottica Borini?',
					'link': false
				}, {
					'text': 'Vorrei proporle un incontro per parlare di previdenza, come ho fatto con Filippo.',
					'link': false
				}]
			};
			steps['2-B'] = {
				'dialog': 'Guardi, sì… ma tanto è sempre così. Mi dica. Cosa voleva?',
				'items': [{
					'text': 'Dovrei parlarle della sua polizza pensionistica.',
					'link': '2-C'
				}, {
					'text': 'Solo proporle un incontro per parlare della sua polizza. Cosa ne dice?',
					'link': false
				}, {
					'text': 'Proporle un incontro, come quello fatto con Filippo.',
					'link': false
				}]
			};
			steps['2-C'] = {
				'dialog': 'Sarà un discorso breve perché io non ho una polizza…',
				'items': [{
					'text': 'Infatti: come Generali possiamo offrirle però una serie di soluzioni molto intriganti. Io penso che potremmo parlarne, no?',
					'link': '2-D'
				}, {
					'text': 'Lo so, e per questo la chiamo: Filippo ci tiene che anche lei abbia la possibilità di capire come funzionano queste polizze.',
					'link': false
				}, {
					'text': 'Me lo ha detto Filippo. Ed è per questo che ci teneva la chiamassi. Vogliamo vederci stasera per parlarne?',
					'link': false
				}]
			};
			steps['2-D'] = {
				'dialog': 'No. Mi scusi, non capisco cosa vuole…',
				'items': [{
					'text': 'Le sto proponendo un investimento vantaggioso per lei e la sua famiglia.',
					'link': '2-E'
				}, {
					'text': 'Ha ragione: vediamoci per parlarne con calma. Stasera preferisce che passi alle 18,30 o alle 19,30?',
					'link': false
				}, {
					'text': 'Solo vederla, Giovanni.',
					'link': false
				}]
			};
			steps['2-E'] = {
				'dialog': 'Mmmm… Ma di che cifre stiamo parlando?',
				'items': [{
					'text': 'L\'ammontare del premio dipende da quanto vuole guadagnare, ovviamente... Ma 5mila, 6mila come minimo.',
					'link': '2-F'
				}, {
					'text': 'Preferisco palarne a voce: quando posso venire da lei?',
					'link': false
				}, {
					'text': 'La cifra dipende soprattutto dalle sue esigenze: stasera potremmo parlarne con calma. Passo alle 19,30 o più tardi, verso le 20?',
					'link': false
				}]
			};
			steps['2-F'] = {
				'dialog': 'Mah, no. Sono numeri troppo grossi, adesso… Mi scusi, ma io ho già gli investimenti che mi servono… ',
				'items': [{
					'text': 'Capisco. Lei ha un negozio di ottica… Ottica Borini, giusto?',
					'link': '2-G'
				}, {
					'text': 'E di cosa si tratta?',
					'link': false
				}, {
					'text': 'Però tenga presente che il nostro prodotto è unico, diverso da tuti gli altri.',
					'link': false
				}]
			};
			steps['2-G'] = {
				'dialog': 'Sì, ma se pensa che avere un negozio significhi aver soldi a palate, devo dirle che non è così…',
				'items': [{
					'text': 'Lo so, lo so. Ma proprio per questo dovremmo parlare di come gestire i suoi fondi per il futuro, non crede?',
					'link': '2-H'
				}, {
					'text': 'Il vostro è uno dei negozi storici della città, giusto?',
					'link': false
				}, {
					'text': 'Senta, io sono già in città, domani: possiamo vederci alle 19,30.',
					'link': false
				}]
			};
			steps['2-H'] = {
				'dialog': 'Guardi, davvero, non stia a perdere tempo. Abbiamo altre cose in ballo che sono più pressanti.',
				'items': [{
					'text': 'Certo… Ma mi lasci provare a convincerla. Se vuole io posso venire da lei anche la mattina, nel fine settimana.',
					'link': '2-I'
				}, {
					'text': 'Posso chiederle di cosa si tratta?',
					'link': false
				}, {
					'text': 'Mi sta dicendo che non vuole parlare del suo futuro?',
					'link': false
				}]
			};
			steps['2-I'] = {
				'dialog': 'Ma no, a questo punto facciamo la sera… Verso le 19,30, appena torno dall\'ufficio.',
				'items': [{
					'text': 'Ottimo: che giorno potrebbe?',
					'link': 'end-2'
				}, {
					'text': 'Però così forse la disturbo. Posso venire più tardi, che ne dice?',
					'link': false
				}, {
					'text': 'Allora fisso per stasera?',
					'link': false
				}]
			};
			steps['end-2'] = {
				'dialog': 'Senta, ora non so dirle e devo proprio andare. Grazie comunque... *aggancia*',
				'items': [],
				'scores': 'b1'
			};

			if (typeof steps[params.video_id] !== undefined) {
				return steps[params.video_id];
			} else {
				return false;
			}

			//return this.store.findRecord('video', params.video_id);
		}
	});
});
define("ttexp/routes/scores", ["exports", "ember"], function (exports, _ember) {
	exports["default"] = _ember["default"].Route.extend({
		model: function model(params) {
			return params.session_id;
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
define('ttexp/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'];
});
define('ttexp/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _emberSimpleAuthSessionStoresAdaptive) {
  exports['default'] = _emberSimpleAuthSessionStoresAdaptive['default'].extend();
});
define("ttexp/templates/admin/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "triple-curlies"
          },
          "revision": "Ember@2.4.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 167
            }
          },
          "moduleName": "ttexp/templates/admin/index.hbs"
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
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.1",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 60
            }
          },
          "moduleName": "ttexp/templates/admin/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Scenari");
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
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.4.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 10
          }
        },
        "moduleName": "ttexp/templates/admin/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "style", "text-align:center;");
        var el2 = dom.createTextNode("ADMIN INDEX");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "style", "width:200px; margin: 40px auto 0; text-align: center;");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
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
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [4]), 1, 1);
        morphs[2] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "link-to", ["index"], ["id", "button-close", "class", "btn btn-link ttexp-btn ttexp-position-absolute top-left"], 0, null, ["loc", [null, [1, 0], [1, 179]]]], ["block", "link-to", ["admin/scenario"], ["class", "list-group-item"], 1, null, ["loc", [null, [6, 0], [6, 72]]]], ["content", "outlet", ["loc", [null, [10, 0], [10, 10]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("ttexp/templates/admin/scenario", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.1",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 2,
              "column": 167
            }
          },
          "moduleName": "ttexp/templates/admin/scenario.hbs"
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
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.1",
          "loc": {
            "source": null,
            "start": {
              "line": 22,
              "column": 20
            },
            "end": {
              "line": 22,
              "column": 140
            }
          },
          "moduleName": "ttexp/templates/admin/scenario.hbs"
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
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.1",
          "loc": {
            "source": null,
            "start": {
              "line": 23,
              "column": 8
            },
            "end": {
              "line": 23,
              "column": 86
            }
          },
          "moduleName": "ttexp/templates/admin/scenario.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Telefonata");
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
        "revision": "Ember@2.4.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 64,
            "column": 10
          }
        },
        "moduleName": "ttexp/templates/admin/scenario.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "scores-container");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "style", "text-align:center;");
        var el2 = dom.createTextNode("SCENARIO LIST");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "table-responsive");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("table");
        dom.setAttribute(el2, "class", "table table-striped");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("thead");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("th");
        dom.setAttribute(el5, "class", "fit");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("th");
        var el6 = dom.createTextNode("Simulazione");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("th");
        var el6 = dom.createTextNode("Tentativi");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("th");
        var el6 = dom.createTextNode("Media");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tbody");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "class", "fit");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createTextNode("5");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createTextNode("62%");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "class", "fit");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("a");
        dom.setAttribute(el6, "href", "#");
        dom.setAttribute(el6, "class", "btn btn-link disabled");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7, "class", "glyphicon glyphicon-play-circle");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createTextNode("Empatia");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createTextNode("-");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createTextNode("-");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "class", "fit");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("a");
        dom.setAttribute(el6, "href", "#");
        dom.setAttribute(el6, "class", "btn btn-link disabled");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7, "class", "glyphicon glyphicon-play-circle");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createTextNode("Motivazione");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createTextNode("-");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createTextNode("-");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "class", "fit");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("a");
        dom.setAttribute(el6, "href", "#");
        dom.setAttribute(el6, "class", "btn btn-link disabled");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7, "class", "glyphicon glyphicon-play-circle");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createTextNode("Chiusura");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createTextNode("-");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createTextNode("-");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "class", "fit");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("a");
        dom.setAttribute(el6, "href", "#");
        dom.setAttribute(el6, "class", "btn btn-link disabled");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7, "class", "glyphicon glyphicon-play-circle");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createTextNode("Referenze");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createTextNode("-");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createTextNode("-");
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
        var el1 = dom.createTextNode(" \n");
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
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(fragment, [14, 1, 3, 1]);
        var morphs = new Array(5);
        morphs[0] = dom.createAttrMorph(element0, 'style');
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [1]), 0, 0);
        morphs[3] = dom.createMorphAt(dom.childAt(element1, [3]), 0, 0);
        morphs[4] = dom.createMorphAt(fragment, 18, 18, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["attribute", "style", ["concat", ["background-image: url('./assets/images/results-", ["get", "model", ["loc", [null, [1, 83], [1, 88]]]], ".png');"]]], ["block", "link-to", ["index"], ["id", "button-close", "class", "btn btn-link ttexp-btn ttexp-position-absolute top-left"], 0, null, ["loc", [null, [2, 0], [2, 179]]]], ["block", "link-to", ["play", "start"], ["id", "button-play-1", "class", "btn btn-link"], 1, null, ["loc", [null, [22, 20], [22, 152]]]], ["block", "link-to", ["play", "start"], ["id", "button-play-text-1", "class", "btn-link"], 2, null, ["loc", [null, [23, 8], [23, 98]]]], ["content", "outlet", ["loc", [null, [64, 0], [64, 10]]]]],
      locals: [],
      templates: [child0, child1, child2]
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
        "revision": "Ember@2.4.1",
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
        var el1 = dom.createComment("\n<nav>\n	{{#link-to \"index\"}}Index{{/link-to}}\n	{{#link-to \"help\"}}Help{{/link-to}}\n	{{#link-to \"play\" \"start\" class=\"btn btn-link\"}}Play{{/link-to}}\n</nav>\n");
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
            "revision": "Ember@2.4.1",
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
          "revision": "Ember@2.4.1",
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
          "revision": "Ember@2.4.1",
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
            "revision": "Ember@2.4.1",
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
          "revision": "Ember@2.4.1",
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
        "revision": "Ember@2.4.1",
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
        "revision": "Ember@2.4.1",
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
        "revision": "Ember@2.4.1",
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
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.1",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 5
            },
            "end": {
              "line": 9,
              "column": 70
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
          var el1 = dom.createTextNode("Amministrazione");
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
          "revision": "Ember@2.4.1",
          "loc": {
            "source": null,
            "start": {
              "line": 17,
              "column": 5
            },
            "end": {
              "line": 19,
              "column": 5
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
          var el1 = dom.createTextNode("						");
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
        statements: [["element", "action", ["invalidateSession"], [], ["loc", [null, [18, 33], [18, 63]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.1",
            "loc": {
              "source": null,
              "start": {
                "line": 20,
                "column": 6
              },
              "end": {
                "line": 20,
                "column": 55
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
          "revision": "Ember@2.4.1",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 5
            },
            "end": {
              "line": 21,
              "column": 5
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
          var el1 = dom.createTextNode("						");
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
        statements: [["block", "link-to", ["login"], ["class", "list-group-item"], 0, null, ["loc", [null, [20, 6], [20, 67]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.1",
          "loc": {
            "source": null,
            "start": {
              "line": 47,
              "column": 26
            },
            "end": {
              "line": 47,
              "column": 146
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
    var child4 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.1",
          "loc": {
            "source": null,
            "start": {
              "line": 48,
              "column": 14
            },
            "end": {
              "line": 48,
              "column": 92
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
          var el1 = dom.createTextNode("Telefonata");
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
        "revision": "Ember@2.4.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 171,
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
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "id", "main-menu");
        dom.setAttribute(el5, "class", "list-group");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("a");
        dom.setAttribute(el6, "class", "list-group-item");
        var el7 = dom.createTextNode("Profilo Utente");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("a");
        dom.setAttribute(el6, "class", "list-group-item active");
        var el7 = dom.createTextNode("Simulazioni");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("a");
        dom.setAttribute(el6, "class", "list-group-item");
        var el7 = dom.createTextNode("Storico");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("a");
        dom.setAttribute(el6, "class", "list-group-item");
        var el7 = dom.createTextNode("Messaggi");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("a");
        dom.setAttribute(el6, "class", "list-group-item");
        var el7 = dom.createTextNode("Help");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("a");
        dom.setAttribute(el6, "class", "list-group-item hidden showAndroid");
        var el7 = dom.createTextNode("Esci");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "col-md-9 col-md-offset-3 content");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "row");
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
        var el11 = dom.createTextNode("\n									");
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
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("td");
        dom.setAttribute(el11, "class", "fit");
        var el12 = dom.createComment("");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("td");
        var el12 = dom.createComment("");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("td");
        var el12 = dom.createTextNode("5");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("td");
        var el12 = dom.createTextNode("62%");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n									");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n									");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("tr");
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("td");
        dom.setAttribute(el11, "class", "fit");
        var el12 = dom.createTextNode("\n											");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("a");
        dom.setAttribute(el12, "href", "#");
        dom.setAttribute(el12, "class", "btn btn-link disabled");
        var el13 = dom.createElement("span");
        dom.setAttribute(el13, "class", "glyphicon glyphicon-play-circle");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n										");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("td");
        var el12 = dom.createTextNode("Empatia");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("td");
        var el12 = dom.createTextNode("-");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("td");
        var el12 = dom.createTextNode("-");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n									");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n									");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("tr");
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("td");
        dom.setAttribute(el11, "class", "fit");
        var el12 = dom.createTextNode("\n											");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("a");
        dom.setAttribute(el12, "href", "#");
        dom.setAttribute(el12, "class", "btn btn-link disabled");
        var el13 = dom.createElement("span");
        dom.setAttribute(el13, "class", "glyphicon glyphicon-play-circle");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n										");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("td");
        var el12 = dom.createTextNode("Motivazione");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("td");
        var el12 = dom.createTextNode("-");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("td");
        var el12 = dom.createTextNode("-");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n									");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n									");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("tr");
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("td");
        dom.setAttribute(el11, "class", "fit");
        var el12 = dom.createTextNode("\n											");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("a");
        dom.setAttribute(el12, "href", "#");
        dom.setAttribute(el12, "class", "btn btn-link disabled");
        var el13 = dom.createElement("span");
        dom.setAttribute(el13, "class", "glyphicon glyphicon-play-circle");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n										");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("td");
        var el12 = dom.createTextNode("Chiusura");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("td");
        var el12 = dom.createTextNode("-");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("td");
        var el12 = dom.createTextNode("-");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n									");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n									");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("tr");
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("td");
        dom.setAttribute(el11, "class", "fit");
        var el12 = dom.createTextNode("\n											");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("a");
        dom.setAttribute(el12, "href", "#");
        dom.setAttribute(el12, "class", "btn btn-link disabled");
        var el13 = dom.createElement("span");
        dom.setAttribute(el13, "class", "glyphicon glyphicon-play-circle");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n										");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("td");
        var el12 = dom.createTextNode("Referenze");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("td");
        var el12 = dom.createTextNode("-");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("td");
        var el12 = dom.createTextNode("-");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n									");
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
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("\n	<div class=\"row\">\n		<div class=\"col-sm-3\">\n			<div id=\"main-menu\" class=\"list-group\">\n				<a class=\"list-group-item\">Profilo Utente</a>\n				<a class=\"list-group-item active\">Simulazioni</a>\n				<a class=\"list-group-item\">Storico</a>\n				<a class=\"list-group-item\">Messaggi</a>\n				<a class=\"list-group-item\">Help</a>\n				<a class=\"list-group-item hidden showAndroid\" {{action \"closeApp\"}}>Esci</a>\n			</div>\n		</div>\n		<div class=\"col-sm-9\">\n			<div id=\"main-content\" class=\"panel panel-default\">\n				<div class=\"panel-heading\">\n					<h3 class=\"panel-title\">Salve, <strong>{{firstName}} {{lastName}}</strong>!</h3>\n				</div>\n				<div class=\"panel-body\">\n					<div class=\"table-responsive\">\n						<table class=\"table table-striped\">\n							<thead>\n								<tr>\n									<th class=\"fit\"></th>\n									<th>Simulazione</th>\n									<th>Tentativi</th>\n									<th>Media</th>\n								</tr>\n							</thead>\n							<tbody>\n								<tr>\n									<td class=\"fit\">{{#link-to \"play\" \"start\" id=\"button-play-1\" class=\"btn btn-link\"}}<span class=\"glyphicon glyphicon-play-circle\"></span>{{/link-to}}</td>\n									<td>{{#link-to \"play\" \"start\" id=\"button-play-1\" class=\"btn-link\"}}Telefonata{{/link-to}}</td>\n									<td>5</td>\n									<td>62%</td>\n								</tr>\n								<tr>\n									<td class=\"fit\">\n										<a href=\"#\" class=\"btn btn-link disabled\"><span class=\"glyphicon glyphicon-play-circle\"></span></a>\n									</td>\n									<td>Empatia</td>\n									<td>-</td>\n									<td>-</td>\n								</tr>\n								<tr>\n									<td class=\"fit\">\n										<a href=\"#\" class=\"btn btn-link disabled\"><span class=\"glyphicon glyphicon-play-circle\"></span></a>\n									</td>\n									<td>Motivazione</td>\n									<td>-</td>\n									<td>-</td>\n								</tr>\n								<tr>\n									<td class=\"fit\">\n										<a href=\"#\" class=\"btn btn-link disabled\"><span class=\"glyphicon glyphicon-play-circle\"></span></a>\n									</td>\n									<td>Chiusura</td>\n									<td>-</td>\n									<td>-</td>\n								</tr>\n								<tr>\n									<td class=\"fit\">\n										<a href=\"#\" class=\"btn btn-link disabled\"><span class=\"glyphicon glyphicon-play-circle\"></span></a>\n									</td>\n									<td>Referenze</td>\n									<td>-</td>\n									<td>-</td>\n								</tr>\n							</tbody>\n						</table>\n					</div> \n				</div>\n			</div>\n		</div>\n	</div>\n	");
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
        var element1 = dom.childAt(fragment, [0, 1, 1]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element2, [1, 1, 1]);
        var element4 = dom.childAt(element2, [3]);
        var element5 = dom.childAt(element4, [13]);
        var element6 = dom.childAt(element1, [3, 3, 3, 1, 1, 3, 1]);
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(element3, 0, 0);
        morphs[1] = dom.createMorphAt(element3, 2, 2);
        morphs[2] = dom.createMorphAt(element4, 1, 1);
        morphs[3] = dom.createElementMorph(element5);
        morphs[4] = dom.createMorphAt(element4, 15, 15);
        morphs[5] = dom.createMorphAt(dom.childAt(element6, [1]), 0, 0);
        morphs[6] = dom.createMorphAt(dom.childAt(element6, [3]), 0, 0);
        morphs[7] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "firstName", ["loc", [null, [6, 26], [6, 39]]]], ["content", "lastName", ["loc", [null, [6, 40], [6, 52]]]], ["block", "link-to", ["admin/index"], ["class", "list-group-item"], 0, null, ["loc", [null, [9, 5], [9, 82]]]], ["element", "action", ["closeApp"], [], ["loc", [null, [15, 51], [15, 72]]]], ["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [17, 11], [17, 34]]]]], [], 1, 2, ["loc", [null, [17, 5], [21, 12]]]], ["block", "link-to", ["play", "start"], ["id", "button-play-1", "class", "btn btn-link"], 3, null, ["loc", [null, [47, 26], [47, 158]]]], ["block", "link-to", ["play", "start"], ["id", "button-play-text-1", "class", "btn-link"], 4, null, ["loc", [null, [48, 14], [48, 104]]]], ["content", "outlet", ["loc", [null, [171, 0], [171, 10]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4]
    };
  })());
});
define("ttexp/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.1",
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
        "revision": "Ember@2.4.1",
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
        "revision": "Ember@2.4.1",
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
            "revision": "Ember@2.4.1",
            "loc": {
              "source": null,
              "start": {
                "line": 15,
                "column": 4
              },
              "end": {
                "line": 15,
                "column": 71
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
            var el1 = dom.createTextNode("Risultati");
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
          "revision": "Ember@2.4.1",
          "loc": {
            "source": null,
            "start": {
              "line": 13,
              "column": 2
            },
            "end": {
              "line": 17,
              "column": 2
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
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "id", "scores-button");
          var el2 = dom.createTextNode("\n				");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n			");
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
        statements: [["block", "link-to", ["scores", ["get", "model.scores", ["loc", [null, [15, 24], [15, 36]]]]], ["class", "btn btn-primary"], 0, null, ["loc", [null, [15, 4], [15, 83]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.4.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 30,
                  "column": 32
                },
                "end": {
                  "line": 30,
                  "column": 74
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
            statements: [["content", "item.text", ["loc", [null, [30, 61], [30, 74]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.1",
            "loc": {
              "source": null,
              "start": {
                "line": 29,
                "column": 3
              },
              "end": {
                "line": 31,
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
          statements: [["block", "link-to", ["play", ["get", "item.link", ["loc", [null, [30, 50], [30, 59]]]]], [], 0, null, ["loc", [null, [30, 32], [30, 86]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.1",
            "loc": {
              "source": null,
              "start": {
                "line": 31,
                "column": 3
              },
              "end": {
                "line": 33,
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
            var el2 = dom.createElement("a");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 0]), 0, 0);
            return morphs;
          },
          statements: [["content", "item.text", ["loc", [null, [32, 35], [32, 48]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.1",
          "loc": {
            "source": null,
            "start": {
              "line": 28,
              "column": 2
            },
            "end": {
              "line": 34,
              "column": 2
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
        statements: [["block", "if", [["get", "item.link", ["loc", [null, [29, 9], [29, 18]]]]], [], 0, 1, ["loc", [null, [29, 3], [33, 10]]]]],
        locals: ["item"],
        templates: [child0, child1]
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.1",
          "loc": {
            "source": null,
            "start": {
              "line": 44,
              "column": 0
            },
            "end": {
              "line": 44,
              "column": 167
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
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.4.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 49,
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
        dom.setAttribute(el1, "id", "video-container");
        dom.setAttribute(el1, "class", "cinemaOff hiddenxxx");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("video");
        dom.setAttribute(el2, "id", "video-player");
        dom.setAttribute(el2, "autoplay", "");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("source");
        dom.setAttribute(el3, "src", "assets/media/video1.mp4");
        dom.setAttribute(el3, "type", "video/mp4");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		Your browser does not support the video element.\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "text-container");
        dom.setAttribute(el1, "class", "hidden");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "id", "text-dialog");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "id", "text-baloon");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("audio");
        dom.setAttribute(el1, "autoplay", "");
        dom.setAttribute(el1, "loop", "");
        var el2 = dom.createTextNode("\n	 ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("source");
        dom.setAttribute(el2, "src", "assets/media/music.mp3");
        dom.setAttribute(el2, "type", "audio/mpeg");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	 Your browser does not support the audio element.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode(" \n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "side-chat");
        dom.setAttribute(el1, "class", "minimizedXXX");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "id", "button-chat");
        dom.setAttribute(el2, "class", "btn btn-link ttexp-btn ttexp-position-absolute top-left");
        dom.setAttribute(el2, "role", "button");
        var el3 = dom.createElement("span");
        dom.setAttribute(el3, "class", "glyphicon glyphicon glyphicon-comment");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "id", "button-audio");
        dom.setAttribute(el2, "class", "btn btn-link ttexp-btn ttexp-position-absolute top-right");
        dom.setAttribute(el2, "role", "button");
        var el3 = dom.createElement("span");
        dom.setAttribute(el3, "class", "glyphicon glyphicon-volume-up");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2, "id", "chat-options");
        dom.setAttribute(el2, "class", "list-group ");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("		\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("\n		<li class=\"list-group-item\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenenan massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas.</li>\n		<li class=\"list-group-item\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenenan massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas.</li>\n		<li class=\"list-group-item\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenenan massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas.</li>\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
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
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2, 1]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 1, 1);
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [6, 5]), 1, 1);
        morphs[3] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        morphs[4] = dom.createMorphAt(fragment, 12, 12, contextualElement);
        return morphs;
      },
      statements: [["content", "model.dialog", ["loc", [null, [10, 3], [10, 19]]]], ["block", "if", [["get", "model.scores", ["loc", [null, [13, 8], [13, 20]]]]], [], 0, null, ["loc", [null, [13, 2], [17, 9]]]], ["block", "each", [["get", "model.items", ["loc", [null, [28, 10], [28, 21]]]]], [], 1, null, ["loc", [null, [28, 2], [34, 11]]]], ["block", "link-to", ["index"], ["id", "button-close", "class", "btn btn-link ttexp-btn ttexp-position-absolute top-left"], 2, null, ["loc", [null, [44, 0], [44, 179]]]], ["content", "outlet", ["loc", [null, [48, 0], [48, 10]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("ttexp/templates/scores", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.1",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 2,
              "column": 167
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
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.4.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
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
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "scores-container");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
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
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(3);
        morphs[0] = dom.createAttrMorph(element0, 'style');
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["attribute", "style", ["concat", ["background-image: url('./assets/images/results-", ["get", "model", ["loc", [null, [1, 83], [1, 88]]]], ".png');"]]], ["block", "link-to", ["index"], ["id", "button-close", "class", "btn btn-link ttexp-btn ttexp-position-absolute top-left"], 0, null, ["loc", [null, [2, 0], [2, 179]]]], ["content", "outlet", ["loc", [null, [6, 0], [6, 10]]]]],
      locals: [],
      templates: [child0]
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
  require("ttexp/app")["default"].create({"LOG_ACTIVE_GENERATION":true,"LOG_VIEW_LOOKUPS":true,"name":"ttexp","version":"0.0.0+1ae582ea"});
}

/* jshint ignore:end */
//# sourceMappingURL=ttexp.map