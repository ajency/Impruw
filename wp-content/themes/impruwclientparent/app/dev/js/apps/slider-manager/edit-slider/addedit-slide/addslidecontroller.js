var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module('SliderManager.EditSlider.AddSlide', function(AddSlide, App, Backbone, Marionette, $, _) {
    var AddSlideController, AddSlideLayout, AddSlideView;
    AddSlideController = (function(_super) {
      __extends(AddSlideController, _super);

      function AddSlideController() {
        this.newSlideCreated = __bind(this.newSlideCreated, this);
        return AddSlideController.__super__.constructor.apply(this, arguments);
      }

      AddSlideController.prototype.initialize = function() {
        var addSlideView, layout;
        this.layout = layout = this._getAddSlideLayout();
        addSlideView = this._getAddSlideView();
        this.listenTo(layout, "show", (function(_this) {
          return function() {
            layout.addSlideFormRegion.show(addSlideView);
            App.execute("start:media:upload:app", {
              region: layout.uploadMediaRegion
            });
            return App.execute("start:media:grid:app", {
              region: layout.gridMediaRegion
            });
          };
        })(this));
        this.listenTo(addSlideView, "create:new:slide", (function(_this) {
          return function(data) {
            var slide;
            slide = App.request("create:new:slide:model", data);
            return slide.save({
              wait: true,
              success: _this.newSlideCreated
            });
          };
        })(this));
        this.listenTo(addSlideView, "cancel:create:new:slide", (function(_this) {
          return function(data) {
            Marionette.triggerMethod.call(_this.region, "region:closed");
            return layout.close();
          };
        })(this));
        return this.show(layout);
      };

      AddSlideController.prototype.newSlideCreated = function(model, response, options) {
        Marionette.triggerMethod.call(this.region, "new:slide:created", model);
        return this.layout.close();
      };

      AddSlideController.prototype._getAddSlideLayout = function() {
        return new AddSlideLayout;
      };

      AddSlideController.prototype._getAddSlideView = function() {
        return new AddSlideView;
      };

      return AddSlideController;

    })(AppController);
    AddSlideView = (function(_super) {
      __extends(AddSlideView, _super);

      function AddSlideView() {
        return AddSlideView.__super__.constructor.apply(this, arguments);
      }

      AddSlideView.prototype.tagName = 'form';

      AddSlideView.prototype.template = '<div class="aj-imp-edit-image well"> <div class="row"> <div class="aj-imp-crop-link col-sm-4"> <img src="{{thumb_url}}" class="img-responsive add-image-to-slide"> </div> <div class="aj-imp-img-form col-sm-8"> <div class="row"> <div class="col-sm-6"> <input type="text" name="" value="{{slide_title}}" class="form-control" placeholder="Title"> </div> <div class="col-sm-6"> <input type="url" value="{{link}}" class="form-control" placeholder="Link"> </div> </div> </div> </div> <div class="aj-imp-img-save"> <button class="btn create-slide">Add</button> <button class="btn cancel-create-slide">Cancel</button> </div> </div>';

      AddSlideView.prototype.events = {
        'click .create-slide': function() {
          var data;
          data = Backbone.Syphon.serialize(this);
          return this.trigger("create:new:slide", data);
        },
        'click .add-image-to-slide': function() {
          return this.$el.closest('#add-slide-form-region').next().slideToggle();
        },
        'click .cancel-create-slide': function() {
          return this.trigger("cancel:create:new:slide");
        }
      };

      return AddSlideView;

    })(Marionette.ItemView);
    AddSlideLayout = (function(_super) {
      __extends(AddSlideLayout, _super);

      function AddSlideLayout() {
        return AddSlideLayout.__super__.constructor.apply(this, arguments);
      }

      AddSlideLayout.prototype.template = '<div id="add-slide-form-region"></div> <div id="media-region" style="display:none"> <ul class="nav nav-tabs"> <li><a href="#upload-media-region" data-toggle="tab">Upload</a></li> <li class="active"><a href="#grid-media-region" data-toggle="tab">All Media</a></li> </ul> <div class="tab-content"> <div class="tab-pane" id="upload-media-region"></div> <div class="tab-pane active" id="grid-media-region"></div> </div> </div>';

      AddSlideLayout.prototype.regions = {
        addSlideFormRegion: '#add-slide-form-region',
        uploadMediaRegion: '#upload-media-region',
        gridMediaRegion: '#grid-media-region'
      };

      return AddSlideLayout;

    })(Marionette.Layout);
    return App.commands.setHandler("show:add:new:slide", function(options) {
      if (options == null) {
        options = {};
      }
      return new AddSlideController(options);
    });
  });
});
