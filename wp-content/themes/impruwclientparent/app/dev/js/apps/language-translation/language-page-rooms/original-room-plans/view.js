var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/language-translation/language-page-rooms/original-language-rooms/templates/originalroomsview.html'], function(App, originalroomsviewTpl) {
  return App.module('LanguageApp.LanguagePageRooms.OriginalPlans.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.OriginalPlanItemView = (function(_super) {
      __extends(OriginalPlanItemView, _super);

      function OriginalPlanItemView() {
        return OriginalPlanItemView.__super__.constructor.apply(this, arguments);
      }

      OriginalPlanItemView.prototype.template = '<div class="form-group legend-group"> <div class="col-sm-12"> <div class="form-group"> <label class="col-sm-3 control-label" for=""></label> <div class="col-sm-9 col-sm-offset-3"> <h6 class="aj-imp-widget-title">{{#polyglot}}Original Text{{/polyglot}}</h6> </div> </div> </div> </div> <div class="form-group legend-group"> <div class="col-sm-12"> <div class="form-group"> <label class="col-sm-3 control-label" for="">{{#polyglot}}Plan Name{{/polyglot}}</label> <div class="col-sm-9 col-sm-offset-3"> <p class="original title"> {{plan_name}} </p> </div> </div> </div> </div> <div class="form-group legend-group"> <div class="col-sm-12"> <div class="form-group"> <label class="col-sm-3 control-label" for="">{{#polyglot}}Plan Description{{/polyglot}}</label> <div class="col-sm-9 col-sm-offset-3"> <p class="original"> {{plan_description}} </p> </div> </div> </div> </div>';

      return OriginalPlanItemView;

    })(Marionette.ItemView);
  });
});
