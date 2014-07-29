var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/billing/account-summary/templates/purchaseHistory.html'], function(App, viewTpl) {
  return App.module('BillingApp.PurchaseHistory.View', function(View, App, Backbone, Marionette, $, _) {
    var SingleTranscation;
    SingleTranscation = (function(_super) {
      __extends(SingleTranscation, _super);

      function SingleTranscation() {
        return SingleTranscation.__super__.constructor.apply(this, arguments);
      }

      SingleTranscation.prototype.template = '<td>{{date}}</td> <td>{{plan_name}}</td> <td>{{description}}</td> <td>&pound; {{amount}}</td>';

      SingleTranscation.prototype.tagName = 'tr';

      return SingleTranscation;

    })(Marionette.ItemView);
    return View.Transaction = (function(_super) {
      __extends(Transaction, _super);

      function Transaction() {
        return Transaction.__super__.constructor.apply(this, arguments);
      }

      Transaction.prototype.template = viewTpl;

      Transaction.prototype.itemViewContainer = 'tbody';

      Transaction.prototype.itemView = SingleTranscation;

      Transaction.prototype.onShow = function() {
        this.$el.find('input[type="checkbox"]').checkbox();
        return this.$el.find('select').selectpicker();
      };

      return Transaction;

    })(Marionette.CompositeView);
  });
});
