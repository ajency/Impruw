var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.FooterElements", function(FooterElements, App, Backbone, Marionette, $, _) {
    var API, footerElementModel;
    FooterElements.FooterElementModel = (function(_super) {
      __extends(FooterElementModel, _super);

      function FooterElementModel() {
        return FooterElementModel.__super__.constructor.apply(this, arguments);
      }

      FooterElementModel.prototype.name = 'footerElements';

      FooterElementModel.prototype.idAttribute = 'elementId';

      return FooterElementModel;

    })(Backbone.Model);
    FooterElements.FooterElementCollection = (function(_super) {
      __extends(FooterElementCollection, _super);

      function FooterElementCollection() {
        return FooterElementCollection.__super__.constructor.apply(this, arguments);
      }

      FooterElementCollection.prototype.model = FooterElements.FooterElementModel;

      FooterElementCollection.prototype.url = function() {
        return AJAXURL + '?action=get-footer-elements';
      };

      return FooterElementCollection;

    })(Backbone.Collection);
    footerElementModel = new FooterElements.FooterElementModel;
    API = {
      getFooterElements: function() {
        var footerElementCollection;
        footerElementCollection = new FooterElements.FooterElementCollection;
        footerElementCollection.fetch();
        return footerElementCollection;
      }
    };
    return App.reqres.setHandler("get:footer:elements", function() {
      return API.getFooterElements();
    });
  });
});
