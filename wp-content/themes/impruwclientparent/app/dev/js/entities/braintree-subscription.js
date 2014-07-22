var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.BraintreeSubscription", function(BraintreeSubscription, App, Backbone, Marionette, $, _) {
    var API;
    BraintreeSubscription = (function(_super) {
      __extends(BraintreeSubscription, _super);

      function BraintreeSubscription() {
        return BraintreeSubscription.__super__.constructor.apply(this, arguments);
      }

      BraintreeSubscription.prototype.name = 'braintreesubscription';

      BraintreeSubscription.prototype.idAttribute = 'subscription_id';

      return BraintreeSubscription;

    })(Backbone.Model);
    API = {
      getSubscriptionById: function(subscriptionId) {
        var subscriptionModel;
        subscriptionModel = new BraintreeSubscription({
          'subscription_id': subscriptionId
        });
        subscriptionModel.fetch();
        return subscriptionModel;
      }
    };
    return App.reqres.setHandler("get:subscription:by:id", function(subscriptionId) {
      return API.getSubscriptionById(subscriptionId);
    });
  });
});
