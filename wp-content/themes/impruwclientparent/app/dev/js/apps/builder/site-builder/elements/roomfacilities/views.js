var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.RoomFacilities.Views', function(Views, App, Backbone, Marionette, $, _) {
    var EmptyView, RoomFacilitiesItemView;
    RoomFacilitiesItemView = (function(_super) {
      __extends(RoomFacilitiesItemView, _super);

      function RoomFacilitiesItemView() {
        return RoomFacilitiesItemView.__super__.constructor.apply(this, arguments);
      }

      RoomFacilitiesItemView.prototype.className = 'roomfacilities';

      RoomFacilitiesItemView.prototype.tagName = 'li';

      RoomFacilitiesItemView.prototype.template = '{{name}}';

      return RoomFacilitiesItemView;

    })(Marionette.ItemView);
    EmptyView = (function(_super) {
      __extends(EmptyView, _super);

      function EmptyView() {
        return EmptyView.__super__.constructor.apply(this, arguments);
      }

      EmptyView.prototype.className = 'empty-roomfacilities';

      EmptyView.prototype.tagName = 'li';

      EmptyView.prototype.template = 'No Facilities Found';

      return EmptyView;

    })(Marionette.ItemView);
    return Views.RoomFacilitiesView = (function(_super) {
      __extends(RoomFacilitiesView, _super);

      function RoomFacilitiesView() {
        return RoomFacilitiesView.__super__.constructor.apply(this, arguments);
      }

      RoomFacilitiesView.prototype.className = 'room-facilities-container';

      RoomFacilitiesView.prototype.template = "<div class='room-facilities-title'> <h5>{{#polyglot}}Room Features{{/polyglot}}</h5> <h4>{{#polyglot}}Standard Book{{/polyglot}}</h5> </div> <ul class='facilities clearfix'> </ul>";

      RoomFacilitiesView.prototype.itemView = RoomFacilitiesItemView;

      RoomFacilitiesView.prototype.itemViewContainer = '.facilities';

      RoomFacilitiesView.prototype.emptyView = EmptyView;

      RoomFacilitiesView.prototype.onShow = function() {
        this.$el.attr("data-content", _.polyglot.t("Update room facilities") + (" <a href='" + SITEURL + "/dashboard/#/rooms'>") + _.polyglot.t("here") + "</a> ");
        return this.$el.popover({
          html: true,
          placement: 'top'
        });
      };

      return RoomFacilitiesView;

    })(Marionette.CompositeView);
  });
});
