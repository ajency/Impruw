var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'holder'], function(App, Holder) {
  return App.module('SiteBuilderApp.Element.Gallery.Views', function(Views, App, Backbone, Marionette, $, _) {
    var EmptyGallery, GalleryItem;
    GalleryItem = (function(_super) {
      __extends(GalleryItem, _super);

      function GalleryItem() {
        return GalleryItem.__super__.constructor.apply(this, arguments);
      }

      GalleryItem.prototype.className = 'isotop-element';

      GalleryItem.prototype.template = '<img src="{{thumb_url}}" alt="Slide" width="100%"/>';

      return GalleryItem;

    })(Marionette.ItemView);
    EmptyGallery = (function(_super) {
      __extends(EmptyGallery, _super);

      function EmptyGallery() {
        return EmptyGallery.__super__.constructor.apply(this, arguments);
      }

      EmptyGallery.prototype.template = '<div class="empty-view"><span class="bicon icon-uniF10C"></span>Nothing Found.<br> Click to choose a gallery.</div>';

      EmptyGallery.prototype.className = 'col-md-12 well';

      return EmptyGallery;

    })(Marionette.ItemView);
    return Views.GalleryView = (function(_super) {
      __extends(GalleryView, _super);

      function GalleryView() {
        return GalleryView.__super__.constructor.apply(this, arguments);
      }

      GalleryView.prototype.className = 'gallery';

      GalleryView.prototype.id = _.uniqueId('gallery-');

      GalleryView.prototype.itemView = GalleryItem;

      GalleryView.prototype.emptyView = EmptyGallery;

      GalleryView.prototype.onBeforeRender = function() {
        return this.collection.sort();
      };

      GalleryView.prototype.onShow = function() {
        return this.$el.imagesLoaded((function(_this) {
          return function() {
            return _this.$el.isotope({
              itemSelector: '.isotop-element'
            });
          };
        })(this));
      };

      GalleryView.prototype.events = {
        'click': function(e) {
          return this.trigger("show:slides:manager");
        }
      };

      return GalleryView;

    })(Marionette.CollectionView);
  });
});
