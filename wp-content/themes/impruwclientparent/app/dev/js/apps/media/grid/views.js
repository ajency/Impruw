var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['app', 'text!apps/media/grid/templates/media.html'], function(App, mediaTpl) {
  return App.module('Media.Grid.Views', function(Views, App) {
    var EmptyMediaGrid, MediaView;
    MediaView = (function(_super) {
      __extends(MediaView, _super);

      function MediaView() {
        return MediaView.__super__.constructor.apply(this, arguments);
      }

      MediaView.prototype.template = mediaTpl;

      MediaView.prototype.className = 'col-sm-1 single-img';

      MediaView.prototype.modelEvents = {
        'change': 'render'
      };

      MediaView.prototype.mixinTemplateHelpers = function(data) {
        data = MediaView.__super__.mixinTemplateHelpers.call(this, data);
        data.image_url = data.sizes.thumbnail ? data.sizes.thumbnail.url : data.sizes.full.url;
        return data;
      };

      MediaView.prototype.events = {
        'click a.thumbnail': function(e) {
          e.preventDefault();
          return this._whenImageClicked(e);
        },
        'click .delete-media-img': function() {
          if (confirm("Delete image?")) {
            return this.trigger("delete:media:image", this.model);
          }
        },
        'click .edit-image': function() {
          return this.trigger('show:image:editor', this.model);
        }
      };

      MediaView.prototype._whenImageClicked = function(e) {
        var media;
        media = $(e.target).hasClass('single-img') ? $(e.target) : $(e.target).closest('.single-img');
        return this.trigger("media:element:selected");
      };

      return MediaView;

    })(Marionette.ItemView);
    EmptyMediaGrid = (function(_super) {
      __extends(EmptyMediaGrid, _super);

      function EmptyMediaGrid() {
        return EmptyMediaGrid.__super__.constructor.apply(this, arguments);
      }

      EmptyMediaGrid.prototype.template = '<p>No media uploaded. Please upload</p>';

      return EmptyMediaGrid;

    })(Marionette.ItemView);
    return Views.GridView = (function(_super) {
      __extends(GridView, _super);

      function GridView() {
        this.loadMoreClicked = __bind(this.loadMoreClicked, this);
        return GridView.__super__.constructor.apply(this, arguments);
      }

      GridView.prototype.className = 'row';

      GridView.prototype.template = '<div id="selectable-images"></div> <div id="edit-image-view"></div>';

      GridView.prototype.itemView = MediaView;

      GridView.prototype.emptyView = EmptyMediaGrid;

      GridView.prototype.itemViewContainer = '#selectable-images';

      GridView.prototype.onCollectionRendered = function() {
        if (this.multiSelect) {
          this.$el.find('#selectable-images').bind("mousedown", function(e) {
            return e.metaKey = true;
          }).selectable({
            cancel: '.delete-media-img'
          });
        } else {
          this.$el.find('#selectable-images').selectable({
            cancel: '.delete-media-img'
          });
        }
        if (this.collection.length < this.collection.totalMedia) {
          this.$el.find('#selectable-images').after('<button type="button" class="btn btn-xs load-more"><span class="glyphicon glyphicon-repeat"></span> Load More</button>');
          return this.$el.find('#selectable-images').parent().find('.load-more').click(this.loadMoreClicked);
        }
      };

      GridView.prototype.loadMoreClicked = function(evt) {
        return this.collection.fetch({
          success: (function(_this) {
            return function() {
              _this.$el.find('#selectable-images').parent().find('.load-more').remove();
              if (_this.collection.length < _this.collection.totalMedia) {
                _this.$el.find('#selectable-images').after('<button type="button" class="btn btn-xs load-more"><span class="glyphicon glyphicon-repeat"></span> Load More</button>');
                return _this.$el.find('#selectable-images').parent().find('.load-more').click(_this.loadMoreClicked);
              }
            };
          })(this)
        });
      };

      GridView.prototype.onShow = function() {
        return this.on('after:item:added', (function(_this) {
          return function(imageView) {
            _this.$el.closest('.tab-content').siblings('.nav-tabs').find('.all-media-tab').find('a').trigger('click');
            imageView.$el.find('img').trigger('click');
            return _this.$el.find('#selectable-images').selectSelectableElements(imageView.$el);
          };
        })(this));
      };

      GridView.prototype.onShowEditImage = function(editView) {
        this.$el.find('#selectable-images').hide();
        this.$el.find('#edit-image-view').html(editView.render().$el).show();
        return editView.triggerMethod('show');
      };

      GridView.prototype.onImageEditingCancelled = function() {
        var self;
        self = this;
        return this.$el.find('#edit-image-view').fadeOut('fast', function() {
          $(this).empty();
          return self.$el.find('#selectable-images').show();
        });
      };

      return GridView;

    })(Marionette.CompositeView);
  });
});
