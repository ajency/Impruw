var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/billing/site-plans/templates/view.html'], function(App, viewTpl) {
  return App.module('BillingApp.SitePaymentPlans.View', function(View, App, Backbone, Marionette, $, _) {
    var SinglePlanView;
    SinglePlanView = (function(_super) {
      __extends(SinglePlanView, _super);

      function SinglePlanView() {
        return SinglePlanView.__super__.constructor.apply(this, arguments);
      }

      SinglePlanView.prototype.template = '<div class="panel panel-default text-center" id="free-plan"> <div class="panel-heading"> <h3>{{title}}</h3> </div> <div class="panel-body"> <h3 class="panel-title price">{{currencyIsoCode}} {{price}}</h3> <span></span> </div> <ul class="list-group"> <li class="list-group-item">{{#polyglot}}Assisted Set-Up{{/polyglot}}</li> <li class="list-group-item">{{#polyglot}}Unlimited Pages{{/polyglot}}</li> <li class="list-group-item">{{#polyglot}}Easy to use Content Management System (CMS){{/polyglot}}</li> <li class="list-group-item">{{#polyglot}}Mobile and Tablet Ready Site{{/polyglot}}</li> <li class="list-group-item">{{#polyglot}}Facebook/Twitter Widgets{{/polyglot}}</li> <li class="list-group-item">{{#polyglot}}Search Engine Optimisation (SEO){{/polyglot}}</li> <li class="list-group-item">{{#polyglot}}Online Support{{/polyglot}}</li> <li class="list-group-item">{{#polyglot}}Continuous Development{{/polyglot}}</li> {{#plan_features}} <li class="list-group-item">{{count}} x {{name}}</li> {{/plan_features}} <li class="list-group-item"><span class="ribbon"> <a href="javascript:void(0)" class="btn btn-block activate-link free-plan-link">{{#polyglot}}Choose Plan{{/polyglot}}</a></span></li> </ul> </div>';

      SinglePlanView.prototype.className = 'col-sm-4';

      SinglePlanView.prototype.serializeData = function() {
        var data;
        data = SinglePlanView.__super__.serializeData.call(this);
        data.currency = Marionette.getOption(this, 'currency');
        return data;
      };

      return SinglePlanView;

    })(Marionette.ItemView);
    return View.PlansView = (function(_super) {
      __extends(PlansView, _super);

      function PlansView() {
        return PlansView.__super__.constructor.apply(this, arguments);
      }

      PlansView.prototype.template = viewTpl;

      PlansView.prototype.itemView = SinglePlanView;

      PlansView.prototype.itemViewContainer = '.price-plans';

      PlansView.prototype.serializeData = function() {
        var data;
        data = PlansView.__super__.serializeData.call(this);
        data.THEMEURL = THEMEURL;
        return data;
      };

      return PlansView;

    })(Marionette.CompositeView);
  });
});
