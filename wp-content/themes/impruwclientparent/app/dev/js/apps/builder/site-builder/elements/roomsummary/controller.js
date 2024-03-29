var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/builder/site-builder/elements/roomsummary/views', 'apps/builder/site-builder/elements/roomsummary/settings/controller'], function(App) {
  return App.module('SiteBuilderApp.Element.RoomSummary', function(RoomSummary, App, Backbone, Marionette, $, _) {
    return RoomSummary.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.renderElement = __bind(this.renderElement, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        _.defaults(options.modelData, {
          element: 'RoomSummary',
          room_id: 0,
          style: 'Room Summary Default',
          image_id: 0
        });
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype.bindEvents = function() {
        this.listenTo(this.layout.model, "change:style", this.renderElement);
        this.listenTo(this.layout.model, "change:room_id", this.renderElement);
        return Controller.__super__.bindEvents.call(this);
      };

      Controller.prototype._getRoomSummaryView = function(model, imageModel, siteModel, template) {
        var opt;
        opt = {
          model: model,
          imageModel: imageModel,
          siteModel: siteModel
        };
        if (this.isSingleRoomPage()) {
          opt.isSingleRoom = true;
        } else if (model.get('ID') === 0) {
          opt.roomNotSet = true;
        } else {
          opt.template = template;
        }
        return new RoomSummary.Views.RoomSummaryView(opt);
      };

      Controller.prototype.isSingleRoomPage = function() {
        var pageName;
        pageName = App.request("get:current:editable:page:name");
        return pageName === SINGLE_ROOM_PAGE;
      };

      Controller.prototype.renderElement = function() {
        var imageModel, model, roomId, siteModel;
        this.removeSpinner();
        roomId = this.layout.model.get('room_id');
        model = App.request("get:room:model", roomId);
        if (model.has('feature_image_id')) {
          this.layout.model.set('image_id', model.get('feature_image_id'));
        }
        imageModel = App.request("get:media:by:id", this.layout.model.get('image_id'));
        siteModel = App.request("get:site:model");
        return App.execute("when:fetched", [model, imageModel, siteModel], (function(_this) {
          return function() {
            var template, view;
            template = _this._getElementTemplate(_this.layout.model);
            view = _this._getRoomSummaryView(model, imageModel, siteModel, template);
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
                model.set('feature_image_id', media.get('id'));
                App.currentImageRatio = false;
                _this.stopListening(App.vent, "media:manager:choosed:media");
                _this.layout.model.save();
                _this.imageModel = media;
                return _this.renderElement();
              });
              return _this.listenTo(App.vent, "stop:listening:to:media:manager", function() {
                App.currentImageRatio = false;
                return _this.stopListening(App.vent, "media:manager:choosed:media");
              });
            });
            return _this.layout.elementRegion.show(view);
          };
        })(this));
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
