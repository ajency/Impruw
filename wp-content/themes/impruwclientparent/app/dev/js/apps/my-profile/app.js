var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/my-profile/show/controller', 'apps/my-profile/general/controller', 'apps/my-profile/password/controller', 'apps/my-profile/language/controller'], function(App) {
  return App.module('MyProfileApp', function(MyProfileApp, App, Backbone, Marionette, $, _) {
    var API;
    MyProfileApp.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.appRoutes = {
        'my-profile': 'show'
      };

      return Router;

    })(Marionette.AppRouter);
    API = {
      show: function() {
        return new MyProfileApp.Show.Controller({
          region: App.rightRegion
        });
      }
    };
    MyProfileApp.on({
      'start': function() {
        return new MyProfileApp.Router({
          controller: API
        });
      }
    });
    return App.commands.setHandler("show:myprofile:app", function() {
      return API.show();
    });
  });
});
