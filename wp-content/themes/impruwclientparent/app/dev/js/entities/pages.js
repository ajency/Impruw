var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Pages", function(Pages, App, Backbone, Marionette, $, _) {
    var API, pages;
    Pages.PageModel = (function(_super) {
      __extends(PageModel, _super);

      function PageModel() {
        return PageModel.__super__.constructor.apply(this, arguments);
      }

      PageModel.prototype.name = 'page';

      PageModel.prototype.idAttribute = 'ID';

      return PageModel;

    })(Backbone.Model);
    Pages.PageCollection = (function(_super) {
      __extends(PageCollection, _super);

      function PageCollection() {
        return PageCollection.__super__.constructor.apply(this, arguments);
      }

      PageCollection.prototype.model = Pages.PageModel;

      PageCollection.prototype.url = function() {
        return AJAXURL + '?action=get-childsite-pages';
      };

      return PageCollection;

    })(Backbone.Collection);
    pages = new Pages.PageCollection;
    API = {
      getPages: function(language) {
        pages.fetch({
          data: {
            language: language
          }
        });
        return pages;
      }
    };
    return App.reqres.setHandler("get:all:pages", function(language) {
      return API.getPages(language);
    });
  });
});