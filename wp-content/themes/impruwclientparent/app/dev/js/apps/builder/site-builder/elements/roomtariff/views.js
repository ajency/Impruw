var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/builder/site-builder/elements/roomtariff/template/mainTpl.html'], function(App, mainTpl) {
  return App.module('SiteBuilderApp.Element.RoomTariff.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.RoomTariffView = (function(_super) {
      __extends(RoomTariffView, _super);

      function RoomTariffView() {
        return RoomTariffView.__super__.constructor.apply(this, arguments);
      }

      RoomTariffView.prototype.template = mainTpl;

      RoomTariffView.prototype.onShow = function() {
        this.$el.attr("data-content", "Add/Edit room tariff <a href='" + SITEURL + "/dashboard/#rooms'>here</a> ");
        return this.$el.popover({
          html: true,
          placement: 'top'
        });
      };

      return RoomTariffView;

    })(Marionette.ItemView);
  });
});
