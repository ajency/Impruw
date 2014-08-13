var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/seo/show/view'], function(App, AppController) {
  return App.module('SeoApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    Show.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        this.view = this.getMainView();
        return this.show(this.view, {
          loading: true
        });
      };

      Controller.prototype.getMainView = function() {
        return new Show.View.SeoView;
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:seo", function(opts) {
      return new Show.Controller(opts);
    });
  });
});
