var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/room-summary/currency/templates/currencyForm.html'], function(App, currencyformTpl) {
  return App.module('RoomSummaryApp.Currency.View', function(View, App, Backbone, Marionette, $, _) {
    return View.CurrencyForm = (function(_super) {
      __extends(CurrencyForm, _super);

      function CurrencyForm() {
        return CurrencyForm.__super__.constructor.apply(this, arguments);
      }

      CurrencyForm.prototype.tagName = 'form';

      CurrencyForm.prototype.template = currencyformTpl;

      CurrencyForm.prototype.className = 'form-horizontal clearfix';

      CurrencyForm.prototype.onShow = function() {
        var currentCurrency;
        currentCurrency = this.model.get('currency');
        this.$el.find("#user_currency option[value = '" + currentCurrency + "']").attr('selected', 'selected');
        return this.$el.find('#user_currency').selectpicker();
      };

      CurrencyForm.prototype.events = {
        'click #btn_update_currency': function() {
          var updatedCurrency;
          updatedCurrency = {
            'currency': this.$el.find('#user_currency').val()
          };
          return this.trigger("update:currency:clicked", updatedCurrency);
        }
      };

      CurrencyForm.prototype.onCurrencyUpdated = function() {
        this.$el.find('.alert').remove();
        return this.$el.prepend('<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + _.polyglot.t('Currency updated') + '</div>');
      };

      return CurrencyForm;

    })(Marionette.ItemView);
  });
});
