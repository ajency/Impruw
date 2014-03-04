var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Elements", function(Elements, App, Backbone, Marionette, $, _) {
    var API;
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

      ElementModel.prototype.url = function() {
        return "" + AJAXURL;
      };

      ElementModel.prototype.name = function() {
        return 'element-model';
      };

      ElementModel.prototype.sync = function(method, model, options) {
        var name, xhr, _action;
        if (options == null) {
          options = {};
        }
        if (!this.name) {
          throw new Error("'name' property missing");
        }
        if (_.isFunction(this.name)) {
          name = this.name();
        } else {
          name = this.name;
        }
        _action = "" + method + "-" + name;
        options.data = model.toJSON();
        xhr = Backbone.send(_action, options);
        return model._fetch = xhr;
      };

      ElementModel.prototype.parse = function(resp) {
        if (resp.code === 'OK') {
          return resp.data;
        }
      };

      return ElementModel;

    })(Backbone.Model);
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
      }
    };
    return App.reqres.setHandler("create:new:element", function(data) {
      return API.createElement(data);
    });
  });
});
