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

      SeoPageNavItemView.prototype.template = '{{#isSeoPage}}<a {{#isRoomPage}}href="#rooms"{{/isRoomPage}} {{^isRoomPage}}href="#page"{{/isRoomPage}} {{#isRoomPage}}id="rooms"{{/isRoomPage}} {{^isRoomPage}}id="page"{{/isRoomPage}} data-toggle="tab" data-pageid = {{pageId}}>{{pageTitle}}</a>{{/isSeoPage}}';

      SeoPageNavItemView.prototype.events = {
        'click a#page': 'loadPageContent'
      };

      SeoPageNavItemView.prototype.mixinTemplateHelpers = function(data) {
        data = SeoPageNavItemView.__super__.mixinTemplateHelpers.call(this, data);
        data.isSeoPage = function() {
          var foundPage, isSeoPage, skipPages;
          skipPages = new Array();
          skipPages = ['single-room', 'habitacion-individual', 'einzelzimmer', 'chambre-simple', 'enkeltrom', 'dashboard', 'site-builder', 'sample-page', 'sign-in', 'support', 'reset-password', 'coming-soon', 'logg-in', 'kommer-snart', 'resett-passord'];
          foundPage = $.inArray(data.pageHref, skipPages);
          if (foundPage !== -1) {
            isSeoPage = false;
          } else {
            isSeoPage = true;
          }
          return isSeoPage;
        };
        return data;
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

      SeoPageNavView.prototype.template = '<ul class="nav nav-pills" id="js-seo-nav-bar"> <!--li> <a href="#site" id="site" data-toggle="tab"> {{#polyglot}}Site{{/polyglot}} </a> </li--> <li> <a href="#seo-rooms" id="seo-rooms" data-toggle="tab"> {{#polyglot}}All Rooms{{/polyglot}} </a> </li> </ul>';

      SeoPageNavView.prototype.onShow = function() {
        this.loadSeoRoomContent();
        return this.$el.find("li").first().addClass('active');
      };

      SeoPageNavView.prototype.itemView = SeoPageNavItemView;

      SeoPageNavView.prototype.itemViewContainer = '#js-seo-nav-bar';

      SeoPageNavView.prototype.events = {
        'click a#seo-rooms': 'loadSeoRoomContent'
      };

      SeoPageNavView.prototype.loadSeoRoomContent = function(e) {
        return this.trigger("seo:room:content");
      };

      return SeoPageNavView;

    })(Marionette.CompositeView);
  });
});
