var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageContent.OriginalSlider.Views', function(Views, App, Backbone, Marionette, $, _) {
    var EmptySliderView, OriginalSlideItemView, OriginalSlideView;
    OriginalSlideItemView = (function(_super) {
      __extends(OriginalSlideItemView, _super);

      function OriginalSlideItemView() {
        return OriginalSlideItemView.__super__.constructor.apply(this, arguments);
      }

      OriginalSlideItemView.prototype.template = '<div class="form-group legend-group"> <div class="col-sm-12"> <div class="form-group"> <label for="" class="col-sm-3 control-label">Caption</label> <div class="col-sm-9 col-sm-offset-3"> <div tabindex="1" class="original title"> {{{captionTitle}}} </div> </div> </div> </div> </div> <div class="form-group legend-group"> <div class="col-sm-12"> <div class="form-group"> <label for="" class="col-sm-3 control-label">Description</label> <div class="col-sm-9 col-sm-offset-3"> <div tabindex="1" class="original text"> {{captionDesc}} </div> </div> </div> </div> </div>';

      OriginalSlideItemView.prototype.mixinTemplateHelpers = function(data) {
        data = OriginalSlideItemView.__super__.mixinTemplateHelpers.call(this, data);
        data.captionTitle = function() {
          var captionHtml, captionTitle;
          if (data[WPML_DEFAULT_LANG]['layers']['0'] !== void 0) {
            captionHtml = data[WPML_DEFAULT_LANG]['layers']['0']['text'];
            captionHtml = '<div>' + captionHtml + '</div>';
            captionTitle = $(captionHtml).find('.title').text();
          } else {
            captionTitle = "No caption title added";
          }
          return captionTitle;
        };
        data.captionDesc = function() {
          var captionDesc, captionHtml;
          if (data[WPML_DEFAULT_LANG]['layers']['0'] !== void 0) {
            captionHtml = data[WPML_DEFAULT_LANG]['layers']['0']['text'];
            captionHtml = '<div>' + captionHtml + '</div>';
            captionDesc = $(captionHtml).find('.text').html();
          } else {
            captionDesc = "No caption description added";
          }
          return captionDesc;
        };
        return data;
      };

      return OriginalSlideItemView;

    })(Marionette.ItemView);
    OriginalSlideView = (function(_super) {
      __extends(OriginalSlideView, _super);

      function OriginalSlideView() {
        return OriginalSlideView.__super__.constructor.apply(this, arguments);
      }

      OriginalSlideView.prototype.template = '<h6 class="aj-imp-sub-head-thin"><small>&nbsp;</small></h6> <div id="original-page-slide"> </div> <hr>';

      OriginalSlideView.prototype.itemView = OriginalSlideItemView;

      OriginalSlideView.prototype.itemViewContainer = '#original-page-slide';

      OriginalSlideView.prototype.initialize = function() {
        var collection;
        collection = new Backbone.Collection(this.model.get('slides'));
        return this.collection = collection;
      };

      return OriginalSlideView;

    })(Marionette.CompositeView);
    EmptySliderView = (function(_super) {
      __extends(EmptySliderView, _super);

      function EmptySliderView() {
        return EmptySliderView.__super__.constructor.apply(this, arguments);
      }

      EmptySliderView.prototype.template = '<br/><div class="empty-info">You have no slides to translate</div><br/>';

      return EmptySliderView;

    })(Marionette.ItemView);
    return Views.OriginalSliderView = (function(_super) {
      __extends(OriginalSliderView, _super);

      function OriginalSliderView() {
        return OriginalSliderView.__super__.constructor.apply(this, arguments);
      }

      OriginalSliderView.prototype.template = '<div id="original-page-slider"> </div>';

      OriginalSliderView.prototype.itemView = OriginalSlideView;

      OriginalSliderView.prototype.emptyView = EmptySliderView;

      OriginalSliderView.prototype.itemViewContainer = '#original-page-slider';

      return OriginalSliderView;

    })(Marionette.CompositeView);
  });
});
