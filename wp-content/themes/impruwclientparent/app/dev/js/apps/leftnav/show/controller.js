var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/leftnav/show/views', 'entities/leftnav'], function(App, AppController) {
  return App.module('LeftNav.Show', function(Show, App, Backbone, Marionette, $, _) {
    return Show.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function() {
        this.links = App.request("leftnav:entities");
        this.view = new Show.View.LeftNav({
          collection: this.links
        });
        this.listenTo(App.vent, "set:active:menu", this.setActiveMenu);
        this.listenTo(this.view, "itemview:logout:clicked", this.siteLogoutAjax);
        return this.show(this.view, {
          loading: true
        });
      };

      Controller.prototype.setActiveMenu = function(link) {
        return this.view.triggerMethod("set:active:menu", link);
      };

      Controller.prototype.siteLogoutAjax = function() {
        var options;
        options = {
          url: AJAXURL,
          method: 'POST',
          data: {
            action: 'site-logout'
          }
        };
        return $.ajax(options).done(function(response) {
          return window.location.href = response.redirect_url;
        }).fail(function(resp) {
          return console.log('error');
        });
      };

      return Controller;

    })(AppController);
  });
});
