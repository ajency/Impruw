var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageRooms.TranslatedRooms.Views', function(Views, App, Backbone, Marionette, $, _) {
    var TranslatedItemView;
    return TranslatedItemView = (function(_super) {
      __extends(TranslatedItemView, _super);

      function TranslatedItemView() {
        return TranslatedItemView.__super__.constructor.apply(this, arguments);
      }

      TranslatedItemView.prototype.tagName = "div";

      TranslatedItemView.prototype.template = '<h1>Translated Content</h1>';

      return TranslatedItemView;

    })(Marionette.ItemView);
  });
});
