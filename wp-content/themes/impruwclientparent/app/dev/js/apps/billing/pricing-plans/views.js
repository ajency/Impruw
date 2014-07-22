var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/billing/pricing-plans/templates/view.html'], function(App, viewTpl) {
  return App.module('BillingApp.PaymentPlans.View', function(View, App, Backbone, Marionette, $, _) {
    var SinglePlanView;
    SinglePlanView = (function(_super) {
      __extends(SinglePlanView, _super);

      function SinglePlanView() {
        return SinglePlanView.__super__.constructor.apply(this, arguments);
      }

      SinglePlanView.prototype.template = '<div class="panel panel-default text-center"> <div class="panel-heading"> <h3>{{plan_name}}</h3> </div> <div class="panel-body"> <h3 class="panel-title price">&#163; {{price}}</h3> </div> <ul class="list-group"> <li class="list-group-item">Mobile & Tablet Ready Site</li> <li class="list-group-item">Unlimited Pages</li> <li class="list-group-item">5 Languages</li> <li class="list-group-item">Flexible, easy-to-use Site builder</li> <li class="list-group-item">24/7 security monitoring</li> <li class="list-group-item">24/7 technical support</li> <li class="list-group-item"><span class="ribbon"> <a href="#/billing/payment-page" class="btn btn-block activate-link">Choose Plan</a></span></li> </ul> </div>';

      SinglePlanView.prototype.className = 'col-sm-4';

      SinglePlanView.prototype.serializeData = function() {
        var data;
        data = SinglePlanView.__super__.serializeData.call(this);
        data.currency = Marionette.getOption(this, 'currency');
        return data;
      };

      SinglePlanView.prototype.onShow = function() {
        var activateLink, collectionModelPlanId, newactivateLink, siteModelPlanId;
        siteModelPlanId = this.model.get('plan_id');
        collectionModelPlanId = Marionette.getOption(this, 'activeBraintreePlanID');
        activateLink = this.$el.find('.activate-link').attr('href');
        newactivateLink = "" + activateLink + "/" + siteModelPlanId;
        this.$el.find('.activate-link').attr('href', newactivateLink);
        if (siteModelPlanId === collectionModelPlanId) {
          this.$el.find('.panel-default').addClass('active');
          this.$el.find('.activate-link').text('Active Plan');
          return this.$el.find('.activate-link').attr('href', 'javascript:void(0)');
        }
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

      PlansView.prototype.itemViewOptions = function() {
        return {
          currency: this.model.get('currency'),
          activeBraintreePlanID: this.model.get('braintree_plan_id')
        };
      };

      return PlansView;

    })(Marionette.CompositeView);
  });
});
