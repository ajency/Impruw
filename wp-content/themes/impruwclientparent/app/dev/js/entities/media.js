var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Media", function(Media, App, Backbone, Marionette, $, _) {
    var API, mediaCollection;
    Media.MediaModel = (function(_super) {
      __extends(MediaModel, _super);

      function MediaModel() {
        return MediaModel.__super__.constructor.apply(this, arguments);
      }

      MediaModel.prototype.idAttribute = 'id';

      MediaModel.prototype.name = 'media';

      MediaModel.prototype.getBestFit = function(width) {
        var closest, sizes, smallest;
        sizes = this.get('sizes');
        closest = null;
        smallest = 99999;
        _.each(sizes, function(size, key) {
          var val;
          val = size.width - width;
          val = val < 0 ? -1 * val : val;
          if (val <= smallest) {
            closest = {
              url: size.url,
              size: key
            };
            return smallest = val;
          }
        });
        if (_.isNull(closest)) {
          closest = sizes['full'];
        }
        return closest;
      };

      return MediaModel;

    })(Backbone.Model);
    window.Media = Media.MediaModel;
    Media.MediaCollection = (function(_super) {
      __extends(MediaCollection, _super);

      function MediaCollection() {
        return MediaCollection.__super__.constructor.apply(this, arguments);
      }

      MediaCollection.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        this.perPage = 6;
        this.totalMedia = 0;
        return this.filters = {
          order: 'DESC',
          orderby: 'date',
          paged: 1,
          posts_per_page: this.perPage
        };
      };

      MediaCollection.prototype.model = Media.MediaModel;

      MediaCollection.prototype.fetch = function(options) {
        var paged, xhr;
        if (options == null) {
          options = {};
        }
        if (this.models.length === 0) {
          paged = 1;
        } else {
          paged = (Math.floor(this.models.length / this.perPage)) + 1;
        }
        this.filters = {
          order: 'DESC',
          orderby: 'date',
          paged: paged,
          posts_per_page: this.perPage
        };
        options.add = true;
        options.remove = false;
        options.data = this.filters;
        xhr = MediaCollection.__super__.fetch.call(this, options);
        xhr.done((function(_this) {
          return function(response) {
            return _this.totalMedia = response.total;
          };
        })(this));
        return xhr;
      };

      MediaCollection.prototype.url = function() {
        return "" + AJAXURL + "?action=query_attachments";
      };

      MediaCollection.prototype.parse = function(resp) {
        if (resp.code === 'OK') {
          return resp.data;
        }
        return resp;
      };

      return MediaCollection;

    })(Backbone.Collection);
    mediaCollection = new Media.MediaCollection;
    API = {
      fetchMedia: function(params, reset) {
        if (params == null) {
          params = {};
        }
        return Media.MediaCollection;
      },
      getMediaById: function(mediaId) {
        var media;
        if (0 === parseInt(mediaId)) {
          return API.getPlaceHolderMedia();
        }
        media = mediaCollection.get(parseInt(mediaId));
        if (_.isUndefined(media)) {
          media = new Media.MediaModel({
            id: mediaId
          });
          mediaCollection.add(media);
          media.fetch();
        }
        return media;
      },
      getEmptyMediaCollection: function() {
        return new Media.MediaCollection;
      },
      getPlaceHolderMedia: function() {
        var media;
        media = new Media.MediaModel;
        return media;
      },
      createNewMedia: function(data) {
        var media;
        media = new Media.MediaModel(data);
        mediaCollection.add(media);
        return media;
      }
    };
    App.reqres.setHandler("get:empty:media:collection", function() {
      return API.getEmptyMediaCollection();
    });
    App.reqres.setHandler("fetch:media", function(shouldReset) {
      if (shouldReset == null) {
        shouldReset = true;
      }
      return API.fetchMedia(shouldReset);
    });
    App.reqres.setHandler("get:media:by:id", function(mediaId) {
      return API.getMediaById(mediaId);
    });
    return App.commands.setHandler("new:media:added", function(modelData) {
      return API.createNewMedia(modelData);
    });
  });
});
