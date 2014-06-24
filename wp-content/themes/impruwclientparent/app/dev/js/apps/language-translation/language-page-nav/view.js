var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageNav.Views', function(Views, App, Backbone, Marionette, $, _) {
    var LanguagePageNavItemView;
    LanguagePageNavItemView = (function(_super) {
      __extends(LanguagePageNavItemView, _super);

      function LanguagePageNavItemView() {
        return LanguagePageNavItemView.__super__.constructor.apply(this, arguments);
      }

      LanguagePageNavItemView.prototype.tagName = "li";

      LanguagePageNavItemView.prototype.template = '{{#isChildSitePage}}<a href="#rooms" data-toggle="tab">{{pageTitle}}</a>{{/isChildSitePage}}';

      LanguagePageNavItemView.prototype.onRender = function() {};

      LanguagePageNavItemView.prototype.onShow = function() {};

      return LanguagePageNavItemView;

    })(Marionette.ItemView);
    return Views.LanguagePageNavView = (function(_super) {
      __extends(LanguagePageNavView, _super);

      function LanguagePageNavView() {
        return LanguagePageNavView.__super__.constructor.apply(this, arguments);
      }

      LanguagePageNavView.prototype.tagName = 'ul';

      LanguagePageNavView.prototype.className = 'nav nav-pills';

      LanguagePageNavView.prototype.itemView = LanguagePageNavItemView;

      LanguagePageNavView.prototype.onShow = function() {};

      return LanguagePageNavView;

    })(Marionette.CollectionView);
  });
});
