var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/my-profile/edit/controller'], function(App) {
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
        var edit;
        return edit = new MyProfileApp.Edit.Controller;
      }
    };
    return MyProfileApp.on({
      'start': function() {
        return new MyProfileApp.Router({
          controller: API
        });
      }
    });
  });
});
