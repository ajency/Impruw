var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.PageElements", function(PageElements, App, Backbone, Marionette, $, _) {
    var API, elementCollection, elementModel;
    PageElements.ElementModel = (function(_super) {
      __extends(ElementModel, _super);

      function ElementModel() {
        return ElementModel.__super__.constructor.apply(this, arguments);
      }

      ElementModel.prototype.name = 'pageElements';

      ElementModel.prototype.idAttribute = 'elementId';

      return ElementModel;

    })(Backbone.Model);
    PageElements.ElementCollection = (function(_super) {
      __extends(ElementCollection, _super);

      function ElementCollection() {
        return ElementCollection.__super__.constructor.apply(this, arguments);
      }

      ElementCollection.prototype.model = PageElements.ElementModel;

      ElementCollection.prototype.url = function() {
        return AJAXURL + '?action=get-page-elements';
      };

      return ElementCollection;

    })(Backbone.Collection);
    elementModel = new PageElements.ElementModel;
    elementCollection = new PageElements.ElementCollection;
    API = {
      getPageElements: function(pageId) {
        console.log("Get page element collection");
        elementCollection.fetch({
          data: {
            pageId: pageId
          }
        });
        return elementCollection;
      }
    };
    return App.reqres.setHandler("get:page:elements", function(pageId) {
      return API.getPageElements(pageId);
    });
  });
});
