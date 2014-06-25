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

      LanguagePageNavItemView.prototype.template = '{{#isChildSitePage}}<a {{#isRoomPage}}href="#rooms"{{/isRoomPage}} {{^isRoomPage}}href=""{{/isRoomPage}} {{#isRoomPage}}id="rooms"{{/isRoomPage}} data-toggle="tab">{{pageTitle}}</a>{{/isChildSitePage}}';

      LanguagePageNavItemView.prototype.events = {
        'click a#rooms': 'loadPageContent'
      };

      LanguagePageNavItemView.prototype.loadPageContent = function(e) {
        return this.trigger("page:room:content");
      };

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

      return LanguagePageNavView;

    })(Marionette.CollectionView);
  });
});
