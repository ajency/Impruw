var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/login/show/controller'], function(App) {
  return App.module('LoginApp', function(LoginApp, App, Backbone, Marionette, $, _) {
    var API;
    LoginApp.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        this.login = __bind(this.login, this);
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.appRoutes = {
        'login': 'showLogin'
      };

      Router.prototype.login = function() {
        if (i !== 0) {
          return false;
        }
      };

      return Router;

    })(Marionette.AppRouter);
    API = {
      showLogin: function(opt) {
        var appState, show;
        if (opt == null) {
          opt = {};
        }
        appState = App.request("get:current:appstate");
        if (!appState.isLoggedIn()) {
          return show = new LoginApp.Show.Controller({
            region: App.loginRegion
          });
        } else {
          return App.navigate(App.rootRoute, {
            trigger: true
          });
        }
      }
    };
    LoginApp.on({
      'start': function() {
        _.logAppMsg("LoginApp Module started...");
        return new LoginApp.Router({
          controller: API
        });
      }
    });
    return App.commands.setHandler('app:loginstatus:changed', function(options) {
      var loginStatus;
      loginStatus = options.loginStatus;
      if (loginStatus === false) {
        return API.showLogin();
      }
    });
  });
});
