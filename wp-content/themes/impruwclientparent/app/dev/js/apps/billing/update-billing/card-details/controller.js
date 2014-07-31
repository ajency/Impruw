var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'text!apps/billing/update-billing/templates/cardView.html'], function(App, AppController, viewTpl) {
  return App.module('BillingApp.CardDetails', function(CardDetails, App, Backbone, Marionette, $, _) {
    var CardView;
    CardDetails.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var brainTreeCustomerId, creditCardModel;
        brainTreeCustomerId = opts.customerId;
        creditCardModel = App.request("get:card:info", brainTreeCustomerId);
        return App.execute("when:fetched", creditCardModel, (function(_this) {
          return function() {
            var cardExists;
            cardExists = creditCardModel.get('card_exists');
            if (cardExists === true) {
              _this.view = _this.getCardView(creditCardModel);
            }
            return _this.show(_this.view);
          };
        })(this));
      };

      Controller.prototype.getCardView = function(creditCardModel) {
        return new CardView({
          model: creditCardModel
        });
      };

      return Controller;

    })(AppController);
    CardView = (function(_super) {
      __extends(CardView, _super);

      function CardView() {
        return CardView.__super__.constructor.apply(this, arguments);
      }

      CardView.prototype.template = '<div class=""> <label class="">Name on the Card</label> <div class=""> <span>{{customer_name}}</span> </div> </div> <div class=""> <label class="">Card Number</label> <div class=""> <span>{{card_number}}</span> </div> </div> <div class=""> <label class="">CVV</label> <div class=""> <span>***</span> </div> </div> <div class=""> <label class="">Expires On</label> <div class=""> <span>{{expiration_date}}</span> </div> </div> <a href="javascript:void(0)" id="forget-card">Forget Card</a>';

      CardView.prototype.onShow = function() {
        return this.$el.find('select').selectpicker();
      };

      return CardView;

    })(Marionette.ItemView);
    return App.commands.setHandler("show:card", function(opts) {
      return new CardDetails.Controller(opts);
    });
  });
});
