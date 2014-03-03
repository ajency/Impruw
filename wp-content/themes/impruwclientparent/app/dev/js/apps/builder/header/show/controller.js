var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/builder/header/show/views'], function(App, AppController) {
  App.module('HeaderApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    return Show.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opt) {
        var pages, view;
        if (opt == null) {
          opt = {};
        }
        pages = App.request("get:editable:pages");
        view = new Show.Views.MainView({
          collection: pages
        });
        this.listenTo(view, 'editable:page:changed', function(pageId) {
          $.cookie('current-page-id', pageId);
          return App.execute("editable:page:changed", pageId);
        });
        return this.show(view, {
          loading: true
        });
      };

      return Controller;

    })(AppController);
  });
  return App.HeaderApp.Show.Controller;
});
