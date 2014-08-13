var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/language-translation/language-page-rooms/templates/languagepageroomsview.html'], function(App, languagepageroomsviewTpl) {
  return App.module('LanguageApp.LanguagePageRooms.Views', function(Views, App, Backbone, Marionette, $, _) {
    Views.PageRooomsLayout = (function(_super) {
      __extends(PageRooomsLayout, _super);

      function PageRooomsLayout() {
        return PageRooomsLayout.__super__.constructor.apply(this, arguments);
      }

      PageRooomsLayout.prototype.template = languagepageroomsviewTpl;

      PageRooomsLayout.prototype.regions = {
        originalRoomContent: ".original-content",
        translatedRoomContent: ".translated-content"
      };

      return PageRooomsLayout;

    })(Marionette.Layout);
    return {
      onShow: function() {
        return this.$el.find('select').selectpicker();
      }
    };
  });
});
