var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.Spacer.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.SpacerView = (function(_super) {
      __extends(SpacerView, _super);

      function SpacerView() {
        return SpacerView.__super__.constructor.apply(this, arguments);
      }

      SpacerView.prototype.template = 'test';

      SpacerView.prototype.className = 'spacer';

      SpacerView.prototype.onRender = function() {
        var className;
        className = _.slugify(this.model.get('style'));
        return this.$el.addClass(className);
      };

      SpacerView.prototype.onShow = function() {
        this.$el.attr("data-content", _.polyglot.t("Update address ") + (" <a href='" + SITEURL + "/dashboard/#/site-profile'>") + _.polyglot.t("here") + "</a> ");
        return this.$el.popover({
          html: true,
          placement: 'top'
        });
      };

      return SpacerView;

    })(Marionette.ItemView);
  });
});
