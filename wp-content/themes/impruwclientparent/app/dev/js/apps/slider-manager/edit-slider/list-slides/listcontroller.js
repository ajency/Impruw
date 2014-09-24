var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module('SliderManager.EditSlider.SlidesList', function(SlidesList, App, Backbone, Marionette, $, _) {
    var NoSlidesView, SlideView, SlidesListController, SlidesListLayout, SlidesListView;
    SlidesListController = (function(_super) {
      __extends(SlidesListController, _super);

      function SlidesListController() {
        this.showSuccessMessage = __bind(this.showSuccessMessage, this);
        this.slideModelUpdated = __bind(this.slideModelUpdated, this);
        this.updateImageThumb = __bind(this.updateImageThumb, this);
        return SlidesListController.__super__.constructor.apply(this, arguments);
      }

      SlidesListController.prototype.initialize = function(opt) {
        var collection, layout, listView;
        collection = opt.collection;
        if (collection.length > 0) {
          this.sliderId = collection.at(0).get('slider_id');
        } else {
          collection.once("add", (function(_this) {
            return function(model) {
              return _this.sliderId = parseInt(model.get('slider_id'));
            };
          })(this));
        }
        this.layout = layout = this._getSlidesListLayout();
        this.listView = listView = this._getSlidesListView(collection);
        this.listenTo(listView, "itemview:slide:updated:with:data", function(iv, data) {
          var slide;
          slide = iv.model;
          slide.set(data);
          return slide.save(null, {
            wait: true,
            success: this.slideModelUpdated
          });
        });
        this.listenTo(listView, "itemview:remove:slide", function(iv, slide) {
          return slide.destroy({
            wait: true
          });
        });
        this.listenTo(listView, "itemview:edit:image", function(iv, imageId) {
          var editView, mediaId, ratio;
          mediaId = parseInt(iv.model.get('image_id'));
          ratio = App.currentImageRatio;
          editView = App.request("get:image:editor:view", mediaId, {
            aspectRatio: ratio
          });
          this.updateImageThumb(iv.model, editView.model);
          listView.triggerMethod("show:edit:image", editView);
          return listView.listenTo(editView, "image:editing:cancelled", function() {
            return listView.triggerMethod("image:editing:cancelled");
          });
        });
        this.listenTo(layout, "show:add:new:slide", (function(_this) {
          return function() {
            return App.execute("show:add:new:slide", {
              region: layout.addSlideRegion,
              sliderId: _this.sliderId
            });
          };
        })(this));
        this.listenTo(layout.addSlideRegion, "region:closed new:slide:created", (function(_this) {
          return function(slide) {
            if (_.isObject(slide)) {
              collection.add(slide);
            }
            return layout.triggerMethod("show:add:slide");
          };
        })(this));
        this.listenTo(layout, "show", function() {
          return layout.slidesListRegion.show(listView);
        });
        this.listenTo(listView, "slides:order:updated", function(newOrder) {
          _.each(newOrder, function(slideId, index) {
            var slide;
            slide = collection.get(slideId);
            if (slide) {
              return slide.set('order', index + 1);
            }
          });
          return collection.saveOrder({
            success: this.showSuccessMessage
          });
        });
        return this.show(layout, {
          loading: true
        });
      };

      SlidesListController.prototype.updateImageThumb = function(slideModel, mediaModel) {
        return this.listenTo(mediaModel, 'change', function(model) {
          var fullSize, thumbSize, _ref, _ref1;
          fullSize = (_ref = model.get('sizes').large) != null ? _ref : model.get('sizes').full;
          thumbSize = (_ref1 = model.get('sizes').thumbnail) != null ? _ref1 : model.get('sizes').full;
          return slideModel.set({
            thumb_url: thumbSize.url,
            full_url: fullSize.url
          });
        });
      };

      SlidesListController.prototype._getSlidesListView = function(collection) {
        return new SlidesListView({
          collection: collection
        });
      };

      SlidesListController.prototype._getSlidesListLayout = function() {
        return new SlidesListLayout;
      };

      SlidesListController.prototype.slideModelUpdated = function() {};

      SlidesListController.prototype.showSuccessMessage = function() {
        return this.layout.triggerMethod("show:order:updated:msg");
      };

      return SlidesListController;

    })(AppController);
    SlideView = (function(_super) {
      __extends(SlideView, _super);

      function SlideView() {
        return SlideView.__super__.constructor.apply(this, arguments);
      }

      SlideView.prototype.tagName = 'div';

      SlideView.prototype.className = 'panel panel-default moveable';

      SlideView.prototype.template = '<div class="panel-heading"> <a class="accordion-toggle"> <div class="aj-imp-image-item row"> <div class="imgthumb col-sm-4"> <img src="{{thumb_url}}" class="img-responsive"> </div> <div class="imgname col-sm-5"></div> <div class="imgactions col-sm-3"> <a href="#/edit-image" class="blue-link edit-image"> <span class="glyphicon glyphicon-edit"></span>{{#polyglot}}Edit Image{{/polyglot}}</a> <a class="red-link remove-slide" title="Delete Image"><span class="glyphicon glyphicon-trash"></span>&nbsp;{{#polyglot}}Delete Image{{/polyglot}}</a> </div> </div> </a> </div>';

      SlideView.prototype.modelEvents = {
        'change:thumb_url change:full_url': 'render'
      };

      SlideView.prototype.events = {
        'click .update-slide': function() {
          var data;
          data = Backbone.Syphon.serialize(this);
          return this.trigger("slide:updated:with:data", data);
        },
        'click .remove-slide': function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (confirm(_.polyglot.t('Are you sure?'))) {
            return this.trigger("remove:slide", this.model);
          }
        },
        'click .edit-image': function(e) {
          e.preventDefault();
          return this.trigger("edit:image");
        }
      };

      SlideView.prototype.onRender = function() {
        return this.$el.attr('data-slide-id', this.model.get('id'));
      };

      return SlideView;

    })(Marionette.ItemView);
    NoSlidesView = (function(_super) {
      __extends(NoSlidesView, _super);

      function NoSlidesView() {
        return NoSlidesView.__super__.constructor.apply(this, arguments);
      }

      NoSlidesView.prototype.template = '<div class="alert">{{#polyglot}}No images found. Please add images.{{/polyglot}}</div>';

      return NoSlidesView;

    })(Marionette.ItemView);
    SlidesListView = (function(_super) {
      __extends(SlidesListView, _super);

      function SlidesListView() {
        this.slidesSorted = __bind(this.slidesSorted, this);
        return SlidesListView.__super__.constructor.apply(this, arguments);
      }

      SlidesListView.prototype.template = ' <div class="slides-list"> <div class="aj-imp-image-header row"> <div class="col-sm-4"> &nbsp; </div> <div class="col-sm-5"> {{#polyglot}}File Name{{/polyglot}} </div> <div class="col-sm-3"> {{#polyglot}}Actions{{/polyglot}} </div> </div> <div class="panel-group" id="slides-accordion"></div> </div> <div id="edit-image-view" class="edit-image-view"></div>';

      SlidesListView.prototype.itemView = SlideView;

      SlidesListView.prototype.emptyView = NoSlidesView;

      SlidesListView.prototype.itemViewContainer = '#slides-accordion';

      SlidesListView.prototype.onBeforeRender = function() {
        return this.collection.sort();
      };

      SlidesListView.prototype.onShow = function() {
        return this.$el.find('#slides-accordion').sortable({
          start: function(e, ui) {
            return ui.placeholder.height(ui.item.height());
          },
          update: this.slidesSorted
        });
      };

      SlidesListView.prototype.slidesSorted = function(evt, ui) {
        var newOrder, order;
        order = this.$el.find('#slides-accordion').sortable('toArray', {
          attribute: 'data-slide-id'
        });
        newOrder = _.map(order, function(o, i) {
          return parseInt(o);
        });
        return this.trigger("slides:order:updated", newOrder);
      };

      SlidesListView.prototype.onClose = function() {
        return this.$el.find('#slides-accordion').sortable('destroy');
      };

      SlidesListView.prototype.onShowEditImage = function(editView) {
        this.$el.find('.slides-list').hide();
        this.$el.find('.edit-image-view').html(editView.$el).show();
        $('.crop-help').show();
        return editView.triggerMethod('show');
      };

      SlidesListView.prototype.onImageEditingCancelled = function() {
        var self;
        self = this;
        this.$el.find('.edit-image-view').fadeOut('fast', function() {
          $(this).empty();
          return self.$el.find('.slides-list').show();
        });
        return $('.crop-help').hide();
      };

      return SlidesListView;

    })(Marionette.CompositeView);
    SlidesListLayout = (function(_super) {
      __extends(SlidesListLayout, _super);

      function SlidesListLayout() {
        return SlidesListLayout.__super__.constructor.apply(this, arguments);
      }

      SlidesListLayout.prototype.template = '<div class="row"> <div class="col-sm-8"> <div id="slides-list-region"></div> </div> <div class="col-sm-4"> <div class="alert alert-info crop-help"> <p><b>{{#polyglot}}Steps to fit your image edge to edge inside the slider{{/polyglot}}</b></p> <ul> <li>{{#polyglot}}Select the area to be cropped.{{/polyglot}}</li> <li>{{#polyglot}}Notice how initially the crop button is disabled. Crop is enabled once you have selected the image close to the aspect ratio of the slider.{{/polyglot}}</li> <li>{{#polyglot}}Your image dimensions are displayed in scale image area and the required dimensions are displayed under image crop area.{{/polyglot}}</li> <li>{{#polyglot}}As you increase the decrease your selection, the selection area height and width will also change.{{/polyglot}}</li> <li>{{#polyglot}}Once it reaches the maximum point for expected image width or height, you will not be able to increase the selection area anymore. If you want a larger image, we suggest you increase the width of the slider from sitebuilder for best results.{{/polyglot}}</li> <li>{{#polyglot}}When you are happy with your selection area to be cropped, click the crop button from the tool bar above.{{/polyglot}}</li> </ul> </div> <div id="slides-info"> {{#polyglot}}Click the button to select images to add to your slider. You can change the order of the images by dragging them up or down in the list to the left.{{/polyglot}} </div> <div class="aj-imp-block-button add-new-slide"> <button class="btn btn-default btn-hg"><span class="bicon icon-uniF10C"></span>&nbsp;&nbsp;{{#polyglot}}Add Image{{/polyglot}}</button> </div> </div> </div> <div id="add-slide-region"></div>';

      SlidesListLayout.prototype.events = {
        'click .add-new-slide': function() {
          this.$el.find('.add-new-slide').hide();
          return this.trigger("show:add:new:slide");
        }
      };

      SlidesListLayout.prototype.dialogOptions = {
        modal_title: _.polyglot.t('Image Gallery'),
        modal_size: 'wide-modal'
      };

      SlidesListLayout.prototype.onShowAddSlide = function() {
        return this.$el.find('.add-new-slide').show();
      };

      SlidesListLayout.prototype.regions = {
        slidesListRegion: '#slides-list-region',
        addSlideRegion: '#add-slide-region'
      };

      SlidesListLayout.prototype.onShowOrderUpdatedMsg = function() {
        this.$el.find('.alert').remove();
        return this.$el.prepend("<div class=\"alert alert-success\">" + _.polyglot.t("Updated successfully") + "</div>");
      };

      return SlidesListLayout;

    })(Marionette.Layout);
    App.commands.setHandler('show:slides:list', function(opts) {
      if (opts == null) {
        opts = {};
      }
      return new SlidesListController(opts);
    });
    return App.commands.setHandler("show:slides:manager", function(slidesCollection) {
      return new SlidesListController({
        region: App.dialogRegion,
        collection: slidesCollection
      });
    });
  });
});
