var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.HeaderElements", function(HeaderElements, App, Backbone, Marionette, $, _) {
    var API, headerElementModel;
    HeaderElements.HeaderElementModel = (function(_super) {
      __extends(HeaderElementModel, _super);

      function HeaderElementModel() {
        return HeaderElementModel.__super__.constructor.apply(this, arguments);
      }

      HeaderElementModel.prototype.name = 'headerElements';

      HeaderElementModel.prototype.idAttribute = 'elementId';

      return HeaderElementModel;

    })(Backbone.Model);
    HeaderElements.HeaderElementCollection = (function(_super) {
      __extends(HeaderElementCollection, _super);

      function HeaderElementCollection() {
        return HeaderElementCollection.__super__.constructor.apply(this, arguments);
      }

      HeaderElementCollection.prototype.model = HeaderElements.HeaderElementModel;

      HeaderElementCollection.prototype.url = function() {
        return AJAXURL + '?action=get-header-elements';
      };

      return HeaderElementCollection;

    })(Backbone.Collection);
    headerElementModel = new HeaderElements.HeaderElementModel;
    API = {
      getHeaderElements: function() {
        var headerElementCollection;
        headerElementCollection = new HeaderElements.HeaderElementCollection;
        headerElementCollection.fetch();
        return headerElementCollection;
      }
    };
    return App.reqres.setHandler("get:header:elements", function() {
      return API.getHeaderElements();
    });
  });
});
