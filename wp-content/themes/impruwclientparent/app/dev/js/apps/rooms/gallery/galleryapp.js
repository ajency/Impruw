var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module("RoomsApp.Gallery", function(Gallery, App) {
    var GalleryController, GalleryView, NoGalleryItem, SingleGalleryItem;
    GalleryController = (function(_super) {
      __extends(GalleryController, _super);

      function GalleryController() {
        return GalleryController.__super__.constructor.apply(this, arguments);
      }

      GalleryController.prototype.initialize = function(opt) {
        var collection;
        collection = opt.collection;
        if (!collection) {
          throw new Error("Slides collection not found");
        }
        this.galleryView = this._getGalleryView(collection);
        return this.show(this.galleryView, {
          loading: true
        });
      };

      GalleryController.prototype._getGalleryView = function(collection) {
        return new GalleryView({
          collection: collection
        });
      };

      return GalleryController;

    })(AppController);
    SingleGalleryItem = (function(_super) {
      __extends(SingleGalleryItem, _super);

      function SingleGalleryItem() {
        return SingleGalleryItem.__super__.constructor.apply(this, arguments);
      }

      SingleGalleryItem.prototype.tagName = 'li';

      SingleGalleryItem.prototype.className = 'isotope-element';

      SingleGalleryItem.prototype.template = '<a href="{{full_url}}" data-lightbox="gallery"><img src="{{thumb_url}}" class="img-responsive"/></a>';

      SingleGalleryItem.prototype.onRender = function() {
        var randomH, randomW;
        randomW = Math.random() * 50 > 25 ? 1 : 2;
        randomH = Math.random() * 50 > 25 ? 1 : 2;
        return this.$el.addClass("width-" + randomW + " height-" + randomH);
      };

      SingleGalleryItem.prototype.onShow = function() {
        return this.$el.find('img').error(function() {
          return $(this).unbind("error").attr("src", THEMEURL + "/images/imageNotFound.jpg");
        });
      };

      SingleGalleryItem.prototype.events = {
        'click': function(e) {
          return e.preventDefault();
        }
      };

      return SingleGalleryItem;

    })(Marionette.ItemView);
    NoGalleryItem = (function(_super) {
      __extends(NoGalleryItem, _super);

      function NoGalleryItem() {
        return NoGalleryItem.__super__.constructor.apply(this, arguments);
      }

      NoGalleryItem.prototype.template = '<div class="empty-info">{{#polyglot}}No images found. Please add images.{{/polyglot}}</div>';

      return NoGalleryItem;

    })(Marionette.ItemView);
    GalleryView = (function(_super) {
      __extends(GalleryView, _super);

      function GalleryView() {
        this.onShow = __bind(this.onShow, this);
        return GalleryView.__super__.constructor.apply(this, arguments);
      }

      GalleryView.prototype.tagName = 'ul';

      GalleryView.prototype.template = '';

      GalleryView.prototype.className = 'isotope';

      GalleryView.prototype.childView = SingleGalleryItem;

      GalleryView.prototype.emptyView = NoGalleryItem;

      GalleryView.prototype.onShow = function() {
        var ww;
        if (this.collection.length === 0) {
          return;
        }
        this.$el.imagesLoaded((function(_this) {
          return function() {
            return _this.$el.isotope({
              itemSelector: '.isotope-element',
              layoutMode: 'masonry'
            });
          };
        })(this));
        ww = $('#gallery-region').width();
        return this.$el.width(ww);
      };

      return GalleryView;

    })(Marionette.CompositeView);
    return App.commands.setHandler("show:gallery:images", function(opt) {
      return new GalleryController(opt);
    });
  });
});
