var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/language/show/languageshow'], function(App) {
  return App.module('LanguageApp', function(LanguageApp, App, Backbone, Marionette, $, _) {
    var API;
    LanguageApp.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.appRoutes = {
        'language': 'show'
      };

      return Router;

    })(Marionette.AppRouter);
    API = {
      show: function() {
        var edit;
        return edit = new LanguageApp.Show.Controller({
          region: App.rightRegion
        });
      }
    };
    return LanguageApp.on({
      'start': function() {
        return new LanguageApp.Router({
          controller: API
        });
      }
    });
  });
});
