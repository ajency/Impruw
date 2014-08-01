var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module('BillingApp.PendingSubscription', function(PendingSubscription, App, Backbone, Marionette, $, _) {
    PendingSubscription.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var pendingSubscriptionModel;
        this.subscriptionId = opts.subscriptionId;
        pendingSubscriptionModel = App.request("get:pending:subscription", this.subscriptionId);
        return App.execute("when:fetched", pendingSubscriptionModel, (function(_this) {
          return function() {
            var status;
            status = pendingSubscriptionModel.get('pending');
            if (status === true) {
              _this.view = _this.getView(pendingSubscriptionModel);
            } else {
              _this.subscriptionModel = App.request("get:subscription:by:id", _this.subscriptionId);
              _this.view = _this.getLinkView(_this.subscriptionModel);
            }
            _this.listenTo(_this.view, "switch:to:free:plan", _this.deactiveSubscription);
            return _this.show(_this.view, {
              loading: true
            });
          };
        })(this));
      };

      Controller.prototype.getView = function(pendingSubscriptionModel) {
        return new PendingSubscription.View({
          model: pendingSubscriptionModel
        });
      };

      Controller.prototype.getLinkView = function() {
        return new PendingSubscription.LinkView({
          model: this.subscriptionModel
        });
      };

      Controller.prototype.deactiveSubscription = function() {
        return App.execute("when:fetched", this.subscriptionModel, (function(_this) {
          return function() {
            var cancelDate, options, status;
            status = _this.subscriptionModel.get('status');
            cancelDate = _this.subscriptionModel.get('bill_end');
            options = {
              method: 'POST',
              url: AJAXURL,
              data: {
                'currentSubscriptionId': _this.subscriptionId,
                'cancelDate': cancelDate,
                'status': status,
                'action': 'change-to-free-plan'
              }
            };
            return $.ajax(options).done(function(response) {
              return _this.view.triggerMethod("plan:deactivated");
            });
          };
        })(this));
      };

      return Controller;

    })(AppController);
    PendingSubscription.View = (function(_super) {
      __extends(View, _super);

      function View() {
        return View.__super__.constructor.apply(this, arguments);
      }

      View.prototype.template = '<div> Your subscription to <b>{{plan_name}}</b> will begin at the end of current billing cycle. You will be billed for your selected plan on <b> {{start_date}} </b>(except free plan). If you have decided to opt for the free plan, your current plan will not be renewed and you will lose your domain name</div>';

      return View;

    })(Marionette.ItemView);
    PendingSubscription.LinkView = (function(_super) {
      __extends(LinkView, _super);

      function LinkView() {
        return LinkView.__super__.constructor.apply(this, arguments);
      }

      LinkView.prototype.template = '<a href="javascript:void(0)" class="red-link" id="deactivate-sub"> <span class="glyphicon glyphicon-ban-circle"></span> Deactivate Subscription</a> <img src="{{THEMEURL}}/images/loader.gif" width="38" height="30" id="pay_loader" style="display:none "> <div class="alert alert-success" id="display-msg" style="display:none;"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true"> &times; </button> {{#polyglot}}Plan deactivated.{{/polyglot}} </div>';

      LinkView.prototype.events = {
        'click #deactivate-sub ': function() {
          if (confirm("Deactivate plan?")) {
            this.$el.find('#pay_loader').show();
            return this.trigger("switch:to:free:plan");
          }
        }
      };

      LinkView.prototype.serializeData = function() {
        var data;
        data = LinkView.__super__.serializeData.call(this);
        data.THEMEURL = THEMEURL;
        return data;
      };

      LinkView.prototype.onShow = function() {
        var planName;
        planName = this.model.get('plan_name');
        if (planName === 'Free') {
          return this.$el.hide();
        }
      };

      LinkView.prototype.onPlanDeactivated = function() {
        this.$el.find('#pay_loader').hide();
        return this.$el.find('#display-msg').show();
      };

      return LinkView;

    })(Marionette.ItemView);
    return App.commands.setHandler("show:pending:subscription", function(opts) {
      return new PendingSubscription.Controller(opts);
    });
  });
});
