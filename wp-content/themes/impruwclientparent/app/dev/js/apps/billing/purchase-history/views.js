var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/billing/purchase-history/templates/view.html'], function(App, viewTpl) {
  return App.module('BillingApp.PurchaseHistory.View', function(View, App, Backbone, Marionette, $, _) {
    return View.Layout = (function(_super) {
      __extends(Layout, _super);

      function Layout() {
        return Layout.__super__.constructor.apply(this, arguments);
      }

      Layout.prototype.initialize = function() {};

      Layout.prototype.template = viewTpl;

      Layout.prototype.onShow = function() {
        this.$el.find('input[type="checkbox"]').checkbox();
        return this.$el.find('select').selectpicker();
      };

      return Layout;

    })(Marionette.Layout);
  });
});
