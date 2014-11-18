var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.PageSmartTableElements", function(PageSmartTableElements, App, Backbone, Marionette, $, _) {
    var API, tableElementModel;
    PageSmartTableElements.SmartTableElementModel = (function(_super) {
      __extends(SmartTableElementModel, _super);

      function SmartTableElementModel() {
        return SmartTableElementModel.__super__.constructor.apply(this, arguments);
      }

      SmartTableElementModel.prototype.name = 'pageTableElements';

      SmartTableElementModel.prototype.idAttribute = 'elementId';

      return SmartTableElementModel;

    })(Backbone.Model);
    PageSmartTableElements.SmartTableElementCollection = (function(_super) {
      __extends(SmartTableElementCollection, _super);

      function SmartTableElementCollection() {
        return SmartTableElementCollection.__super__.constructor.apply(this, arguments);
      }

      SmartTableElementCollection.prototype.model = PageSmartTableElements.SmartTableElementModel;

      SmartTableElementCollection.prototype.url = function() {
        return AJAXURL + '?action=get-page-smart-tables';
      };

      return SmartTableElementCollection;

    })(Backbone.Collection);
    tableElementModel = new PageSmartTableElements.SmartTableElementModel;
    API = {
      getPageSmartTables: function(pageId) {
        var tableCollection;
        tableCollection = new PageSmartTableElements.SmartTableElementCollection;
        tableCollection.fetch({
          data: {
            pageId: pageId
          }
        });
        return tableCollection;
      }
    };
    return App.reqres.setHandler("get:smart:table:elements", function(pageId) {
      return API.getPageSmartTables(pageId);
    });
  });
});
