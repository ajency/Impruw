var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('BillingApp.AssistedSetupInfo.View', function(View, App, Backbone, Marionette, $, _) {
    return View.AssistedSetupInfoView = (function(_super) {
      __extends(AssistedSetupInfoView, _super);

      function AssistedSetupInfoView() {
        return AssistedSetupInfoView.__super__.constructor.apply(this, arguments);
      }

      AssistedSetupInfoView.prototype.template = "<div class='aj-imp-widget-head row'> <h6 class='aj-imp-sub-head col-sm-12 text-center'> <small>Need us to help you set up your site?</small> </h6> </div> <br> <p>Below are some of the benefits you can avail of:</p> <ul> <li> Lorem Ipsum available </li> <li> All the Lorem Ipsum generators on the Internet </li> <li> making this the first true generator </li> </ul> <a href='#/billing/payment-page/{{assistedSetupId}}' class='btn btn-sm btn-block aj-imp-orange-btn' id=''> Yes, I'm in! </a>";

      AssistedSetupInfoView.prototype.serializeData = function() {
        var assistedSetupId, data;
        assistedSetupId = Marionette.getOption(this, 'assistedSetupPlanId');
        data = AssistedSetupInfoView.__super__.serializeData.call(this);
        data.assistedSetupId = assistedSetupId;
        return data;
      };

      return AssistedSetupInfoView;

    })(Marionette.ItemView);
  });
});
