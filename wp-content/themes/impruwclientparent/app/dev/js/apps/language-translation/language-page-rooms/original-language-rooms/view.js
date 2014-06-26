var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/language-translation/language-page-rooms/original-language-rooms/templates/originalroomsview.html'], function(App, originalroomsviewTpl) {
  return App.module('LanguageApp.LanguagePageRooms.OriginalRooms.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.OriginalItemView = (function(_super) {
      __extends(OriginalItemView, _super);

      function OriginalItemView() {
        return OriginalItemView.__super__.constructor.apply(this, arguments);
      }

      OriginalItemView.prototype.template = originalroomsviewTpl;

      return OriginalItemView;

    })(Marionette.ItemView);
  });
});
