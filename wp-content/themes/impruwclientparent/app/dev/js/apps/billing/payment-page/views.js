var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/billing/payment-page/templates/view.html', 'text!apps/billing/payment-page/templates/newpaymentView.html', 'text!apps/billing/payment-page/templates/paymentView.html'], function(App, viewTpl, newpaymentViewTpl, paymentViewTpl) {
  return App.module('BillingApp.Payment.View', function(View, App, Backbone, Marionette, $, _) {
    View.Layout = (function(_super) {
      __extends(Layout, _super);

      function Layout() {
        return Layout.__super__.constructor.apply(this, arguments);
      }

      Layout.prototype.template = viewTpl;

      Layout.prototype.regions = {
        selectedPlanRegion: '#selected-plan',
        activeSubscriptionRegion: '#active-sub-region',
        paymentRegion: '#payment-region'
      };

      return Layout;

    })(Marionette.Layout);
    View.SelectedPlanView = (function(_super) {
      __extends(SelectedPlanView, _super);

      function SelectedPlanView() {
        return SelectedPlanView.__super__.constructor.apply(this, arguments);
      }

      SelectedPlanView.prototype.template = '<div class="panel-heading"> <h3>{{plan_name}}</h3> </div> <div class="panel-body"> <h3 class="panel-title price">${{price}}</h3> </div> <ul class="list-group"> <li class="list-group-item"><span class="ribbon">Chosen Plan</span></li> </ul>';

      SelectedPlanView.prototype.className = 'panel panel-default text-center active';

      return SelectedPlanView;

    })(Marionette.ItemView);
    View.ActiveSubscriptionView = (function(_super) {
      __extends(ActiveSubscriptionView, _super);

      function ActiveSubscriptionView() {
        return ActiveSubscriptionView.__super__.constructor.apply(this, arguments);
      }

      ActiveSubscriptionView.prototype.template = '<div class="col-sm-6 left"> <h6 class="aj-imp-sub-head"> <small>{{#polyglot}}Active Plan: {{/polyglot}}</small> {{plan_name}} </h6> </div> <div class="col-sm-6 right"> <h6 class="aj-imp-sub-head"> <small>{{#polyglot}}Active Since: {{/polyglot}}</small> {{start_date}} </h6> </div>';

      ActiveSubscriptionView.prototype.className = 'aj-imp-widget-head row';

      return ActiveSubscriptionView;

    })(Marionette.ItemView);
    View.FirstPaymentView = (function(_super) {
      __extends(FirstPaymentView, _super);

      function FirstPaymentView() {
        return FirstPaymentView.__super__.constructor.apply(this, arguments);
      }

      FirstPaymentView.prototype.template = newpaymentViewTpl;

      FirstPaymentView.prototype.className = 'col-sm-8';

      FirstPaymentView.prototype.serializeData = function() {
        var data;
        data = FirstPaymentView.__super__.serializeData.call(this);
        data.THEMEURL = THEMEURL;
        return data;
      };

      FirstPaymentView.prototype.onShow = function() {
        this.$el.find('input[type="checkbox"]').checkbox();
        return this.$el.find('select').selectpicker();
      };

      FirstPaymentView.prototype.events = {
        'click #btn-pay': function() {
          var cardNumber, client, clientToken, expMonth, expYear, nameOnCard;
          this.$el.find('#pay_loader').show();
          cardNumber = this.$el.find('#card_number').val();
          nameOnCard = this.$el.find('#card_name').val();
          expMonth = this.$el.find('#exp_month').val();
          expYear = this.$el.find('#exp_year').val();
          clientToken = this.model.get('braintree_client_token');
          client = new braintree.api.Client({
            clientToken: clientToken
          });
          return client.tokenizeCard({
            number: cardNumber,
            cardholderName: nameOnCard,
            expiration_month: expMonth,
            expiration_year: expYear
          }, (function(_this) {
            return function(err, nonce) {
              return _this.trigger("credit:card:payment", nonce);
            };
          })(this));
        }
      };

      FirstPaymentView.prototype.onPaymentSuccess = function() {
        var html;
        this.$el.find('#billingsave_status').empty();
        this.$el.find('#pay_loader').hide();
        html = '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"> &times; </button> Card Added Succesfully';
        return this.$el.find('#billingsave_status').append(html);
      };

      FirstPaymentView.prototype.onPaymentError = function(errorMsg) {
        var html;
        this.$el.find('#billingsave_status').empty();
        this.$el.find('#pay_loader').hide();
        html = "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> " + errorMsg;
        return this.$el.find('#billingsave_status').append(html);
      };

      return FirstPaymentView;

    })(Marionette.ItemView);
    return View.PaymentView = (function(_super) {
      __extends(PaymentView, _super);

      function PaymentView() {
        return PaymentView.__super__.constructor.apply(this, arguments);
      }

      PaymentView.prototype.template = paymentViewTpl;

      PaymentView.prototype.className = 'col-sm-8';

      PaymentView.prototype.serializeData = function() {
        var data;
        data = PaymentView.__super__.serializeData.call(this);
        data.THEMEURL = THEMEURL;
        return data;
      };

      PaymentView.prototype.onShow = function() {
        return this.$el.find('select').selectpicker();
      };

      PaymentView.prototype.events = {
        'click #btn-pay': function() {
          var cardNumber, client, clientToken, cvv, expdate, nameOnCard;
          this.$el.find('#pay_loader').show();
          cardNumber = this.$el.find('#card_number').val();
          nameOnCard = this.$el.find('#card_name').val();
          expdate = this.$el.find('#expiration-date').val();
          cvv = this.$el.find('#card-cvv').val();
          clientToken = this.model.get('braintree_client_token');
          client = new braintree.api.Client({
            clientToken: clientToken
          });
          return client.tokenizeCard({
            number: cardNumber,
            cardholderName: nameOnCard,
            cvv: cvv,
            expiration_date: expdate
          }, (function(_this) {
            return function(err, nonce) {
              var data;
              data = {
                action: "payment-with-stored-card",
                nonce: nonce,
                token: _this.model.get('token')
              };
              return _this.trigger("make:payment:with:stored:card", data);
            };
          })(this));
        }
      };

      PaymentView.prototype.onPaymentSuccess = function() {
        var html;
        this.$el.find('#billingsave_status').empty();
        this.$el.find('#pay_loader').hide();
        html = '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"> &times; </button> Payment Processed';
        return this.$el.find('#billingsave_status').append(html);
      };

      PaymentView.prototype.onPaymentError = function(errorMsg) {
        var html;
        this.$el.find('#billingsave_status').empty();
        this.$el.find('#pay_loader').hide();
        html = "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> " + errorMsg;
        return this.$el.find('#billingsave_status').append(html);
      };

      return PaymentView;

    })(Marionette.ItemView);
  });
});
