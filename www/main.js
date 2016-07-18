require.config({
    paths: {
        'zepto':'zepto',
        'underscore':'underscore',
        'backbone':'backbone',
        'mustache':'mustache',
        'lawnchair':'lawnchair',
        'hydration':'hydration',
        'updateView':'update',
        'downloadView':'download',
        'loadingView':'loading',
        'loadFailed':'load_failed'
    }
});

require(['hydra','zepto','underscore','backbone', 'lawnchair'],

function(Hydra, $, _, Backbone, Lawnchair) {
    document.addEventListener("deviceready", function() {
        app = new Hydra();
    });
}, function(err) {
	console.log("*** hydra error:");
	console.log(err);
});