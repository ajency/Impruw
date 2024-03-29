var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/language/show/templates/languageview.html'], function(App, languageviewTpl) {
  return App.module('LanguageApp.Show.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.LanguageView = (function(_super) {
      __extends(LanguageView, _super);

      function LanguageView() {
        return LanguageView.__super__.constructor.apply(this, arguments);
      }

      LanguageView.prototype.template = languageviewTpl;

      LanguageView.prototype.onRender = function() {};

      LanguageView.prototype.onShow = function() {
        var m, w;
        this.$el.find('select').selectpicker();
        this.$el.find('*[data-spy="affix"]').affix();
        w = $('.aj-imp-right').width();
        this.$el.find('*[data-spy="affix"]').width(w);
        m = $('.aj-imp-left').width();
        return this.$el.find('*[data-spy="affix"]').css('margin-left', m);
      };

      return LanguageView;

    })(Marionette.ItemView);
  });
});
