var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('Dashboard.Home.CurrentSitePlan.View', function(View, App, Backbone, Marionette, $, _) {
    View.CurrentSitePlanView = (function(_super) {
      __extends(CurrentSitePlanView, _super);

      function CurrentSitePlanView() {
        return CurrentSitePlanView.__super__.constructor.apply(this, arguments);
      }

      CurrentSitePlanView.prototype.className = 'aj-imp-help-text';

      CurrentSitePlanView.prototype.template = '<span class="icon icon-info2"></span> <p> {{planHelpText}} {{#polyglot}}Click <a href="#/billing/account-summary">here</a> to view/update your plan details.{{/polyglot}} </p>';

      CurrentSitePlanView.prototype.serializeData = function() {
        var data;
        data = CurrentSitePlanView.__super__.serializeData.call(this);
        data.planHelpText = _.polyglot.t("You are currently active on the " + data.plan_title + " plan.");
        return data;
      };

      return CurrentSitePlanView;

    })(Marionette.ItemView);
    return View.CurrentFreePlanView = (function(_super) {
      __extends(CurrentFreePlanView, _super);

      function CurrentFreePlanView() {
        return CurrentFreePlanView.__super__.constructor.apply(this, arguments);
      }

      CurrentFreePlanView.prototype.className = 'aj-imp-help-text';

      CurrentFreePlanView.prototype.template = '<span class="icon icon-info2"></span> <p> {{#polyglot}}You are currently active on the free plan. To add your own website domain{{/polyglot}} <a href="#/billing/pricing-plans">{{#polyglot}}upgrade your plan{{/polyglot}}</a> {{#polyglot}}and add your website url from your{{/polyglot}} <a href="#/site-profile">{{#polyglot}}site profile{{/polyglot}}</a> </p>';

      return CurrentFreePlanView;

    })(Marionette.ItemView);
  });
});
