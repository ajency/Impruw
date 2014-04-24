var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone', 'moment'], function(App, Backbone, moment) {
  return App.module("Entities.Revision", function(Revision, App, Backbone, Marionette, $, _) {
    var API, RevisionCollection, RevisionModel, revisionsArray;
    RevisionModel = (function(_super) {
      __extends(RevisionModel, _super);

      function RevisionModel() {
        return RevisionModel.__super__.constructor.apply(this, arguments);
      }

      RevisionModel.prototype.defaults = function() {
        return {
          post_title: ''
        };
      };

      RevisionModel.prototype.name = 'revision';

      RevisionModel.prototype.parse = function(resp) {
        var data;
        data = resp.code === 'OK' ? resp.data : resp;
        data.id = parseInt(data.id);
        data.timestamp = moment(data.datetime).toDate().getTime();
        data.timeago = moment(data.datetime).fromNow();
        data.datetime = moment(data.datetime).format('D/MM/YYYY h:m:s');
        return data;
      };

      return RevisionModel;

    })(Backbone.Model);
    RevisionCollection = (function(_super) {
      __extends(RevisionCollection, _super);

      function RevisionCollection() {
        return RevisionCollection.__super__.constructor.apply(this, arguments);
      }

      RevisionCollection.prototype.model = RevisionModel;

      RevisionCollection.prototype.comparator = 'timestamp';

      RevisionCollection.prototype.url = function() {
        return "" + AJAXURL + "?action=fetch-revisions";
      };

      return RevisionCollection;

    })(Backbone.Collection);
    revisionsArray = {};
    API = {
      getPageRevisions: function(pageId) {
        var revisionsCollection;
        revisionsCollection = revisionsArray[pageId] || false;
        if (!revisionsCollection) {
          revisionsCollection = new RevisionCollection;
          revisionsCollection.fetch({
            data: {
              page_id: pageId
            }
          });
          revisionsArray[pageId] = revisionsCollection;
        }
        return revisionsCollection;
      },
      getPages: function(param) {
        if (param == null) {
          param = {};
        }
        return pages;
      },
      createNewPage: function(data) {
        var page;
        if (data == null) {
          data = {};
        }
        page = new Pages.PageModel(data);
        return page;
      }
    };
    return App.reqres.setHandler("get:page:revisions", function(pageId) {
      return API.getPageRevisions(pageId);
    });
  });
});
