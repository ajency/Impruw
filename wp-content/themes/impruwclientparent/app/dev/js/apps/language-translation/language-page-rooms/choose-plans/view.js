var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageRooms.ChoosePlans.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.ChoosePlansView = (function(_super) {
      __extends(ChoosePlansView, _super);

      function ChoosePlansView() {
        return ChoosePlansView.__super__.constructor.apply(this, arguments);
      }

      ChoosePlansView.prototype.template = "<form class='form-horizontal'> Pick a Plan: <select class='js-plan-select' id='js-plan-select'> <option value='-1'>Choose a Plan</option> </select> </form>";

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
        this.trigger('load:original:plans', selectedPlanId);
        return this.trigger('load:translated:plans', selectedPlanId);
      };

      return ChoosePlansView;

    })(Marionette.ItemView);
  });
});
