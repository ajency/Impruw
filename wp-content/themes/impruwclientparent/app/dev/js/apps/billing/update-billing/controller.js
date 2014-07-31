var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'text!apps/billing/update-billing/templates/view.html', 'apps/billing/update-billing/card-details/controller'], function(App, AppController, viewTpl) {
  return App.module('BillingApp.UpdateBilling', function(UpdateBilling, App, Backbone, Marionette, $, _) {
    var LayoutView;
    UpdateBilling.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.layout = this.getLayout();
        this.siteModel = App.request("get:site:model");
        App.vent.trigger("set:active:menu", 'billing');
        this.listenTo(this.layout, "show", (function(_this) {
          return function() {
            return App.execute("when:fetched", _this.siteModel, function() {
              var customerId;
              customerId = _this.siteModel.get('braintree_customer_id');
              return App.execute("show:card", {
                region: _this.layout.cardRegion,
                customerId: customerId
              });
            });
          };
        })(this));
        return this.show(this.layout);
      };

      Controller.prototype.getLayout = function() {
        return new LayoutView;
      };

      return Controller;

    })(AppController);
    LayoutView = (function(_super) {
      __extends(LayoutView, _super);

      function LayoutView() {
        return LayoutView.__super__.constructor.apply(this, arguments);
      }

      LayoutView.prototype.template = viewTpl;

      LayoutView.prototype.onShow = function() {
        return this.$el.find('input[type="checkbox"]').checkbox();
      };

      LayoutView.prototype.regions = {
        cardRegion: '#card-region',
        addressRegion: '#address-region'
      };

      return LayoutView;

    })(Marionette.Layout);
    return App.commands.setHandler("show:billing:info:app", function(opts) {
      return new UpdateBilling.Controller(opts);
    });
  });
});
