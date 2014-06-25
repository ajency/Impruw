var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageRooms.OriginalRooms.Views', function(Views, App, Backbone, Marionette, $, _) {
    var OriginalItemView;
    return OriginalItemView = (function(_super) {
      __extends(OriginalItemView, _super);

      function OriginalItemView() {
        return OriginalItemView.__super__.constructor.apply(this, arguments);
      }

      OriginalItemView.prototype.tagName = "div";

      OriginalItemView.prototype.template = '<h1>Original Content</h1>';

      return OriginalItemView;

    })(Marionette.ItemView);
  });
});
