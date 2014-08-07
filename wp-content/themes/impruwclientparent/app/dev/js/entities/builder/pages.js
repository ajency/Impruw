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

      PageModel.prototype.defaults = function() {
        return {
          post_title: ''
        };
      };

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
        return "" + AJAXURL + "?action=get-pages";
      };

      PageCollection.prototype.parse = function(resp) {
        if (resp.code === 'OK') {
          return resp.data;
        }
        return resp;
      };

      return PageCollection;

    })(Backbone.Collection);
    pages = new Pages.PageCollection;
    pages.fetch({
      reset: true
    });
    API = {
      getPagesCollection: function() {
        return new Pages.PageCollection;
      },
      getPages: function() {
        return pages;
      },
      createNewPage: function(data) {
        var page;
        if (data == null) {
          data = {};
        }
        page = new Pages.PageModel(data);
        return page;
      },
      getPageModelById: function(pageId) {
        var pageModel;
        pageModel = new Pages.PageModel({
          'ID': parseInt(pageId)
        });
        pageModel.fetch({
          data: {
            'ID': pageId,
            'action': 'read-page'
          }
        });
        return pageModel;
      }
    };
    App.reqres.setHandler("get:editable:pages", function() {
      return API.getPages();
    });
    App.reqres.setHandler("get:fetched:page", function(id) {
      var page;
      page = pages.get(id);
      return page;
    });
    App.reqres.setHandler("create:page:model", function(data) {
      return API.createNewPage(data);
    });
    App.reqres.setHandler("get:page:model:by:id", function(pageId) {
      return API.getPageModelById(pageId);
    });
    return App.reqres.setHandler("get:pages:collection", function() {
      return API.getPagesCollection();
    });
  });
});
