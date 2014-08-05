var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageRooms.OriginalRoomDateranges.Views', function(Views, App, Backbone, Marionette, $, _) {
    var OriginalRoomDaterangesItemView;
    OriginalRoomDaterangesItemView = (function(_super) {
      __extends(OriginalRoomDaterangesItemView, _super);

      function OriginalRoomDaterangesItemView() {
        return OriginalRoomDaterangesItemView.__super__.constructor.apply(this, arguments);
      }

      OriginalRoomDaterangesItemView.prototype.template = ' <div class="form-group"> <label class="col-sm-3 control-label" for="">{{#polyglot}}Date Range{{/polyglot}}</label> <div class="col-sm-9 col-sm-offset-3"> <p class="original title">{{daterange_name}} </p> </div> </div>';

      return OriginalRoomDaterangesItemView;

    })(Marionette.ItemView);
    return Views.OriginalRoomDaterangesView = (function(_super) {
      __extends(OriginalRoomDaterangesView, _super);

      function OriginalRoomDaterangesView() {
        return OriginalRoomDaterangesView.__super__.constructor.apply(this, arguments);
      }

      OriginalRoomDaterangesView.prototype.tagName = 'div';

      OriginalRoomDaterangesView.prototype.className = 'col-sm-7';

      OriginalRoomDaterangesView.prototype.itemView = OriginalRoomDaterangesItemView;

      return OriginalRoomDaterangesView;

    })(Marionette.CollectionView);
  });
});
