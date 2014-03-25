var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/site-profile/edit/controller'], function(App) {
  return App.module('SiteProfileApp', function(SiteProfileApp, App, Backbone, Marionette, $, _) {
    var API;
    SiteProfileApp.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.appRoutes = {
        'site-profile': 'show'
      };

      return Router;

    })(Marionette.AppRouter);
    API = {
      show: function() {
        var edit;
        edit = new SiteProfileApp.Edit.Controller;
        return edit.showSiteProfile();
      }
    };
    return SiteProfileApp.on({
      'start': function() {
        _.logAppMsg("Site Profile Module started...");
        return new SiteProfileApp.Router({
          controller: API
        });
      }
    });
  });
});
