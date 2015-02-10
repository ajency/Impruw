var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.PageTabAccordionElements", function(PageTabAccordionElements, App, Backbone, Marionette, $, _) {
    var API, tabAccordionModel;
    PageTabAccordionElements.TabAccordionElementModel = (function(_super) {
      __extends(TabAccordionElementModel, _super);

      function TabAccordionElementModel() {
        return TabAccordionElementModel.__super__.constructor.apply(this, arguments);
      }

      TabAccordionElementModel.prototype.name = 'pageTabAccordionElements';

      TabAccordionElementModel.prototype.idAttribute = 'ID';

      return TabAccordionElementModel;

    })(Backbone.Model);
    PageTabAccordionElements.PageTabAccordionElementCollection = (function(_super) {
      __extends(PageTabAccordionElementCollection, _super);

      function PageTabAccordionElementCollection() {
        return PageTabAccordionElementCollection.__super__.constructor.apply(this, arguments);
      }

      PageTabAccordionElementCollection.prototype.model = PageTabAccordionElements.TabAccordionElementModel;

      PageTabAccordionElementCollection.prototype.url = function() {
        return AJAXURL + '?action=get-page-tabs-accordions';
      };

      return PageTabAccordionElementCollection;

    })(Backbone.Collection);
    tabAccordionModel = new PageTabAccordionElements.TabAccordionElementModel;
    API = {
      getTabAccordions: function(pageId) {
        var tabAccordionCollection;
        tabAccordionCollection = new PageTabAccordionElements.PageTabAccordionElementCollection;
        tabAccordionCollection.fetch({
          data: {
            pageId: pageId
          }
        });
        return tabAccordionCollection;
      }
    };
    return App.reqres.setHandler("get:tab:accordion:elements", function(pageId) {
      return API.getTabAccordions(pageId);
    });
  });
});
