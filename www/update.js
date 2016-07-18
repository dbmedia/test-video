define(
[
    "underscore",
    "backbone",
    "zepto",
    "text!update.html"

], function(
    Underscore,
    Backbone,
    $,
    UpdateTemplate
) {
    
    UpdateView = Backbone.View.extend({

        initialize: function(options) {
            this.hydra = options.model;
            this.render({ force: options.model.firstRun });
        },

        events : {
            "click #downloadNow" : 'startDownload',
            "click #dontDownload": 'startApp'
        },

        startDownload: function() {
            this.hydra.download();
        },

        startApp: function() {
            this.hydra.run();
        },

        render: function(opts) {
            $(document.body).html($(this.el).html(UpdateTemplate));
            if (opts.force) {
                $("#dontDownload").hide();
            }
        }

    });

    return UpdateView;
});
