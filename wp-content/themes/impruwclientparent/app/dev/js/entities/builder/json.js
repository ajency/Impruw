var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone', 'jquery'], function(App, Backbone, $) {
  return App.module("Entities.SiteBuilderJSON", function(SiteBuilderJSON, App, Backbone, Marionette, $, _) {
    var API, PageJson, json;
    PageJson = (function(_super) {
      __extends(PageJson, _super);

      function PageJson() {
        return PageJson.__super__.constructor.apply(this, arguments);
      }

      PageJson.prototype.idAttribute = 'page_id';

      PageJson.prototype.name = 'page-json';

      PageJson.prototype.initialize = function() {
        return this.lock = false;
      };

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

      PageJson.prototype.parse = function(resp) {
        var eventData;
        if (resp.lock !== true) {
          window.lockValue = resp.lock;
          if (this.locked === true) {
            eventData = {};
            eventData['wp-refresh-post-lock'] = {
              'new_lock': resp.lock
            };
            $(document).trigger('heartbeat-tick', [eventData]);
            this.locked = false;
          }
        } else if (resp.lock === true) {
          this.locked = true;
          wp.heartbeat.connectNow();
        }
        if (resp._wpnonce) {
          window._wpnonce = resp._wpnonce;
        }
        return resp;
      };

      return PageJson;

    })(Backbone.Model);
    json = new PageJson;
    API = {
      getPageJSON: function(pageId, revisionId) {
        json.set({
          page_id: parseInt(pageId),
          revision_id: parseInt(revisionId)
        });
        json.fetch();
        return json;
      }
    };
    return App.reqres.setHandler("get:page:json", function(pageId, revisionId) {
      return API.getPageJSON(pageId, revisionId);
    });
  });
});
