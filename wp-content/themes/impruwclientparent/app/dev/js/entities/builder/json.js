var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.SiteBuilderJSON", function(SiteBuilderJSON, App, Backbone, Marionette, $, _) {
    var API, PageJson;
    PageJson = (function(_super) {
      __extends(PageJson, _super);

      function PageJson() {
        return PageJson.__super__.constructor.apply(this, arguments);
      }

      PageJson.prototype.sync = function(method, model, options) {
        var xhr, _action;
        if (options == null) {
          options = {};
        }
        _action = 'get-page-json';
        options.data = {
          page_id: model.get('id'),
          onlyPage: false
        };
        xhr = Backbone.send(_action, options);
        return model._fetch = xhr;
      };

      PageJson.prototype.parse = function(resp) {
        if (resp.code === 'OK') {
          return resp.data;
        }
      };

      return PageJson;

    })(Backbone.Model);
    API = {
      getPageJSON: function(pageId) {
        var json;
        json = new PageJson({
          id: parseInt(pageId)
        });
        json.fetch();
        return json;
      }
    };
    return App.reqres.setHandler("get:page:json", function(pageId) {
      return API.getPageJSON(pageId);
    });
  });
});
