var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/builder/site-builder/elements/image/views', 'apps/builder/site-builder/elements/image/settings/controller'], function(App) {
  return App.module('SiteBuilderApp.Element.Image', function(Image, App, Backbone, Marionette, $, _) {
    return Image.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.renderElement = __bind(this.renderElement, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        _.defaults(options.modelData, {
          element: 'Image',
          image_id: 0,
          size: 'thumbnail',
          align: 'left',
          heightRatio: 'auto',
          topRatio: 0,
          link: '#',
          target: '_self',
          link_check: false
        });
        if (options.modelData.element === 'Logo') {
          options.modelData.image_id = window.LOGOID;
        }
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype.bindEvents = function() {
        this.listenTo(this.layout.model, "change:image_id change:align ", this.renderElement);
        this.listenTo(this.layout.model, 'change:link change:target change:link_check', (function(_this) {
          return function() {
            return _this.layout.model.save();
          };
        })(this));
        return Controller.__super__.bindEvents.call(this);
      };

      Controller.prototype._getTemplateHelpers = function() {
        return {
          size: this.layout.model.get('size'),
          alignment: this.layout.model.get('align')
        };
      };

      Controller.prototype._getImageView = function(imageModel) {
        return new Image.Views.ImageView({
          model: imageModel,
          eleModel: this.layout.model,
          templateHelpers: this._getTemplateHelpers()
        });
      };

      Controller.prototype.renderElement = function() {
        var imageModel;
        this.removeSpinner();
        if (!this.imageModel) {
          imageModel = App.request("get:media:by:id", this.layout.model.get('image_id'));
        } else {
          imageModel = this.imageModel;
        }
        return App.execute("when:fetched", imageModel, (function(_this) {
          return function() {
            var view;
            view = _this._getImageView(imageModel);
            _this.listenTo(view, "show:media:manager", function(ratio) {
              if (ratio == null) {
                ratio = false;
              }
              App.navigate("media-manager", {
                trigger: true
              });
              App.currentImageRatio = ratio;
              _this.listenTo(App.vent, "media:manager:choosed:media", function(media) {
                _this.layout.model.set('image_id', media.get('id'));
                App.currentImageRatio = false;
                _this.stopListening(App.vent, "media:manager:choosed:media");
                _this.layout.model.save();
                _this.imageModel = media;
                if (_this.layout.model.get('element') === 'Logo') {
                  window.LOGOID = media.get('id');
                }
                return _this.renderElement();
              });
              return _this.listenTo(App.vent, "stop:listening:to:media:manager", function() {
                App.currentImageRatio = false;
                return _this.stopListening(App.vent, "media:manager:choosed:media");
              });
            });
            _this.listenTo(view, "image:size:selected", function(size) {
              _this.layout.model.set('size', size);
              if (_this.layout.model.hasChanged()) {
                return _this.layout.model.save();
              }
            });
            _this.listenTo(view, 'set:image:height', function(height, width) {
              if (height === 'auto') {
                _this.layout.model.set('heightRatio', 'auto');
              } else {
                _this.layout.model.set('heightRatio', height / width);
              }
              return _this.layout.model.save();
            });
            _this.listenTo(view, 'set:image:top:position', function(width, top) {
              _this.layout.model.set('top', top);
              _this.layout.model.set('topRatio', top / width);
              return _this.layout.model.save();
            });
            return _this.layout.elementRegion.show(view);
          };
        })(this));
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
