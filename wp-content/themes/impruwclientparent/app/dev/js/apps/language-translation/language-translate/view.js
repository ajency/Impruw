var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/language-translation/language-translate/templates/languagetranslationview.html'], function(App, languagetranslationviewTpl) {
  return App.module('LanguageApp.LanguageTranslate.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.LanguageTranslateView = (function(_super) {
      __extends(LanguageTranslateView, _super);

      function LanguageTranslateView() {
        return LanguageTranslateView.__super__.constructor.apply(this, arguments);
      }

      LanguageTranslateView.prototype.template = languagetranslationviewTpl;

      LanguageTranslateView.prototype.onShow = function() {
        var m, w;
        this.$el.find('*[data-spy="affix"]').affix();
        w = $('.aj-imp-right').width();
        this.$el.find('*[data-spy="affix"]').width(w);
        m = $('.aj-imp-left').width();
        return this.$el.find('*[data-spy="affix"]').css('margin-left', m);
      };

      return LanguageTranslateView;

    })(Marionette.ItemView);
  });
});
