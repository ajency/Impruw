var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/billing/site-transaction-history/templates/transaction-history-layout.html', 'text!apps/billing/site-transaction-history/templates/transaction-listing.html'], function(App, transactionHistoryLayoutViewTpl, transactionListingTpl) {
  return App.module('BillingApp.SiteTransactionHistory.View', function(View, App, Backbone, Marionette, $, _) {
    var SingleTranscation;
    View.Layout = (function(_super) {
      __extends(Layout, _super);

      function Layout() {
        return Layout.__super__.constructor.apply(this, arguments);
      }

      Layout.prototype.template = transactionHistoryLayoutViewTpl;

      Layout.prototype.regions = {
        transactionListingRegion: '#transaction-listing'
      };

      Layout.prototype.onRender = function() {
        return this.$el.find('.spinner-markup').spin(this._getOptions());
      };

      Layout.prototype._getOptions = function() {
        return {
          lines: 10,
          length: 6,
          width: 2.5,
          radius: 7,
          corners: 1,
          rotate: 9,
          direction: 1,
          color: '#ff9e2c',
          speed: 1,
          trail: 60,
          shadow: false,
          hwaccel: true,
          className: 'spinner',
          zIndex: 2e9,
          top: '0px',
          left: '40px'
        };
      };

      return Layout;

    })(Marionette.Layout);
    SingleTranscation = (function(_super) {
      __extends(SingleTranscation, _super);

      function SingleTranscation() {
        return SingleTranscation.__super__.constructor.apply(this, arguments);
      }

      SingleTranscation.prototype.template = '<td>{{date}}</td> <td>{{plan_name}}</td> <td>{{description}}</td> <td>&pound; {{amount}}</td> <td><a href="#">' + _.polyglot.t("Print") + '</a></td>';

      SingleTranscation.prototype.tagName = 'tr';

      return SingleTranscation;

    })(Marionette.ItemView);
    View.EmptyView = (function(_super) {
      __extends(EmptyView, _super);

      function EmptyView() {
        return EmptyView.__super__.constructor.apply(this, arguments);
      }

      EmptyView.prototype.template = '<div class="empty-info">' + _.polyglot.t("No transaction history found.") + '</div>';

      return EmptyView;

    })(Marionette.ItemView);
    return View.TransactionListView = (function(_super) {
      __extends(TransactionListView, _super);

      function TransactionListView() {
        return TransactionListView.__super__.constructor.apply(this, arguments);
      }

      TransactionListView.prototype.template = transactionListingTpl;

      TransactionListView.prototype.itemViewContainer = 'tbody';

      TransactionListView.prototype.itemView = SingleTranscation;

      TransactionListView.prototype.onShow = function() {
        this.$el.find('input[type="checkbox"]').radiocheck();
        return this.$el.find('select').selectpicker();
      };

      return TransactionListView;

    })(Marionette.CompositeView);
  });
});
