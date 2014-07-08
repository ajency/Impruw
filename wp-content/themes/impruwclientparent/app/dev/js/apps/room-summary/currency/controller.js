var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/room-summary/currency/views'], function(App, AppController) {
  return App.module('RoomSummaryApp.Currency', function(Currency, App, Backbone, Marionette, $, _) {
    Currency.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.currencyUpdated = __bind(this.currencyUpdated, this);
        this.updateCurrency = __bind(this.updateCurrency, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.sitemodel = opts.model;
        this.view = this.getCurrencyFormView(this.sitemodel);
        this.listenTo(this.view, "update:currency:clicked", this.updateCurrency);
        return this.show(this.view, {
          loading: true
        });
      };

      Controller.prototype.getCurrencyFormView = function(model) {
        return new Currency.View.CurrencyForm({
          model: model
        });
      };

      Controller.prototype.updateCurrency = function(updatedCurrency) {
        this.sitemodel.set(updatedCurrency);
        return this.sitemodel.save(null, {
          wait: true,
          onlyChanged: true,
          success: this.currencyUpdated
        });
      };

      Controller.prototype.currencyUpdated = function() {
        return this.view.triggerMethod("currency:updated");
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:currency:dropdown", function(opts) {
      return new Currency.Controller(opts);
    });
  });
});
