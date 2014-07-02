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

      LanguagePageNavItemView.prototype.template = '{{#isChildSitePage}}<a {{#isRoomPage}}href="#rooms"{{/isRoomPage}} {{^isRoomPage}}href="#page"{{/isRoomPage}} {{#isRoomPage}}id="rooms"{{/isRoomPage}} {{^isRoomPage}}id="page"{{/isRoomPage}} data-toggle="tab" data-pageid = {{pageId}}>{{pageTitle}}</a>{{/isChildSitePage}}';

      LanguagePageNavItemView.prototype.events = {
        'click a#rooms': 'loadRoomContent',
        'click a#page': 'loadPageContent'
      };

      LanguagePageNavItemView.prototype.loadRoomContent = function(e) {
        console.log("Clicked room");
        return this.trigger("page:room:content");
      };

      LanguagePageNavItemView.prototype.loadPageContent = function(e) {
        var pageId;
        pageId = $(e.currentTarget).attr('data-pageid');
        return this.trigger("page:content", pageId);
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