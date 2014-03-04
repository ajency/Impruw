var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'holder', 'text!apps/builder/site-builder/elements/slider/templates/slider.html'], function(App, Holder, sliderTpl) {
  return App.module('SiteBuilderApp.Element.Slider.Views', function(Views, App, Backbone, Marionette, $, _) {
    var SliderItem;
    SliderItem = (function(_super) {
      __extends(SliderItem, _super);

      function SliderItem() {
        return SliderItem.__super__.constructor.apply(this, arguments);
      }

      SliderItem.prototype.className = 'item';

      SliderItem.prototype.template = '<img src="http://placehold.it/900x400" alt="Slide"/>';

      SliderItem.prototype.tagName = 'li';

      SliderItem.prototype.events = {
        'click': function(e) {
          return this.trigger("show:slider:manager");
        }
      };

      return SliderItem;

    })(Marionette.ItemView);
    return Views.SliderView = (function(_super) {
      __extends(SliderView, _super);

      function SliderView() {
        return SliderView.__super__.constructor.apply(this, arguments);
      }

      SliderView.prototype.className = 'slider';

      SliderView.prototype.template = sliderTpl;

      SliderView.prototype.id = _.uniqueId('carousel-');

      SliderView.prototype.itemView = SliderItem;

      SliderView.prototype.itemViewContainer = '.carousel-inner';

      SliderView.prototype.templateHelpers = function(data) {
        if (data == null) {
          data = {};
        }
        data.slider_id = this.id;
        data.slides = this.collection.toJSON();
        return data;
      };

      SliderView.prototype.onShow = function() {
        return this.$el.find('.carousel').carousel();
      };

      return SliderView;

    })(Marionette.CompositeView);
  });
});
