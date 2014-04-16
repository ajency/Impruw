var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Elements", function(Elements, App, Backbone, Marionette, $, _) {
    var API, ElementsCollection, recoveredElements;
    Elements.ElementModel = (function(_super) {
      __extends(ElementModel, _super);

      function ElementModel() {
        return ElementModel.__super__.constructor.apply(this, arguments);
      }

      ElementModel.prototype.idAttribute = 'meta_id';

      ElementModel.prototype.defaults = function() {
        return {
          style: '',
          draggable: true
        };
      };

      ElementModel.prototype.name = 'element';

      return ElementModel;

    })(Backbone.Model);
    ElementsCollection = (function(_super) {
      __extends(ElementsCollection, _super);

      function ElementsCollection() {
        return ElementsCollection.__super__.constructor.apply(this, arguments);
      }

      ElementsCollection.prototype.model = Elements.ElementModel;

      ElementsCollection.prototype.url = function() {
        return "" + AJAXURL + "?action=fetch-elements";
      };

      return ElementsCollection;

    })(Backbone.Collection);
    recoveredElements = new ElementsCollection;
    recoveredElements.fetch({
      data: {
        type: 'recovered'
      }
    });
    API = {
      createElement: function(data) {
        var element;
        if (data == null) {
          data = {};
        }
        element = new Elements.ElementModel;
        element.set(data);
        if (element.get('element') !== 'Row' && element.get('element') !== 'Column') {
          if (element.isNew()) {
            element.save(null, {
              wait: true
            });
          }
        }
        return element;
      },
      getRecoveredElement: function(metaId) {
        var element;
        if (metaId == null) {
          metaId = 0;
        }
        if (metaId === 0) {
          return {};
        }
        element = recoveredElements.get(parseInt(metaId));
        return element || {};
      }
    };
    App.reqres.setHandler("create:new:element", function(data) {
      return API.createElement(data);
    });
    return App.reqres.setHandler("get:recovered:element", function(metaId) {
      return API.getRecoveredElement(metaId);
    });
  });
});
