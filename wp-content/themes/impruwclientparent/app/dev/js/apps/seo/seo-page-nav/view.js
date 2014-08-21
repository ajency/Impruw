var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SeoApp.SeoPageNav.Views', function(Views, App, Backbone, Marionette, $, _) {
    var SeoPageNavItemView;
    SeoPageNavItemView = (function(_super) {
      __extends(SeoPageNavItemView, _super);

      function SeoPageNavItemView() {
        return SeoPageNavItemView.__super__.constructor.apply(this, arguments);
      }

      SeoPageNavItemView.prototype.tagName = "li";

      SeoPageNavItemView.prototype.template = '{{#isChildSitePage}}<a {{#isRoomPage}}href="#rooms"{{/isRoomPage}} {{^isRoomPage}}href="#page"{{/isRoomPage}} {{#isRoomPage}}id="rooms"{{/isRoomPage}} {{^isRoomPage}}id="page"{{/isRoomPage}} data-toggle="tab" data-pageid = {{pageId}}>{{pageTitle}}</a>{{/isChildSitePage}}';

      SeoPageNavItemView.prototype.events = {
        'click a#page': 'loadPageContent'
      };

      SeoPageNavItemView.prototype.loadPageContent = function(e) {
        var pageId;
        pageId = $(e.currentTarget).attr('data-pageid');
        return this.trigger("page:content", pageId);
      };

      return SeoPageNavItemView;

    })(Marionette.ItemView);
    return Views.SeoPageNavView = (function(_super) {
      __extends(SeoPageNavView, _super);

      function SeoPageNavView() {
        return SeoPageNavView.__super__.constructor.apply(this, arguments);
      }

      SeoPageNavView.prototype.template = '<ul class="nav nav-pills" id="js-seo-nav-bar"> <li> <a href="#site" id="site" data-toggle="tab"> {{#polyglot}}Site{{/polyglot}} </a> </li> </ul>';

      SeoPageNavView.prototype.itemView = SeoPageNavItemView;

      SeoPageNavView.prototype.itemViewContainer = '#js-seo-nav-bar';

      return SeoPageNavView;

    })(Marionette.CompositeView);
  });
});
