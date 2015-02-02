var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.PageListTableElements", function(PageListTableElements, App, Backbone, Marionette, $, _) {
    var API, listElementModel;
    PageListTableElements.ListTableElementModel = (function(_super) {
      __extends(ListTableElementModel, _super);

      function ListTableElementModel() {
        return ListTableElementModel.__super__.constructor.apply(this, arguments);
      }

      ListTableElementModel.prototype.name = 'pageListTableElements';

      ListTableElementModel.prototype.idAttribute = 'elementId';

      return ListTableElementModel;

    })(Backbone.Model);
    PageListTableElements.ListTableElementCollection = (function(_super) {
      __extends(ListTableElementCollection, _super);

      function ListTableElementCollection() {
        return ListTableElementCollection.__super__.constructor.apply(this, arguments);
      }

      ListTableElementCollection.prototype.model = PageListTableElements.ListTableElementModel;

      ListTableElementCollection.prototype.url = function() {
        return AJAXURL + '?action=get-page-list-tables';
      };

      return ListTableElementCollection;

    })(Backbone.Collection);
    listElementModel = new PageListTableElements.ListTableElementModel;
    API = {
      getPageListTables: function(pageId) {
        var listCollection;
        listCollection = new PageListTableElements.ListTableElementCollection;
        listCollection.fetch({
          data: {
            pageId: pageId
          }
        });
        return listCollection;
      }
    };
    return App.reqres.setHandler("get:list:table:elements", function(pageId) {
      return API.getPageListTables(pageId);
    });
  });
});
