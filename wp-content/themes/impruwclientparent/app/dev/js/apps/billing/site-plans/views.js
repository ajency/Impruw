var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/billing/site-plans/templates/view.html', 'text!apps/billing/site-plans/templates/pricingLayoutView.html', 'bootbox'], function(App, viewTpl, pricingLayoutViewTpl, bootbox) {
  return App.module('BillingApp.SitePaymentPlans.View', function(View, App, Backbone, Marionette, $, _) {
    var SinglePlanView;
    View.Layout = (function(_super) {
      __extends(Layout, _super);

      function Layout() {
        return Layout.__super__.constructor.apply(this, arguments);
      }

      Layout.prototype.template = pricingLayoutViewTpl;

      Layout.prototype.regions = {
        viewPlanRegion: '#view-site-plans'
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
    SinglePlanView = (function(_super) {
      __extends(SinglePlanView, _super);

      function SinglePlanView() {
        return SinglePlanView.__super__.constructor.apply(this, arguments);
      }

      SinglePlanView.prototype.template = '<div class="panel panel-default text-center"> <div class="panel-heading"> <h3>{{plan_title}}</h3> </div> <div class="panel-body"> <h3 class="panel-title price">{{currency}} {{price}}</h3> <span></span> </div> <ul class="list-group"> <li class="list-group-item">{{#polyglot}}Assisted Set-Up{{/polyglot}}</li> <li class="list-group-item">{{#polyglot}}Unlimited Pages{{/polyglot}}</li> <li class="list-group-item">{{#polyglot}}Easy to use Content Management System (CMS){{/polyglot}}</li> <li class="list-group-item">{{#polyglot}}Mobile and Tablet Ready Site{{/polyglot}}</li> <li class="list-group-item">{{#polyglot}}Facebook/Twitter Widgets{{/polyglot}}</li> <li class="list-group-item">{{#polyglot}}Search Engine Optimisation (SEO){{/polyglot}}</li> <li class="list-group-item">{{#polyglot}}Online Support{{/polyglot}}</li> <li class="list-group-item">{{#polyglot}}Continuous Development{{/polyglot}}</li> {{#plan_features}} {{#is_count_type}}<li class="list-group-item">{{name}} : {{count_display_label}} </li>{{/is_count_type}} {{^is_count_type}}<li class="list-group-item">{{name}}</li>{{/is_count_type}} {{/plan_features}} <li class="list-group-item"> <span class="ribbon"> <a href="#/billing/payment-page" class="btn btn-block activate-link paid-plan-link">{{#polyglot}}Choose Plan{{/polyglot}}</a></span> </li> </ul> </div>';

      SinglePlanView.prototype.className = 'col-md-3';

      SinglePlanView.prototype.serializeData = function() {
        var data;
        data = SinglePlanView.__super__.serializeData.call(this);
        data.currency = COUNTRY_BASED_CURRENCY;
        return data;
      };

      SinglePlanView.prototype.onShow = function() {
        var activateLink, braintreePlanId, newactivateLink, sitePlanId;
        sitePlanId = this.model.get('id');
        braintreePlanId = this.model.get('braintree_plan');
        activateLink = this.$el.find('.activate-link').attr('href');
        newactivateLink = "" + activateLink + "/" + sitePlanId + "/" + braintreePlanId;
        this.$el.find('.activate-link').attr('href', newactivateLink);
        if (this.model.get('id') === PAYMENT_PLAN_ID) {
          this.$el.find('.panel-default').addClass('active');
          this.$el.find('.activate-link').text(_.polyglot.t('Active Plan'));
          return this.$el.find('.activate-link').attr('href', 'javascript:void(0)');
        }
      };

      SinglePlanView.prototype.events = {
        'click .paid-plan-link': function(e) {
          var chosenPlanPrice, currentSubscriptionPrice, currentSubscriptionStatus;
          currentSubscriptionStatus = Marionette.getOption(this, 'currentSubscriptionStatus');
          currentSubscriptionPrice = parseFloat(Marionette.getOption(this, 'currentSubscriptionPrice'));
          chosenPlanPrice = parseFloat(this.model.get('price'));
          if (chosenPlanPrice < currentSubscriptionPrice) {
            e.preventDefault();
            bootbox.alert("<h4 class='delete-message'>" + _.polyglot.t('Sorry , you cannot downgrade plans mid cycle') + ("</h4><p>" + (_.polyglot.t('If you wish to subscribe to a lower plan you could cancel current subscription and then subscribe to a plan of your choice at the end of the current billing cycle')) + "</p>"));
          }
          if ((chosenPlanPrice > currentSubscriptionPrice) && (currentSubscriptionStatus === 'Canceled')) {
            e.preventDefault();
            bootbox.alert("<h4 class='delete-message'>" + _.polyglot.t('Sorry , you cannot subscribe to another paid plan since your paid subscription is currently canceled') + ("</h4><p>" + (_.polyglot.t('If you wish to subscribe to a another paid plan you could do so at the end of the current billing cycle')) + "</p>"));
          }
          if ((chosenPlanPrice > currentSubscriptionPrice) && (currentSubscriptionStatus === 'Past Due')) {
            e.preventDefault();
            return bootbox.alert("<h4 class='delete-message'>" + _.polyglot.t('Sorry , you cannot subscribe to another paid plan when your current subscription is past payment due') + ("</h4><p>" + (_.polyglot.t('Please verify your card details and make the due payment')) + "</p>"));
          }
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
          currentSubscriptionStatus: Marionette.getOption(this, 'currentSubscriptionStatus'),
          currentSubscriptionPrice: Marionette.getOption(this, 'currentSubscriptionPrice')
        };
      };

      PlansView.prototype.serializeData = function() {
        var data;
        data = PlansView.__super__.serializeData.call(this);
        data.currency = COUNTRY_BASED_CURRENCY;
        data.THEMEURL = THEMEURL;
        return data;
      };

      PlansView.prototype.onShow = function() {
        if (PAYMENT_PLAN_ID === '1') {
          this.$el.find('#free-plan').addClass('active');
          return this.$el.find('#free-plan .free-plan-link').text(_.polyglot.t('Active Plan'));
        }
      };

      PlansView.prototype.events = {
        'click .free-plan-link': function() {
          if (PAYMENT_PLAN_ID !== "1") {
            return bootbox.confirm("<h4 class='delete-message'>" + (_.polyglot.t('Are you sure you want to switch to free plan?')) + "</h4><p>" + (_.polyglot.t('Doing so will cancel your current paid subscription and default free plan will be activated at the end of your current billing cycle')) + "</p>", (function(_this) {
              return function(result) {
                if (result === true) {
                  _this.$el.find('#pay_loader').show();
                  return _this.trigger("switch:to:free:plan");
                }
              };
            })(this));
          }
        }
      };

      return PlansView;

    })(Marionette.CompositeView);
  });
});
