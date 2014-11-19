var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.RoomSummary.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.RoomSummaryView = (function(_super) {
      __extends(RoomSummaryView, _super);

      function RoomSummaryView() {
        return RoomSummaryView.__super__.constructor.apply(this, arguments);
      }

      RoomSummaryView.prototype.className = 'roomsummary';

      RoomSummaryView.prototype.roomNotSetTemplate = '<div class="room-placeholder"> <div class="room-img"> <div class="image-placeholder"><span class="bicon icon-uniF10E"></span>Room Image</div> </div> <div class="room-title">' + _.polyglot.t("Your Room Title") + '</div> <div class="room-excerpt">' + _.polyglot.t("Choose room to display") + '</div> <div class="room-actions"> <div class="price">' + _.polyglot.t("Total:") + '{{no_of_rooms}}<small> ' + _.polyglot.t("rooms") + '</small></div> <button class="btn btn-room">' + _.polyglot.t("View Details") + '</button> </div> </div>';

      RoomSummaryView.prototype.singleRoomTemplate = '<div class="room-summary-container "> <div class="room-summary-title"> <h4>{{#polyglot}}Room Summary{{/polyglot}}</h4> </div> <div class="room-summary"> <div class="room-summary-item"> <span class="key">{{#polyglot}}No. of Rooms{{/polyglot}}: </span> <span class="value">{{#polyglot}}Visible on live{{/polyglot}}</span> </div> <div class="room-summary-item"> <span class="key">{{#polyglot}}Check-in{{/polyglot}} : </span> <span class="value">{{checkin_time}}</span> </div> <div class="room-summary-item"> <span class="key">{{#polyglot}}Check-out{{/polyglot}} : </span> <span class="value">{{checkout_time}}</span> </div> <div class="room-summary-item"> <span class="key">{{#polyglot}}Additional policy{{/polyglot}} : </span> <span class="value">{{additional_policy}}</span> </div> </div> </div>';

      RoomSummaryView.prototype.events = {
        'click .room-img > img': 'showMediaManager',
        'click .room-placeholder': 'showRoomSummaryEditPopup'
      };

      RoomSummaryView.prototype.showMediaManager = function(e) {
        e.stopPropagation();
        return this.trigger("show:media:manager", this._getImageRatio());
      };

      RoomSummaryView.prototype.mixinTemplateHelpers = function(data) {
        var imageModel, siteModel;
        data = RoomSummaryView.__super__.mixinTemplateHelpers.call(this, data);
        data.post_content = _.prune(data.post_content, 200);
        imageModel = Marionette.getOption(this, 'imageModel');
        if (!imageModel.isNew()) {
          data.image_url = imageModel.get('sizes').medium ? imageModel.get('sizes').medium.url : imageModel.get('sizes').full.url;
        }
        siteModel = Marionette.getOption(this, 'siteModel');
        data.additional_policy = siteModel.get('additional_policy');
        data.checkout_time = siteModel.get('checkout_time');
        data.checkin_time = siteModel.get('checkin_time');
        return data;
      };

      RoomSummaryView.prototype._getImageRatio = function() {
        var height, width;
        width = this.$el.find('.room-img').width();
        height = this.$el.find('.room-img').height();
        return "" + (parseInt(width)) + ":" + (parseInt(height));
      };

      RoomSummaryView.prototype.showRoomSummaryEditPopup = function(evt) {
        evt.preventDefault();
        return this.$el.closest('.element-wrapper').find('.aj-imp-settings-btn').click();
      };

      RoomSummaryView.prototype.onShow = function() {
        var isSingle;
        isSingle = Marionette.getOption(this, 'isSingleRoom');
        if (!_.isUndefined(isSingle)) {
          this.$el.closest('.element-wrapper').children('.element-controls').find('.aj-imp-settings-btn').remove();
          this.$el.attr("data-content", _.polyglot.t('Update display details') + (" <a href='" + SITEURL + "/dashboard/#/room-summary' target='BLANK'>") + _.polyglot.t('here') + "</a> ");
          return this.$el.popover({
            html: true,
            placement: 'top'
          });
        }
      };

      RoomSummaryView.prototype.onBeforeRender = function() {
        var isSingle, roomNotSet;
        isSingle = Marionette.getOption(this, 'isSingleRoom');
        if (!_.isUndefined(isSingle)) {
          this.template = this.singleRoomTemplate;
        }
        roomNotSet = Marionette.getOption(this, 'roomNotSet');
        if (!_.isUndefined(roomNotSet)) {
          return this.template = this.roomNotSetTemplate;
        }
      };

      return RoomSummaryView;

    })(Marionette.ItemView);
  });
});
