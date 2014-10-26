var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageContent.TranslatedSlider.Views', function(Views, App, Backbone, Marionette, $, _) {
    var TranslatedSlideItemView, TranslatedSlideView;
    TranslatedSlideItemView = (function(_super) {
      __extends(TranslatedSlideItemView, _super);

      function TranslatedSlideItemView() {
        return TranslatedSlideItemView.__super__.constructor.apply(this, arguments);
      }

      TranslatedSlideItemView.prototype.template = '<div class="form-group legend-group"> <div class="col-sm-12"> <div class="form-group trans-field"> <div class="col-sm-10"> <input type="text" class="form-control translated-element-content title" id="translated-slidercaption-title" value="{{captionTitle}}"> </div> </div> </div> </div> <div class="form-group legend-group"> <div class="col-sm-12"> <div class="form-group trans-field"> <div class="col-sm-10"> <input type="text" class="form-control translated-element-content text" id="translated-slidercaption-desc" value="{{captionDesc}}"><button id="btn-save-slider-translation-element" class="btn btn-xs trans-action aj-imp-orange-btn"> Save </button> </div> </div> </div> </div>';

      TranslatedSlideItemView.prototype.mixinTemplateHelpers = function(data) {
        var editingLanguage;
        data = TranslatedSlideItemView.__super__.mixinTemplateHelpers.call(this, data);
        editingLanguage = Marionette.getOption(this, 'editingLanguage');
        console.log(editingLanguage + " is the editing language");
        data.captionTitle = function() {
          var captionHtml, captionTitle;
          if (data[editingLanguage] !== void 0) {
            if (data[editingLanguage]['layers']['0'] !== void 0) {
              captionHtml = data[editingLanguage]['layers']['0']['text'];
              captionHtml = '<div>' + captionHtml + '</div>';
              captionTitle = $(captionHtml).find('.title').html();
            } else {
              captionTitle = "No caption title added";
            }
          } else {
            captionTitle = "";
          }
          return captionTitle;
        };
        data.captionDesc = function() {
          var captionDesc, captionHtml;
          if (data[editingLanguage] !== void 0) {
            if (data[editingLanguage]['layers']['0'] !== void 0) {
              captionHtml = data[editingLanguage]['layers']['0']['text'];
              captionHtml = '<div>' + captionHtml + '</div>';
              captionDesc = $(captionHtml).find('.text').html();
            } else {
              captionDesc = "No caption description added";
            }
          } else {
            captionDesc = "";
          }
          return captionDesc;
        };
        return data;
      };

      return TranslatedSlideItemView;

    })(Marionette.ItemView);
    TranslatedSlideView = (function(_super) {
      __extends(TranslatedSlideView, _super);

      function TranslatedSlideView() {
        return TranslatedSlideView.__super__.constructor.apply(this, arguments);
      }

      TranslatedSlideView.prototype.template = '<h6 class="aj-imp-sub-head-thin"><small>&nbsp;</small></h6> <div id="translated-page-slide"> </div> <hr>';

      TranslatedSlideView.prototype.itemView = TranslatedSlideItemView;

      TranslatedSlideView.prototype.itemViewContainer = '#translated-page-slide';

      TranslatedSlideView.prototype.initialize = function() {
        var collection;
        collection = new Backbone.Collection(this.model.get('slides'));
        return this.collection = collection;
      };

      TranslatedSlideView.prototype.itemViewOptions = function() {
        var editingLanguage;
        editingLanguage = Marionette.getOption(this, 'editingLanguage');
        return {
          editingLanguage: editingLanguage
        };
      };

      return TranslatedSlideView;

    })(Marionette.CompositeView);
    return Views.TranslatedSliderView = (function(_super) {
      __extends(TranslatedSliderView, _super);

      function TranslatedSliderView() {
        return TranslatedSliderView.__super__.constructor.apply(this, arguments);
      }

      TranslatedSliderView.prototype.template = '<div id="translated-page-slider"> </div>';

      TranslatedSliderView.prototype.itemView = TranslatedSlideView;

      TranslatedSliderView.prototype.itemViewContainer = '#translated-page-slider';

      TranslatedSliderView.prototype.itemViewOptions = function() {
        var language;
        language = Marionette.getOption(this, 'language');
        return {
          editingLanguage: language
        };
      };

      return TranslatedSliderView;

    })(Marionette.CompositeView);
  });
});
