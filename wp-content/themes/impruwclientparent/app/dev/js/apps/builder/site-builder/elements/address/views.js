var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.Address.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.AddressView = (function(_super) {
      __extends(AddressView, _super);

      function AddressView() {
        return AddressView.__super__.constructor.apply(this, arguments);
      }

      AddressView.prototype.template = 'test';

      AddressView.prototype.className = 'address';

      AddressView.prototype.onRender = function() {
        var className;
        className = _.slugify(this.model.get('style'));
        this.$el.addClass(className);
        return this.$el.addClass("text-" + (this.model.get('align')));
      };

      AddressView.prototype.onShow = function() {
        this.$el.attr("data-content", _.polyglot.t("Update address ") + (" <a href='" + SITEURL + "/dashboard/#/site-profile' target='BLANK'>") + _.polyglot.t("here") + "</a> ");
        if (this.model.get('phone_link') === 'enable') {
          this.$el.find('.addr-phone').wrap("<a class='phone' href='tel:" + (this.model.get('phone_no')) + "'></a>");
        }
        return this.$el.popover({
          html: true,
          placement: 'top'
        });
      };

      AddressView.prototype.events = {
        'click .phone': function(e) {
          return e.preventDefault();
        }
      };

      return AddressView;

    })(Marionette.ItemView);
  });
});
