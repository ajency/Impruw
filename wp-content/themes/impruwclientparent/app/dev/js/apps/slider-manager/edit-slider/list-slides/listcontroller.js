var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module('SliderManager.EditSlider.SlidesList', function(SlidesList, App, Backbone, Marionette, $, _) {
    var SlideView, SlidesListController, SlidesListLayout, SlidesListView;
    SlidesListController = (function(_super) {
      __extends(SlidesListController, _super);

      function SlidesListController() {
        return SlidesListController.__super__.constructor.apply(this, arguments);
      }

      SlidesListController.prototype.initialize = function(opt) {
        var layout, listView, slidesCollection;
        this.sliderId = opt.sliderId;
        slidesCollection = App.request("get:slides:for:slide", this.sliderId);
        this.layout = layout = this._getSlidesListLayout();
        this.listView = listView = this._getSlidesListView(slidesCollection);
        this.listenTo(listView, "itemview:slide:updated:with:data", function(iv, data) {
          var slide;
          slide = iv.model;
          slide.set(data);
          return slide.save({
            wait: true
          });
        });
        this.listenTo(listView, "itemview:remove:slide", function(iv, slide) {
          return console.log("Remove slide app");
        });
        this.listenTo(layout, "show:add:new:slide", function() {
          return App.execute("show:add:new:slide", {
            region: layout.addSlideRegion
          });
        });
        this.listenTo(layout.addSlideRegion, "region:closed", (function(_this) {
          return function() {
            return layout.triggerMethod("show:add:slide");
          };
        })(this));
        this.listenTo(layout, "show", function() {
          return layout.slidesListRegion.show(listView);
        });
        return this.show(layout, {
          loading: true
        });
      };

      SlidesListController.prototype._getSlidesListView = function(slidesCollection) {
        return new SlidesListView({
          collection: slidesCollection
        });
      };

      SlidesListController.prototype._getSlidesListLayout = function() {
        return new SlidesListLayout;
      };

      return SlidesListController;

    })(AppController);
    SlideView = (function(_super) {
      __extends(SlideView, _super);

      function SlideView() {
        return SlideView.__super__.constructor.apply(this, arguments);
      }

      SlideView.prototype.tagName = 'div';

      SlideView.prototype.className = 'panel panel-default';

      SlideView.prototype.template = '<div class="panel-heading"> <a class="accordion-toggle" data-toggle="collapse" data-parent="#slides-accordion" href="#slide-{{id}}"> <div class="aj-imp-image-item row"> <div class="imgthumb col-sm-1"> <img src="{{thumb_url}}" class="img-responsive"> </div> <div class="imgname col-sm-7">{{file_name}}</div> <div class="imgactions col-sm-2"> <button class="btn" title="Edit Image"><span class="glyphicon glyphicon-edit"></span> Edit Image</button> <button class="btn remove-slide" title="Delete Image"><span class="glyphicon glyphicon-remove-sign"></span></button> </div> </div> </a> </div> <div id="slide-{{id}}" class="panel-collapse collapse"> <div class="panel-body"> <div class="aj-imp-edit-image well"> <div class="row"> <div class="aj-imp-crop-link col-sm-4"> <img src="{{thumb_url}}" class="img-responsive"> <div class="aj-imp-crop-link-overlay"> <a href="#"> <span class="glyphicon glyphicon-edit"></span> Edit Image </a> </div> </div> <div class="aj-imp-img-form col-sm-8"> <div class="row"> <div class="col-sm-6"> <input type="text" name="" value="{{slide_title}}" class="form-control" placeholder="Title"> </div> <div class="col-sm-6"> <input type="url" value="{{link}}" class="form-control" placeholder="Link"> </div> </div> </div> </div> <div class="aj-imp-img-save"> <button class="btn update-slide">Update</button> </div> </div> </div> </div>';

      SlideView.prototype.events = {
        'click .update-slide': function() {
          var data;
          data = Backbone.Syphon.serialize(this);
          return this.trigger("slide:updated:with:data", data);
        },
        'click .remove-slide': function(e) {
          e.preventDefault();
          return this.trigger("remove:slide", this.model);
        }
      };

      return SlideView;

    })(Marionette.ItemView);
    SlidesListView = (function(_super) {
      __extends(SlidesListView, _super);

      function SlidesListView() {
        return SlidesListView.__super__.constructor.apply(this, arguments);
      }

      SlidesListView.prototype.template = '<div class="aj-imp-image-header row"> <div class="col-sm-1"> &nbsp; </div> <div class="col-sm-7"> File Name </div> <div class="col-sm-2 align-center"> Actions </div> </div> <div class="panel-group" id="slides-accordion"></div>';

      SlidesListView.prototype.itemView = SlideView;

      SlidesListView.prototype.itemViewContainer = '#slides-accordion';

      SlidesListView.prototype.onBeforeRender = function() {
        return this.collection.sort();
      };

      SlidesListView.prototype.onShow = function() {
        return this.$el.sortable();
      };

      SlidesListView.prototype.onClose = function() {
        return this.$el.sortable('destroy');
      };

      return SlidesListView;

    })(Marionette.CompositeView);
    SlidesListLayout = (function(_super) {
      __extends(SlidesListLayout, _super);

      function SlidesListLayout() {
        return SlidesListLayout.__super__.constructor.apply(this, arguments);
      }

      SlidesListLayout.prototype.template = '<div id="slides-list-region"></div> <div class="aj-imp-block-button add-new-slide"> <button class="btn btn-default btn-hg btn-block"><span class="icon-uniF10C"></span>&nbsp;&nbsp;Add Slide</button> </div> <div id="add-slide-region"></div>';

      SlidesListLayout.prototype.events = {
        'click .add-new-slide': function() {
          this.$el.find('.add-new-slide').hide();
          return this.trigger("show:add:new:slide");
        }
      };

      SlidesListLayout.prototype.onShowAddSlide = function() {
        return this.$el.find('.add-new-slide').show();
      };

      SlidesListLayout.prototype.regions = {
        slidesListRegion: '#slides-list-region',
        addSlideRegion: '#add-slide-region'
      };

      return SlidesListLayout;

    })(Marionette.Layout);
    return App.commands.setHandler('show:slides:list', function(opts) {
      if (opts == null) {
        opts = {};
      }
      return new SlidesListController(opts);
    });
  });
});
