var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.AppState", function(AppState, App, Backbone, Marionette, $, _) {
    var API, APPSTATE, appState, _ref;
    AppState = (function(_super) {
      __extends(AppState, _super);

      function AppState() {
        return AppState.__super__.constructor.apply(this, arguments);
      }

      AppState.prototype.defaults = {
        userId: 0,
        accessToken: _.unique('access-token'),
        loginStatus: true
      };

      AppState.prototype.isLoggedIn = function() {
        return this.get('loginStatus');
      };

      return AppState;

    })(Backbone.Model);
    APPSTATE = (_ref = {}) != null ? _ref : APPSTATE;
    appState = new AppState(APPSTATE);
    appState.on("change:loginStatus", function() {
      return App.commands.execute("app:loginstatus:changed", appState.toJSON());
    });
    API = {
      getAppState: function() {
        return appState;
      }
    };
    App.reqres.setHandler("get:current:appstate", function() {
      return API.getAppState();
    });
    App.reqres.setHandler("get:current:token", function() {
      return appState.get("accessToken");
    });
    App.reqres.setHandler("get:current:loginstatus", function() {
      return appState.get("loginStatus");
    });
    return App.reqres.setHandler("get:current:userid", function() {
      return appState.get("userId");
    });
  });
});
