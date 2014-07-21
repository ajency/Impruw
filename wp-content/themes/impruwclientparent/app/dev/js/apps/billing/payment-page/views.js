var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/billing/payment-page/templates/view.html'], function(App, viewTpl) {
  return App.module('BillingApp.Payment.View', function(View, App, Backbone, Marionette, $, _) {
    View.Layout = (function(_super) {
      __extends(Layout, _super);

      function Layout() {
        return Layout.__super__.constructor.apply(this, arguments);
      }

      Layout.prototype.template = viewTpl;

      Layout.prototype.regions = {
        selectedPlanRegion: '#selected-plan'
      };

      Layout.prototype.onShow = function() {
        this.$el.find('input[type="checkbox"]').checkbox();
        return this.$el.find('select').selectpicker();
      };

      return Layout;

    })(Marionette.Layout);
    View.SelectedPlanView = (function(_super) {
      __extends(SelectedPlanView, _super);

      function SelectedPlanView() {
        return SelectedPlanView.__super__.constructor.apply(this, arguments);
      }

      SelectedPlanView.prototype.template = '<div class="panel-heading"> <h3>{{plan_name}}</h3> </div> <div class="panel-body"> <h3 class="panel-title price">${{price}}</h3> </div> <ul class="list-group"> <li class="list-group-item">{{description}}</li> <li class="list-group-item"><span class="ribbon">Chosen Plan</span></li> </ul>';

      SelectedPlanView.prototype.className = 'panel panel-default text-center active';

      return SelectedPlanView;

    })(Marionette.ItemView);
    return View.NoPlanSelectedView = (function(_super) {
      __extends(NoPlanSelectedView, _super);

      function NoPlanSelectedView() {
        return NoPlanSelectedView.__super__.constructor.apply(this, arguments);
      }

      NoPlanSelectedView.prototype.template = '<div class="panel-heading"> <h3>No plan selected</h3> </div> <div class="panel-body"> </div> <ul class="list-group"> </ul>';

      NoPlanSelectedView.prototype.className = 'panel panel-default text-center active';

      return NoPlanSelectedView;

    })(Marionette.ItemView);
  });
});
