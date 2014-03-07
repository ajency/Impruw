var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module('SliderManager.EditSlider.SlidesList', function(SlidesList, App, Backbone, Marionette, $, _) {
    var NoSlidesView, SlideView, SlidesListController, SlidesListLayout, SlidesListView;
    SlidesListController = (function(_super) {
      __extends(SlidesListController, _super);

      function SlidesListController() {
        return SlidesListController.__super__.constructor.apply(this, arguments);
      }

      SlidesListController.prototype.initialize = function(opt) {
        var collection, layout, listView;
        this.sliderId = opt.sliderId, collection = opt.collection;
        if (!collection) {
          collection = App.request("get:slides:for:slide", this.sliderId);
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
        this.listenTo(layout, "show:add:new:slide", function() {
          return App.execute("show:add:new:slide", {
            region: layout.addSlideRegion,
            sliderId: this.sliderId
          });
        });
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
        return this.show(layout, {
          loading: true
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

      return SlidesListController;

    })(AppController);
    SlideView = (function(_super) {
      __extends(SlideView, _super);

      function SlideView() {
        return SlideView.__super__.constructor.apply(this, arguments);
      }

      SlideView.prototype.tagName = 'div';

      SlideView.prototype.className = 'panel panel-default';

      SlideView.prototype.template = '<div class="panel-heading"> <a class="accordion-toggle" data-toggle="collapse" data-parent="#slides-accordion" href="#slide-{{id}}"> <div class="aj-imp-image-item row"> <div class="imgthumb col-sm-3"> <img src="{{thumb_url}}" class="img-responsive"> </div> <div class="imgname col-sm-5">{{file_name}}</div> <div class="imgactions col-sm-4"> <button class="btn btn-sm" title="Edit Image"><span class="glyphicon glyphicon-edit"></span> Edit Image</button> <button class="btn btn-danger btn-sm remove-slide" title="Delete Image"><span class="glyphicon glyphicon-remove-sign"></span></button> </div> </div> </a> </div> <div id="slide-{{id}}" class="panel-collapse collapse"> <div class="panel-body"> <div class="aj-imp-edit-image well"> <form> <div class="row"> <div class="aj-imp-crop-link col-sm-4"> <img src="{{thumb_url}}" class="img-responsive"> </div> <div class="aj-imp-img-form col-sm-8"> <div class="row"> <div class="col-sm-6"> <input type="text" required name="title" value="{{title}}" class="form-control" placeholder="Title"> </div> <div class="col-sm-6"> <input type="url" type="link" name="link" value="{{link}}" class="form-control" placeholder="Link"> </div> </div> <div class="row"> <div class="col-sm-12"> <textarea name="description" class="form-control" placeholder="Description">{{description}}</textarea> </div> </div> </div> </div> <div class="aj-imp-img-save"> <button type="button" class="btn update-slide">Update</button> </div> </form> </div> </div> </div>';

      SlideView.prototype.events = {
        'click .update-slide': function() {
          var data;
          data = Backbone.Syphon.serialize(this);
          return this.trigger("slide:updated:with:data", data);
        },
        'click .remove-slide': function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (confirm('Are you sure?')) {
            return this.trigger("remove:slide", this.model);
          }
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

      NoSlidesView.prototype.template = '<div class="alert">No slides. Please add slides.</div>';

      return NoSlidesView;

    })(Marionette.ItemView);
    SlidesListView = (function(_super) {
      __extends(SlidesListView, _super);

      function SlidesListView() {
        this.slidesSorted = __bind(this.slidesSorted, this);
        return SlidesListView.__super__.constructor.apply(this, arguments);
      }

      SlidesListView.prototype.template = '<div class="aj-imp-image-header row"> <div class="col-sm-3"> &nbsp; </div> <div class="col-sm-5"> File Name </div> <div class="col-sm-4"> Actions </div> </div> <div class="panel-group" id="slides-accordion"></div>';

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
          var slideId;
          slideId = parseInt(o);
          return {
            order: i + 1
          };
        });
        return console.log(newOrder);
      };

      SlidesListView.prototype.onClose = function() {
        return this.$el.find('#slides-accordion').sortable('destroy');
      };

      return SlidesListView;

    })(Marionette.CompositeView);
    SlidesListLayout = (function(_super) {
      __extends(SlidesListLayout, _super);

      function SlidesListLayout() {
        return SlidesListLayout.__super__.constructor.apply(this, arguments);
      }

      SlidesListLayout.prototype.template = '<div id="slides-list-region"></div> <div class="aj-imp-block-button add-new-slide"> <button class="btn btn-default btn-hg btn-block"><span class="bicon icon-uniF10C"></span>&nbsp;&nbsp;Add Slide</button> </div> <div id="add-slide-region"></div>';

      SlidesListLayout.prototype.events = {
        'click .add-new-slide': function() {
          this.$el.find('.add-new-slide').hide();
          return this.trigger("show:add:new:slide");
        }
      };

      SlidesListLayout.prototype.dialogOptions = {
        modal_title: 'Slider Manager',
        modal_size: 'medium-modal'
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
