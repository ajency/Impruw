var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageRooms.ChoosePlans.Views', function(Views, App, Backbone, Marionette, $, _) {
    Views.EmptyView = (function(_super) {
      __extends(EmptyView, _super);

      function EmptyView() {
        return EmptyView.__super__.constructor.apply(this, arguments);
      }

      EmptyView.prototype.template = '<div class="empty-info">No Plans found for translation.</div>';

      return EmptyView;

    })(Marionette.ItemView);
    return Views.ChoosePlansView = (function(_super) {
      __extends(ChoosePlansView, _super);

      function ChoosePlansView() {
        return ChoosePlansView.__super__.constructor.apply(this, arguments);
      }

      ChoosePlansView.prototype.template = "<form class='form-horizontal'> <div class='form-group'> <label class='col-sm-3 control-label label-head'>Plans</label> <div class='col-sm-9 col-sm-offset-3'> <select class='js-plan-select' id='js-plan-select'> <option value='-1'>Choose a Plan</option> </select> </div> </div> </form>";

      ChoosePlansView.prototype.events = {
        "click div.js-plan-select ul.selectpicker li": "loadPlanApps"
      };

      ChoosePlansView.prototype.onShow = function() {
        _.each(this.collection.models, (function(_this) {
          return function(model, index) {
            var html, plan_id, plan_name;
            plan_id = model.get('id');
            plan_name = model.get('plan_name');
            html = "<option value='" + plan_id + "' >" + plan_name + "</option>";
            return _this.$el.find('#js-plan-select').append(html);
          };
        })(this));
        this.$el.find("#js-plan-select option[value='-1']").attr({
          'selected': 'selected'
        });
        return this.$el.find('#js-plan-select').selectpicker();
      };

      ChoosePlansView.prototype.loadPlanApps = function(e) {
        var selectedIndex, selectedPlanId;
        selectedIndex = $(e.currentTarget).attr('rel');
        selectedPlanId = $('select#js-plan-select option:eq(' + selectedIndex + ')').attr('value');
        if (selectedPlanId !== '-1') {
          this.trigger('load:original:plans', selectedPlanId);
          return this.trigger('load:translated:plans', selectedPlanId);
        } else {
          this.$el.find('.alert').remove();
          this.$el.append('<div class="alert alert-success">' + _.polyglot.t("Please select a plan to translate") + '</div>');
          return this.$el.find('.alert').fadeOut(5000);
        }
      };

      return ChoosePlansView;

    })(Marionette.ItemView);
  });
});
