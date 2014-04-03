var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/builder/site-builder/elements/gallery/views', 'apps/builder/site-builder/elements/gallery/settings/controller'], function(App) {
  return App.module('SiteBuilderApp.Element.Gallery', function(Gallery, App, Backbone, Marionette, $, _) {
    return Gallery.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.renderElement = __bind(this.renderElement, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        _.defaults(options.modelData, {
          element: 'Gallery'
        });
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype.bindEvents = function() {
        this.listenTo(this.layout.model, "change:slider_id", this.renderElement);
        return Controller.__super__.bindEvents.call(this);
      };

      Controller.prototype._getGalleryView = function(collection) {
        return new Gallery.Views.GalleryView({
          collection: collection,
          inSingleRoom: this.isSingleRoomPage()
        });
      };

      Controller.prototype._getSlidesCollection = function() {
        if (!this.slidesCollection) {
          if (this.isSingleRoomPage() && !this.layout.model.get('slider_id')) {
            this.slidesCollection = App.request("get:dummy:slides:collection");
          } else {
            if (this.layout.model.get('slider_id') > 0) {
              this.slidesCollection = App.request("get:slides:for:slide", this.layout.model.get('slider_id'));
            } else {
              this.slidesCollection = App.request("get:slides:collection");
              this.slidesCollection.once("add", (function(_this) {
                return function(model) {
                  _this.layout.model.set('slider_id', model.get('slider_id'));
                  return _this.layout.model.save();
                };
              })(this));
            }
          }
        }
        return this.slidesCollection;
      };

      Controller.prototype.isSingleRoomPage = function() {
        var pageName;
        pageName = App.request("get:current:editable:page:name");
        return pageName === 'Single Room';
      };

      Controller.prototype.renderElement = function() {
        var slidesCollection;
        this.removeSpinner();
        slidesCollection = this._getSlidesCollection();
        return App.execute("when:fetched", slidesCollection, (function(_this) {
          return function() {
            var view;
            view = _this._getGalleryView(slidesCollection);
            if (!_this.isSingleRoomPage()) {
              _this.listenTo(view, "show:slides:manager", function() {
                return App.execute("show:slides:manager", slidesCollection);
              });
            }
            _this.listenTo(slidesCollection, "remove add slides:order:updated", function() {
              return _this.renderElement();
            });
            return _this.layout.elementRegion.show(view);
          };
        })(this));
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
