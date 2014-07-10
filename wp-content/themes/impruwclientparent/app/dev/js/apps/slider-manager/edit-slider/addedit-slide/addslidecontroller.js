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

      AddSlideController.prototype.initialize = function(opt) {
        var addSlideView, layout;
        if (opt == null) {
          opt = {};
        }
        this.sliderId = opt.sliderId;
        this.layout = layout = this._getAddSlideLayout();
        addSlideView = this._getAddSlideView();
        this.listenTo(layout, "show", (function(_this) {
          return function() {
            layout.addSlideFormRegion.show(addSlideView);
            App.execute("start:media:upload:app", {
              region: layout.uploadMediaRegion
            });
            App.execute("start:media:grid:app", {
              region: layout.gridMediaRegion
            });
            return _this.listenTo(layout.uploadMediaRegion, "media:upload:complete", function() {
              return App.execute("start:media:grid:app", {
                region: _this.layout.gridMediaRegion
              });
            });
          };
        })(this));
        this.listenTo(addSlideView, "create:new:slide", (function(_this) {
          return function(data) {
            var slide;
            data.slider_id = _this.sliderId;
            slide = App.request("create:new:slide:model", data);
            slide.set(data);
            return slide.save(null, {
              wait: true,
              success: _this.newSlideCreated
            });
          };
        })(this));
        this.listenTo(layout, "media:element:selected", function(media) {
          return addSlideView.triggerMethod("slide:image:selected", media);
        });
        this.listenTo(layout, "image:selection:done", (function(_this) {
          return function() {
            return addSlideView.triggerMethod("show:action:button");
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

      AddSlideView.prototype.template = '<div class="aj-imp-edit-image"> <div class="row hide"> <div class="aj-imp-crop-link col-sm-4"> <div class="add-image-to-slide"> <span class="bicon icon-uniF10C"></span> {{#polyglot}}Click to Add an Image to Your Slide{{/polyglot}} </div> <img src="{{thumb_url}}" class="img-responsive slide-image" style="display:none;"> <input type="hidden" name="background_type" value="image"/> <input type="hidden" name="image" value="" required/> <input type="hidden" name="image_id" value="" require/> </div> </div> <div class="aj-imp-img-save"> <button type="button" class="btn aj-imp-orange-btn create-slide">{{#polyglot}}Add{{/polyglot}}</button> <button type="button" class="btn cancel-create-slide">{{#polyglot}}Cancel{{/polyglot}}</button> </div> </div>';

      AddSlideView.prototype.onSlideImageSelected = function(media) {
        var url;
        url = media.get('sizes').thumbnail ? media.get('sizes').thumbnail.url : media.get('sizes').full.url;
        this.$el.find('.add-image-to-slide').hide();
        this.$el.find('.slide-image').attr('src', url);
        this.$el.find('.slide-image').show();
        this.$el.find('input[name="image"]').val(media.get('url'));
        return this.$el.find('input[name="image_id"]').val(media.get('id'));
      };

      AddSlideView.prototype.onShowActionButton = function() {
        return this.$el.find('.aj-imp-img-save').show();
      };

      AddSlideView.prototype.events = {
        'click .create-slide': function(e) {
          var data;
          if (this.$el.valid()) {
            data = Backbone.Syphon.serialize(this);
            $(e.target).attr('disabled', true);
            return this.trigger("create:new:slide", data);
          }
        },
        'click .add-image-to-slide,.slide-image': function() {
          this.$el.find('.aj-imp-img-save').hide();
          return this.$el.closest('#add-slide-form-region').next().show();
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

      AddSlideLayout.prototype.template = '<div id="media-region"> <ul class="nav nav-tabs"> <li class="active all-media-tab"><a href="#grid-media-region" data-toggle="tab">{{#polyglot}}Gallery{{/polyglot}}</a></li> <li class="upload-tab"><a href="#upload-media-region" data-toggle="tab">{{#polyglot}}Upload{{/polyglot}}</a></li> </ul> <div class="tab-content"> <div class="tab-pane active" id="grid-media-region"></div> <div class="tab-pane" id="upload-media-region"></div> </div> </div><div id="add-slide-form-region"></div>';

      AddSlideLayout.prototype.events = {
        'click .slide-image-selected': function(e) {
          return this.trigger("image:selection:done");
        }
      };

      AddSlideLayout.prototype.initialize = function() {
        return this.listenTo(this.gridMediaRegion, "media:element:selected", function(media) {
          return this.trigger("media:element:selected", media);
        });
      };

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
