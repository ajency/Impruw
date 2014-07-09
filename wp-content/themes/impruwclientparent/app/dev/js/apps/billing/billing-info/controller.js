var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/billing/billing-info/views'], function(App, AppController) {
  return App.module('BillingApp.BillingInfo', function(BillingInfo, App, Backbone, Marionette, $, _) {
    BillingInfo.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.layout = this.getLayout();
        App.vent.trigger("set:active:menu", 'billing');
        return this.show(this.layout);
      };

      Controller.prototype.getLayout = function() {
        return new BillingInfo.View.Layout;
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:billing:info:app", function(opts) {
      return new BillingInfo.Controller(opts);
    });
  });
});
