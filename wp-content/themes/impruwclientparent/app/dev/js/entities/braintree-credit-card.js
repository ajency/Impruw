var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.CreditCard", function(BraintreecreditCard, App, Backbone, Marionette, $, _) {
    var API, CreditCard;
    CreditCard = (function(_super) {
      __extends(CreditCard, _super);

      function CreditCard() {
        return CreditCard.__super__.constructor.apply(this, arguments);
      }

      CreditCard.prototype.name = 'creditcard';

      CreditCard.prototype.idAttribute = 'customer_id';

      return CreditCard;

    })(Backbone.Model);
    API = {
      getCardById: function(customerId) {
        var creditCardModel;
        creditCardModel = new CreditCard({
          'customer_id': customerId
        });
        creditCardModel.fetch();
        return creditCardModel;
      }
    };
    return App.reqres.setHandler("get:card:info", function(customerId) {
      return API.getCardById(customerId);
    });
  });
});
