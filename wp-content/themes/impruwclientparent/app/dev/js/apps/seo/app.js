var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/seo/show/controller', 'apps/seo/seo-language/controller', 'apps/seo/seo-page-nav/controller', 'apps/seo/seo-page-content/controller', 'apps/seo/seo-rooms/show/controller'], function(App) {
  return App.module('SeoApp', function(SeoApp, App, Backbone, Marionette, $, _) {
    var API;
    SeoApp.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.appRoutes = {
        'seo': 'show'
      };

      return Router;

    })(Marionette.AppRouter);
    API = {
      show: function() {
        return App.execute("show:seo", {
          region: App.rightRegion
        });
      }
    };
    return SeoApp.on({
      'start': function() {
        return new SeoApp.Router({
          controller: API
        });
      }
    });
  });
});
