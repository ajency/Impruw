var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageRooms.OriginalRoomFacilities.Views', function(Views, App, Backbone, Marionette, $, _) {
    var OriginalRoomFacilitiesItemView;
    OriginalRoomFacilitiesItemView = (function(_super) {
      __extends(OriginalRoomFacilitiesItemView, _super);

      function OriginalRoomFacilitiesItemView() {
        return OriginalRoomFacilitiesItemView.__super__.constructor.apply(this, arguments);
      }

      OriginalRoomFacilitiesItemView.prototype.template = ' <div class="form-group"> <label class="col-sm-3 control-label" for="">{{#polyglot}}Facility{{/polyglot}}</label> <div class="col-sm-9 col-sm-offset-3"> <p class="original title">{{facilityName}} </p> </div> </div>';

      return OriginalRoomFacilitiesItemView;

    })(Marionette.ItemView);
    return Views.OriginalRoomFacilitiesView = (function(_super) {
      __extends(OriginalRoomFacilitiesView, _super);

      function OriginalRoomFacilitiesView() {
        return OriginalRoomFacilitiesView.__super__.constructor.apply(this, arguments);
      }

      OriginalRoomFacilitiesView.prototype.tagName = 'div';

      OriginalRoomFacilitiesView.prototype.className = 'col-sm-7';

      OriginalRoomFacilitiesView.prototype.itemView = OriginalRoomFacilitiesItemView;

      return OriginalRoomFacilitiesView;

    })(Marionette.CollectionView);
  });
});
