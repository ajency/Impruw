var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/billing/show/controller'], function(App) {
  return App.module('BillingApp', function(BillingApp, App, Backbone, Marionette, $, _) {
    var API;
    BillingApp.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.appRoutes = {
        'billing': 'show'
      };

      return Router;

    })(Marionette.AppRouter);
    API = {
      show: function() {
        return new BillingApp.Show.Controller({
          region: App.rightRegion
        });
      }
    };
    BillingApp.on({
      'start': function() {
        return new BillingApp.Router({
          controller: API
        });
      }
    });
    return App.commands.setHandler("show:billing:app", function() {
      return API.show();
    });
  });
});
