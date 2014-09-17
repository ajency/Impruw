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

      ElementModel.prototype.destroy = function(options) {
        var destroy, model, success;
        options = (options ? _.clone(options) : {});
        model = this;
        success = options.success;
        destroy = function() {
          model.trigger("destroy", model, model.collection, options);
        };
        options.success = function(resp) {
          if (options.wait || model.isNew()) {
            destroy();
          }
          if (success) {
            success(model, resp, options);
          }
          if (!model.isNew()) {
            model.trigger("sync", model, resp, options);
          }
        };
        if (this.isNew()) {
          options.success();
          return false;
        }
        if (!options.wait) {
          return destroy();
        }
      };

      ElementModel.prototype.parse = function(resp) {
        if (resp.success === false && resp.new_instance) {
          App.vent.trigger("new:instance:opened", resp);
          return {};
        }
        if (resp.code === 'OK') {
          return resp.data;
        }
        return resp;
      };

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
      getUnusedElements: function(pageId, revisionId) {
        if (revisionId == null) {
          revisionId = 0;
        }
        recoveredElements.url = "" + AJAXURL + "?action=get-unused-elements";
        recoveredElements.fetch({
          data: {
            revision_id: revisionId,
            page_id: pageId
          }
        });
        return recoveredElements;
      },
      getUnusedElementByMetaId: function(metaId) {
        var element;
        element = recoveredElements.get(parseInt(metaId));
        return element;
      }
    };
    App.reqres.setHandler("create:new:element", function(data) {
      return API.createElement(data);
    });
    App.reqres.setHandler("get:unused:elements", function(pageId, revisionId) {
      return API.getUnusedElements(pageId, revisionId);
    });
    App.reqres.setHandler("get:unused:element:by:metaid", function(metaId) {
      return API.getUnusedElementByMetaId(metaId);
    });
    return App.commands.setHandler("unused:element:added", function(metaId, _page_id) {
      return $.ajax({
        type: 'POST',
        url: AJAXURL,
        data: {
          action: 'remove-unused-element',
          page_id: _page_id,
          element_meta_id: metaId
        },
        success: function() {
          return console.log("element removed from unused list");
        }
      });
    });
  });
});
