var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/billing/payment-page/templates/view.html'], function(App, viewTpl) {
  return App.module('BillingApp.Payment.View', function(View, App, Backbone, Marionette, $, _) {
    View.Layout = (function(_super) {
      __extends(Layout, _super);

      function Layout() {
        return Layout.__super__.constructor.apply(this, arguments);
      }

      Layout.prototype.template = viewTpl;

      Layout.prototype.regions = {
        selectedPlanRegion: '#selected-plan'
      };

      Layout.prototype.onShow = function() {
        this.$el.find('input[type="checkbox"]').checkbox();
        return this.$el.find('select').selectpicker();
      };

      Layout.prototype.serializeData = function() {
        var data;
        data = Layout.__super__.serializeData.call(this);
        data.THEMEURL = THEMEURL;
        return data;
      };

      Layout.prototype.events = {
        'click #btn-pay': function() {
          var cardNumber, client, clientToken, expMonth, expYear;
          this.$el.find('#pay_loader').show();
          cardNumber = this.$el.find('#card_number').val();
          expMonth = this.$el.find('#exp_month').val();
          expYear = this.$el.find('#exp_year').val();
          clientToken = this.model.get('braintree_client_token');
          client = new braintree.api.Client({
            clientToken: clientToken
          });
          return client.tokenizeCard({
            number: cardNumber,
            expiration_month: expMonth,
            expiration_year: expYear
          }, (function(_this) {
            return function(err, nonce) {
              return _this.trigger("credit:card:payment", nonce);
            };
          })(this));
        }
      };

      Layout.prototype.onPaymentSuccess = function() {
        var html;
        this.$el.find('#billingsave_status').empty();
        this.$el.find('#pay_loader').hide();
        html = '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"> &times; </button> {{#polyglot}}Payment Processed{{/polyglot}}';
        return this.$el.find('#billingsave_status').append(html);
      };

      Layout.prototype.onPaymentError = function(errorMsg) {
        var html;
        this.$el.find('#billingsave_status').empty();
        this.$el.find('#pay_loader').hide();
        html = "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> " + errorMsg;
        return this.$el.find('#billingsave_status').append(html);
      };

      return Layout;

    })(Marionette.Layout);
    return View.SelectedPlanView = (function(_super) {
      __extends(SelectedPlanView, _super);

      function SelectedPlanView() {
        return SelectedPlanView.__super__.constructor.apply(this, arguments);
      }

      SelectedPlanView.prototype.template = '<div class="panel-heading"> <h3>{{plan_name}}</h3> </div> <div class="panel-body"> <h3 class="panel-title price">${{price}}</h3> </div> <ul class="list-group"> <li class="list-group-item">{{description}}</li> <li class="list-group-item"><span class="ribbon">Chosen Plan</span></li> </ul>';

      SelectedPlanView.prototype.className = 'panel panel-default text-center active';

      return SelectedPlanView;

    })(Marionette.ItemView);
  });
});
