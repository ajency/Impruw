// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["app", 'backbone'], function(App, Backbone) {
    return App.module("Entities.Media", function(Media, App, Backbone, Marionette, $, _) {
      var API, _ref, _ref1;
      Media.MediaModel = (function(_super) {
        __extends(MediaModel, _super);

        function MediaModel() {
          _ref = MediaModel.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        MediaModel.prototype.idAttribute = 'ID';

        MediaModel.prototype.parse = function(resp) {
          if (resp.code === 'OK') {
            return resp.data;
          }
          return resp;
        };

        return MediaModel;

      })(Backbone.AssociatedModel);
      Media.MediaCollection = (function(_super) {
        __extends(MediaCollection, _super);

        function MediaCollection() {
          _ref1 = MediaCollection.__super__.constructor.apply(this, arguments);
          return _ref1;
        }

        MediaCollection.prototype.model = Media.MediaModel;

        MediaCollection.prototype.parse = function(resp) {
          if (resp.code === 'OK') {
            return resp.data;
          }
          return resp;
        };

        return MediaCollection;

      })(Backbone.Collection);
      API = {
        fetchMedia: function(param, reset) {
          var mediaCollection;
          if (param == null) {
            param = {};
          }
          mediaCollection = App.request("get:collection", 'mediacollection');
          if (!mediaCollection) {
            mediaCollection = new Media.MediaCollection;
          }
          mediaCollection.url = "" + AJAXURL + "?action=query_attachments";
          mediaCollection.fetch({
            reset: reset,
            data: param
          });
          return mediaCollection;
        },
        createStoreCollection: function() {
          var mediaCollection;
          mediaCollection = new Media.MediaCollection;
          return App.request("set:collection", 'mediacollection', mediaCollection);
        },
        getMediaById: function(mediaId) {
          var media, mediaCollection;
          mediaCollection = App.request("get:collection", 'mediacollection');
          media = mediaCollection.get(parseInt(mediaId));
          if (_.isUndefined(media)) {
            media = new Media.MediaModel({
              ID: mediaId
            });
            media.url = "" + AJAXURL + "?action=get-media&ID=" + mediaId;
            mediaCollection.add(media);
            media.fetch();
          }
          return media;
        }
      };
      App.commands.setHandler("create:media:store", function() {
        return API.createStoreCollection();
      });
      App.reqres.setHandler("fetch:media", function(shouldReset) {
        if (shouldReset == null) {
          shouldReset = true;
        }
        return API.fetchMedia(shouldReset);
      });
      return App.reqres.setHandler("get:media:by:id", function(mediaId) {
        return API.getMediaById(mediaId);
      });
    });
  });

}).call(this);
