// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['app', 'apps/login/show/controller'], function(App) {
    return App.module('LoginApp', function(LoginApp, App, Backbone, Marionette, $, _) {
      var API, _ref;
      LoginApp.Router = (function(_super) {
        __extends(Router, _super);

        function Router() {
          _ref = Router.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        Router.prototype.appRoutes = {
          'login': 'showLogin'
        };

        return Router;

      })(Marionette.AppRouter);
      API = {
        showLogin: function() {
          var appState, show;
          appState = App.request("get:current:appstate");
          if (appState.isLoggedIn()) {
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

}).call(this);
