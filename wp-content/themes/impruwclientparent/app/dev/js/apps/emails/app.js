var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/emails/show/controller'], function(App) {
  return App.module('EmailsApp', function(EmailsApp, App, Backbone, Marionette, $, _) {
    var API;
    EmailsApp.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.appRoutes = {
        'emails': 'show'
      };

      return Router;

    })(Marionette.AppRouter);
    API = {
      show: function() {
        return new EmailsApp.Show.Controller({
          region: App.rightRegion
        });
      }
    };
    return EmailsApp.on({
      'start': function() {
        return new EmailsApp.Router({
          controller: API
        });
      }
    });
  });
});
