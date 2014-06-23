var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/language-translation/language-page-content/templates/languagepagecontentview.html'], function(App, languagepagecontentviewTpl) {
  return App.module('LanguageApp.LanguagePageContent.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.LanguagePageContentView = (function(_super) {
      __extends(LanguagePageContentView, _super);

      function LanguagePageContentView() {
        return LanguagePageContentView.__super__.constructor.apply(this, arguments);
      }

      LanguagePageContentView.prototype.template = languagepagecontentviewTpl;

      LanguagePageContentView.prototype.onShow = function() {
        var m, w;
        this.$el.find('*[data-spy="affix"]').affix();
        w = $('.aj-imp-right').width();
        this.$el.find('*[data-spy="affix"]').width(w);
        m = $('.aj-imp-left').width();
        return this.$el.find('*[data-spy="affix"]').css('margin-left', m);
      };

      return LanguagePageContentView;

    })(Marionette.ItemView);
  });
});
