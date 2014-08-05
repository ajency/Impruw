var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/billing/payment-page/templates/view.html', 'text!apps/billing/payment-page/templates/newpaymentView.html', 'text!apps/billing/payment-page/templates/paymentView.html', 'text!apps/billing/payment-page/templates/cardList.html'], function(App, viewTpl, newpaymentViewTpl, paymentViewTpl, cardListTpl) {
  return App.module('BillingApp.Payment.View', function(View, App, Backbone, Marionette, $, _) {
    var SingleCreditCard;
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
    View.NewPaymentView = (function(_super) {
      __extends(NewPaymentView, _super);

      function NewPaymentView() {
        return NewPaymentView.__super__.constructor.apply(this, arguments);
      }

      NewPaymentView.prototype.template = newpaymentViewTpl;

      NewPaymentView.prototype.className = 'col-sm-8';

      NewPaymentView.prototype.serializeData = function() {
        var data;
        data = NewPaymentView.__super__.serializeData.call(this);
        data.THEMEURL = THEMEURL;
        return data;
      };

      NewPaymentView.prototype.onShow = function() {
        this.$el.find('input[type="checkbox"]').checkbox();
        return this.$el.find('select').selectpicker();
      };

      NewPaymentView.prototype.events = {
        'click #btn-pay': function(e) {
          var cardNumber, client, clientToken, cvv, expMonth, expYear, nameOnCard;
          e.preventDefault();
          this.$el.find('#pay_loader').show();
          cardNumber = this.$el.find('#card_number').val();
          nameOnCard = this.$el.find('#card_name').val();
          expMonth = this.$el.find('#exp_month').val();
          expYear = this.$el.find('#exp_year').val();
          cvv = this.$el.find('#card-cvv').val();
          clientToken = this.model.get('braintree_client_token');
          client = new braintree.api.Client({
            clientToken: clientToken
          });
          return client.tokenizeCard({
            number: cardNumber,
            cvv: cvv,
            cardholderName: nameOnCard,
            expiration_month: expMonth,
            expiration_year: expYear
          }, (function(_this) {
            return function(err, nonce) {
              return _this.trigger("new:credit:card:payment", nonce);
            };
          })(this));
        }
      };

      NewPaymentView.prototype.onPaymentSuccess = function() {
        var html;
        this.$el.find('#billingsave_status').empty();
        this.$el.find('#pay_loader').hide();
        html = '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"> &times; </button> Payment Succesfull';
        return this.$el.find('#billingsave_status').append(html);
      };

      NewPaymentView.prototype.onPaymentError = function(errorMsg) {
        var html;
        this.$el.find('#billingsave_status').empty();
        this.$el.find('#pay_loader').hide();
        html = "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> " + errorMsg;
        return this.$el.find('#billingsave_status').append(html);
      };

      return NewPaymentView;

    })(Marionette.ItemView);
    SingleCreditCard = (function(_super) {
      __extends(SingleCreditCard, _super);

      function SingleCreditCard() {
        return SingleCreditCard.__super__.constructor.apply(this, arguments);
      }

      SingleCreditCard.prototype.template = cardListTpl;

      SingleCreditCard.prototype.serializeData = function() {
        var data;
        data = SingleCreditCard.__super__.serializeData.call(this);
        data.THEMEURL = THEMEURL;
        return data;
      };

      SingleCreditCard.prototype.events = {
        'click .btn-pay': function(e) {
          var cvv;
          e.preventDefault();
          console.log(this.model.get('token'));
          console.log(this.model);
          this.$el.find('.loader').show();
          return console.log(cvv = this.$el.find('.card-cvv').val());
        }
      };

      return SingleCreditCard;

    })(Marionette.ItemView);
    return View.PaymentPageView = (function(_super) {
      __extends(PaymentPageView, _super);

      function PaymentPageView() {
        return PaymentPageView.__super__.constructor.apply(this, arguments);
      }

      PaymentPageView.prototype.template = paymentViewTpl;

      PaymentPageView.prototype.itemView = SingleCreditCard;

      PaymentPageView.prototype.itemViewContainer = '.card-list';

      PaymentPageView.prototype.className = 'col-sm-8';

      PaymentPageView.prototype.onShow = function() {
        return this.$el.find('select').selectpicker();
      };

      return PaymentPageView;

    })(Marionette.CompositeView);
  });
});
