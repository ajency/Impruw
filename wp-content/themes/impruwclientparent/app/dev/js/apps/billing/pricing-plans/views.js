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
        var activateLink, activePlanID, newactivateLink, pendingPlanID, siteModelPlanId;
        siteModelPlanId = this.model.get('plan_id');
        activePlanID = Marionette.getOption(this, 'activePlanID');
        pendingPlanID = Marionette.getOption(this, 'pendingPlanID');
        activateLink = this.$el.find('.activate-link').attr('href');
        newactivateLink = "" + activateLink + "/" + siteModelPlanId;
        this.$el.find('.activate-link').attr('href', newactivateLink);
        if (siteModelPlanId === activePlanID) {
          this.$el.find('.panel-default').addClass('active');
          this.$el.find('.activate-link').text('Active Plan');
          this.$el.find('.activate-link').attr('href', 'javascript:void(0)');
        }
        if (siteModelPlanId === pendingPlanID) {
          return this.$el.find('.panel-heading').append('<span>selected</span>');
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
          currency: Marionette.getOption(this, 'currency'),
          activePlanID: Marionette.getOption(this, 'activePlanId'),
          pendingPlanID: Marionette.getOption(this, 'pendingPlanId')
        };
      };

      PlansView.prototype.onShow = function() {
        var activePlanID, pendingPlanID;
        activePlanID = Marionette.getOption(this, 'activePlanId');
        pendingPlanID = Marionette.getOption(this, 'pendingPlanId');
        if (activePlanID === 'Free') {
          this.$el.find('#free-plan').addClass('active');
          this.$el.find('#free-plan').text('Active Plan');
        }
        if (pendingPlanID === 'Free') {
          return this.$el.find('#free-plan .panel-heading').append('<span>Selected</span>');
        }
      };

      PlansView.prototype.events = {
        'click .free-plan-link': function() {
          var activePlanID;
          activePlanID = Marionette.getOption(this, 'activePlanId');
          if (activePlanID !== "Free") {
            if (confirm("Switch to free plan?")) {
              return this.trigger("switch:to:free:plan");
            }
          }
        }
      };

      return PlansView;

    })(Marionette.CompositeView);
  });
});
