var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/seo/templates/seo-page-view.html'], function(App, seoPageTpl) {
  return App.module('SeoApp.SeoPageContent.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.SeoPageContentView = (function(_super) {
      __extends(SeoPageContentView, _super);

      function SeoPageContentView() {
        return SeoPageContentView.__super__.constructor.apply(this, arguments);
      }

      SeoPageContentView.prototype.template = seoPageTpl;

      SeoPageContentView.prototype.className = 'tab-content';

      return SeoPageContentView;

    })(Marionette.ItemView);
  });
});
