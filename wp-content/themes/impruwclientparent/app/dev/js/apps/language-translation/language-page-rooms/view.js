var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/language-translation/language-page-rooms/templates/languagepageroomsview.html'], function(App, languagepageroomsviewTpl) {
  return App.module('LanguageApp.LanguagePageRooms.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.LanguagePageRoomsView = (function(_super) {
      __extends(LanguagePageRoomsView, _super);

      function LanguagePageRoomsView() {
        return LanguagePageRoomsView.__super__.constructor.apply(this, arguments);
      }

      LanguagePageRoomsView.prototype.template = languagepageroomsviewTpl;

      LanguagePageRoomsView.prototype.className = 'tab-content';

      LanguagePageRoomsView.prototype.onShow = function() {
        var m, w;
        this.$el.find('*[data-spy="affix"]').affix();
        w = $('.aj-imp-right').width();
        this.$el.find('*[data-spy="affix"]').width(w);
        m = $('.aj-imp-left').width();
        return this.$el.find('*[data-spy="affix"]').css('margin-left', m);
      };

      return LanguagePageRoomsView;

    })(Marionette.ItemView);
  });
});
