var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module('SliderManager.EditSlider.SlidesList', function(SlidesList, App, Backbone, Marionette, $, _) {
    var SlideView, SlidesListController, SlidesListView;
    SlidesListController = (function(_super) {
      __extends(SlidesListController, _super);

      function SlidesListController() {
        return SlidesListController.__super__.constructor.apply(this, arguments);
      }

      SlidesListController.prototype.initialize = function(opt) {
        var listView, slidesCollection;
        this.sliderId = opt.sliderId;
        slidesCollection = App.request("get:slides:for:slide", this.sliderId);
        this.listView = listView = this._getSlidesListView(slidesCollection);
        this.listenTo(listView, "itemview:edit:slide", function(iv, slide) {
          return console.log("Edit slide app");
        });
        this.listenTo(listView, "itemview:remove:slide", function(iv, slide) {
          return console.log("Remove slide app");
        });
        return this.show(listView, {
          loading: true
        });
      };

      SlidesListController.prototype._getSlidesListView = function(slidesCollection) {
        return new SlidesListView({
          collection: slidesCollection
        });
      };

      SlidesListController.prototype.onClose = function() {
        return App.navigate('slider-manager');
      };

      return SlidesListController;

    })(AppController);
    SlideView = (function(_super) {
      __extends(SlideView, _super);

      function SlideView() {
        return SlideView.__super__.constructor.apply(this, arguments);
      }

      SlideView.prototype.tagName = 'li';

      SlideView.prototype.template = '<div class="slide"> <div class="row"> <div class="col-sm-1 move"> <div class="move-icon"> <span class="glyphicon glyphicon-resize-vertical"></span> </div> </div> <div class="col-sm-3 thumb"> <img src={{thumb_url}} alt=""/> </div> <div class="col-sm-8 details"> <div class="slide-actions"> <button class="btn btn-info btn-xs btn-link edit-slide"><span class="glyphicon glyphicon-pencil"></span> Edit Slide</button> <button class="btn btn-danger btn-xs btn-link remove-slide"><span class="glyphicon glyphicon-trash"></span> Delete</button> </div> </div> </div> </div>';

      SlideView.prototype.events = {
        'click .edit-slide': function(e) {
          return this.trigger("edit:slide", this.model);
        },
        'click .remove-slide': function(e) {
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

      SlidesListView.prototype.tagName = 'ul';

      SlidesListView.prototype.itemView = SlideView;

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

    })(Marionette.CollectionView);
    return App.commands.setHandler('show:slides:list', function(opts) {
      if (opts == null) {
        opts = {};
      }
      return new SlidesListController(opts);
    });
  });
});
