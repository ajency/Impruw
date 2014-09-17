var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.PageTableElements", function(PageTableElements, App, Backbone, Marionette, $, _) {
    var API, tableElementModel;
    PageTableElements.TableElementModel = (function(_super) {
      __extends(TableElementModel, _super);

      function TableElementModel() {
        return TableElementModel.__super__.constructor.apply(this, arguments);
      }

      TableElementModel.prototype.name = 'pageTableElements';

      TableElementModel.prototype.idAttribute = 'elementId';

      return TableElementModel;

    })(Backbone.Model);
    PageTableElements.TableElementCollection = (function(_super) {
      __extends(TableElementCollection, _super);

      function TableElementCollection() {
        return TableElementCollection.__super__.constructor.apply(this, arguments);
      }

      TableElementCollection.prototype.model = PageTableElements.TableElementModel;

      TableElementCollection.prototype.url = function() {
        return AJAXURL + '?action=get-page-tables';
      };

      return TableElementCollection;

    })(Backbone.Collection);
    tableElementModel = new PageTableElements.TableElementModel;
    API = {
      getPageTables: function(pageId) {
        var tableCollection;
        tableCollection = new PageTableElements.TableElementCollection;
        tableCollection.fetch({
          data: {
            pageId: pageId
          }
        });
        return tableCollection;
      }
    };
    return App.reqres.setHandler("get:page:table:elements", function(pageId) {
      return API.getPageTables(pageId);
    });
  });
});
