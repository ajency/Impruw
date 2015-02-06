var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('BillingApp.AssistedSetupInfo.View', function(View, App, Backbone, Marionette, $, _) {
    View.AssistedSetupInfoView = (function(_super) {
      __extends(AssistedSetupInfoView, _super);

      function AssistedSetupInfoView() {
        return AssistedSetupInfoView.__super__.constructor.apply(this, arguments);
      }

      AssistedSetupInfoView.prototype.template = "<div class='aj-imp-widget-head row'> <h6 class='aj-imp-sub-head col-sm-12 text-center'> <small>{{#polyglot}}Need us to help you set up your site?{{/polyglot}}</small> </h6> </div> <br/> <p>{{#polyglot}}Our Website Builder allows you to create your own website by simply dragging and dropping new elements onto the page. But if you're too busy or just don't want to, select our Assisted Set Up Package and one of our developers will build it for you.{{/polyglot}}</p> <br> <p>{{#polyglot}}Below are some of the benefits you can avail of:{{/polyglot}}</p> <ul> <li> {{#polyglot}}1 month Free Hosting{{/polyglot}} </li> <li> {{#polyglot}}Easy to use Content Management System (CMS){{/polyglot}} </li> <li> {{#polyglot}}Mobile and tablet ready site{{/polyglot}} </li> <li> {{#polyglot}}5 x Email Accounts{{/polyglot}} </li> <li> {{#polyglot}}Facebook / Twitter Widgets{{/polyglot}} </li> <li> {{#polyglot}}Search Engine Optimization (SEO){{/polyglot}} </li> <li> {{#polyglot}}Online Support{{/polyglot}} </li> <li> {{#polyglot}}Full Range of Usage Statistics{{/polyglot}} </li> </ul> <a href='#/billing/payment-page/{{assistedSetupId}}' class='btn btn-sm btn-block aj-imp-orange-btn' id=''> {{#polyglot}}Yes, I'm in!{{/polyglot}} </a>";

      AssistedSetupInfoView.prototype.serializeData = function() {
        var assistedSetupId, data;
        assistedSetupId = Marionette.getOption(this, 'assistedSetupPlanId');
        data = AssistedSetupInfoView.__super__.serializeData.call(this);
        data.assistedSetupId = assistedSetupId;
        return data;
      };

      return AssistedSetupInfoView;

    })(Marionette.ItemView);
    return View.AssistedSetupPaidInfoView = (function(_super) {
      __extends(AssistedSetupPaidInfoView, _super);

      function AssistedSetupPaidInfoView() {
        return AssistedSetupPaidInfoView.__super__.constructor.apply(this, arguments);
      }

      AssistedSetupPaidInfoView.prototype.template = " <div class='aj-imp-widget-head row'> <h6 class='aj-imp-sub-head col-sm-12 text-center'> <small>{{#polyglot}}You have already opted for Assisted set up{{/polyglot}}</small> </h6> </div> <br> <p>{{#polyglot}}Below are some of the benefits you can avail of:{{/polyglot}}</p> <ul> <li> {{#polyglot}}Lorem Ipsum available{{/polyglot}} </li> <li> {{#polyglot}}All the Lorem Ipsum generators on the Internet{{/polyglot}} </li> <li> {{#polyglot}}making this the first true generator{{/polyglot}} </li> </ul>";

      return AssistedSetupPaidInfoView;

    })(Marionette.ItemView);
  });
});
