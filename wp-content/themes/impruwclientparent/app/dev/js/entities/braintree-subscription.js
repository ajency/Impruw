var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.BraintreeSubscriptions", function(BraintreeSubscriptions, App, Backbone, Marionette, $, _) {
    var API, BraintreeSubscription;
    BraintreeSubscription = (function(_super) {
      __extends(BraintreeSubscription, _super);

      function BraintreeSubscription() {
        return BraintreeSubscription.__super__.constructor.apply(this, arguments);
      }

      BraintreeSubscription.prototype.name = 'braintree-subscription';

      BraintreeSubscription.prototype.idAttribute = 'id';

      BraintreeSubscription.prototype.sync = function(method, entity, options) {
        var xhr;
        if (options == null) {
          options = {};
        }
        xhr = window._bsync(method, entity, options);
        if (method === 'read') {
          return entity._fetch = xhr;
        }
      };

      BraintreeSubscription.prototype.url = function() {
        return "" + SITEURL + "/api/ajbilling/braintreeSubscription/" + (this.get("object_id")) + "/site";
      };

      return BraintreeSubscription;

    })(Backbone.Model);
    API = {
      getActiveBraintreeSubscription: function(siteId) {
        var activeSubscriptionModel;
        activeSubscriptionModel = new BraintreeSubscription({
          'object_id': SITEID["id"]
        });
        activeSubscriptionModel.fetch();
        return activeSubscriptionModel;
      }
    };
    return App.reqres.setHandler("get:active:subscription", function(siteId) {
      return API.getActiveBraintreeSubscription(siteId);
    });
  });
});
