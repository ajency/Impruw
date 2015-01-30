var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/billing/account-summary/site-addons-info/views'], function(App, AppController) {
  return App.module('BillingApp.SiteAddOnsInfo', function(SiteAddOnsInfo, App, Backbone, Marionette, $, _) {
    SiteAddOnsInfo.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.siteAddOnCollection = App.request("get:all:site:addons");
        return App.execute("when:fetched", this.siteAddOnCollection, (function(_this) {
          return function() {
            _this.view = _this.getView(_this.siteAddOnCollection);
            _this.listenTo(_this.view, "update:selected:addons", _this.updateSelectedAddOns);
            return _this.show(_this.view, {
              loading: true
            });
          };
        })(this));
      };

      Controller.prototype.getView = function(siteAddOnCollection) {
        if ((IS_SITEADDON_ALLOWED === 1) && (PLAN_FEATURE_COUNT['site_add_ons'][0]['allowed_count'] > 0)) {
          return new SiteAddOnsInfo.View.SiteAddOnsInfoView({
            collection: siteAddOnCollection
          });
        } else {
          return new SiteAddOnsInfo.View.DisabledSiteAddOnsInfo;
        }
      };

      Controller.prototype.updateSelectedAddOns = function(selectedAddOns) {
        var data, responseFn;
        data = {
          selectedAddOns: selectedAddOns
        };
        responseFn = (function(_this) {
          return function(response) {
            return _this.view.triggerMethod("selected:addons:updated", response);
          };
        })(this);
        return $.post("" + AJAXURL + "?action=update-selected-site-addons", data, responseFn, 'json');
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:site:addons:info", function(opts) {
      return new SiteAddOnsInfo.Controller(opts);
    });
  });
});
