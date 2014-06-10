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

      PageJson.prototype.idAttribute = 'page_id';

      PageJson.prototype.name = 'page-json';

      PageJson.prototype.url = function() {
        var pageId, revisionId;
        pageId = this.get('page_id');
        revisionId = this.get('revision_id');
        return "" + AJAXURL + "?action=read-page-json&page_id=" + pageId + "&revision_id=" + revisionId;
      };

      PageJson.prototype.sync = function(method, model, options) {
        var params, xhr;
        params = {
          url: this.url(),
          type: "GET",
          dataType: "json"
        };
        params = _.extend(params, options);
        xhr = Backbone.ajax(params);
        model._fetch = xhr;
        return xhr;
      };

      return PageJson;

    })(Backbone.Model);
    API = {
      getPageJSON: function(pageId, revisionId) {
        var json;
        json = new PageJson;
        json.set({
          page_id: parseInt(pageId),
          revision_id: parseInt(revisionId)
        });
        json.fetch();
        return json;
      }
    };
    return App.reqres.setHandler("get:page:json", function(pageId, revisionId) {
      console.log(revisionId);
      return API.getPageJSON(pageId, revisionId);
    });
  });
});
