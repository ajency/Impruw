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
        var activateLink, activePlanID, billEnd, billStart, domainName, html, newactivateLink, pendingPlanID, siteModelPlanId, startDate;
        siteModelPlanId = this.model.get('plan_id');
        activePlanID = Marionette.getOption(this, 'activePlanID');
        pendingPlanID = Marionette.getOption(this, 'pendingPlanID');
        domainName = Marionette.getOption(this, 'domainName');
        activateLink = this.$el.find('.activate-link').attr('href');
        newactivateLink = "" + activateLink + "/" + siteModelPlanId;
        this.$el.find('.activate-link').attr('href', newactivateLink);
        if (siteModelPlanId === activePlanID) {
          this.$el.find('.panel-default').addClass('active');
          this.$el.find('.activate-link').text('Active Plan');
          this.$el.find('.activate-link').attr('href', 'javascript:void(0)');
          billStart = Marionette.getOption(this, 'billStart');
          billEnd = Marionette.getOption(this, 'billEnd');
          html = "<span class='active'>Domain name: " + domainName + "</span> <span class='active'>Billing cycle:From " + billStart + " to " + billEnd + " </span>";
          this.$el.find('.panel-body').append(html);
        }
        if (siteModelPlanId === pendingPlanID) {
          this.$el.find('.panel-heading').append('<span class="pending">Pending Activation</span>');
          startDate = Marionette.getOption(this, 'startDate');
          html = "<span class='pending'>Domain name: " + domainName + "</span> <span class='pending'>Will activate on: " + startDate + " </span>";
          this.$el.find('.panel-body').append(html);
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

      PlansView.prototype.serializeData = function() {
        var data;
        data = PlansView.__super__.serializeData.call(this);
        data.THEMEURL = THEMEURL;
        return data;
      };

      PlansView.prototype.itemViewOptions = function() {
        return {
          currency: Marionette.getOption(this, 'currency'),
          activePlanID: Marionette.getOption(this, 'activePlanId'),
          pendingPlanID: Marionette.getOption(this, 'pendingPlanId'),
          domainName: Marionette.getOption(this, 'domainName'),
          billStart: Marionette.getOption(this, 'billStart'),
          billEnd: Marionette.getOption(this, 'billEnd'),
          startDate: Marionette.getOption(this, 'startDate')
        };
      };

      PlansView.prototype.onShow = function() {
        var activePlanID, html, pendingPlanID, siteName, startDate;
        activePlanID = Marionette.getOption(this, 'activePlanId');
        pendingPlanID = Marionette.getOption(this, 'pendingPlanId');
        if (activePlanID === 'Free') {
          this.$el.find('#free-plan').addClass('active');
          this.$el.find('#free-plan .free-plan-link').text('Active Plan');
        }
        if (pendingPlanID === 'Free') {
          this.$el.find('#free-plan .panel-heading').append('<span class="pending">Pending Activation</span>');
          startDate = Marionette.getOption(this, 'startDate');
          siteName = Marionette.getOption(this, 'siteName');
          html = "<span class='pending'>Domain name: " + siteName + ".impruw.com</span> <span class='pending'>Will activate on: " + startDate + " </span>";
          return this.$el.find('#free-plan .panel-body').append(html);
        }
      };

      PlansView.prototype.events = {
        'click .free-plan-link': function() {
          var activePlanID;
          activePlanID = Marionette.getOption(this, 'activePlanId');
          if (activePlanID !== "Free") {
            if (confirm("Switch to free plan?")) {
              this.$el.find('#pay_loader').show();
              return this.trigger("switch:to:free:plan");
            }
          }
        }
      };

      PlansView.prototype.onFreePlanSwitch = function() {
        var html;
        this.$el.find('#pay_loader').hide();
        html = "<div class='alert alert-success'> <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> Switched to free plan after end of billing cycle. </div>";
        return this.$el.find('#billingsave_status').append(html);
      };

      return PlansView;

    })(Marionette.CompositeView);
  });
});
