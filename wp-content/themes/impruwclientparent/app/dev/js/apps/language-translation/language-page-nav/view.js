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

      LanguagePageNavItemView.prototype.template = '{{#isChildSitePage}}<a href="#page" id="page" data-toggle="tab" data-pageid = {{pageId}}>{{pageTitle}}</a>{{/isChildSitePage}}';

      LanguagePageNavItemView.prototype.events = {
        'click a#page': 'loadPageContent'
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

      LanguagePageNavView.prototype.template = '<ul class="nav nav-pills" id="js-page-nav-bar"> <li> <a href="#site" id="site" data-toggle="tab"> {{#polyglot}}Site Profile{{/polyglot}} </a> </li> <li> <a href="#page-header" id="page-header" data-toggle="tab"> {{#polyglot}}Page Header{{/polyglot}} </a> </li> <li> <a href="#page-footer" id="page-footer" data-toggle="tab"> {{#polyglot}}Page Footer{{/polyglot}} </a> </li> <li> <a href="#page-menu" id="page-menu" data-toggle="tab"> {{#polyglot}}Page Menu{{/polyglot}} </a> </li> <li> <a href="#rooms" id="rooms" data-toggle="tab"> {{#polyglot}}All Rooms{{/polyglot}} </a> </li> </ul>';

      LanguagePageNavView.prototype.itemView = LanguagePageNavItemView;

      LanguagePageNavView.prototype.itemViewContainer = '#js-page-nav-bar';

      LanguagePageNavView.prototype.events = {
        'click a#site': 'loadSiteContent',
        'click a#page-header': 'loadHeaderContent',
        'click a#page-footer': 'loadFooterContent',
        'click a#page-menu': 'loadMenuContent',
        'click a#rooms': 'loadRoomContent'
      };

      LanguagePageNavView.prototype.loadSiteContent = function(e) {
        return this.trigger("site:translate:content");
      };

      LanguagePageNavView.prototype.loadHeaderContent = function(e) {
        return this.trigger("header:translate:content");
      };

      LanguagePageNavView.prototype.loadFooterContent = function(e) {
        return this.trigger("footer:translate:content");
      };

      LanguagePageNavView.prototype.loadMenuContent = function(e) {
        return this.trigger("menu:translate:content");
      };

      LanguagePageNavView.prototype.loadRoomContent = function(e) {
        return this.trigger("page:room:content");
      };

      return LanguagePageNavView;

    })(Marionette.CompositeView);
  });
});
