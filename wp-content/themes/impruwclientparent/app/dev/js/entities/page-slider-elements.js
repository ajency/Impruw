var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.PageSliderElements", function(PageSliderElements, App, Backbone, Marionette, $, _) {
    var API, tableElementModel;
    PageSliderElements.SliderElementModel = (function(_super) {
      __extends(SliderElementModel, _super);

      function SliderElementModel() {
        return SliderElementModel.__super__.constructor.apply(this, arguments);
      }

      SliderElementModel.prototype.name = 'pageSliderElement';

      SliderElementModel.prototype.idAttribute = 'slider_id';

      return SliderElementModel;

    })(Backbone.Model);
    PageSliderElements.SliderElementCollection = (function(_super) {
      __extends(SliderElementCollection, _super);

      function SliderElementCollection() {
        return SliderElementCollection.__super__.constructor.apply(this, arguments);
      }

      SliderElementCollection.prototype.model = PageSliderElements.SliderElementModel;

      SliderElementCollection.prototype.url = function() {
        return AJAXURL + '?action=get-page-sliders';
      };

      return SliderElementCollection;

    })(Backbone.Collection);
    tableElementModel = new PageSliderElements.SliderElementModel;
    API = {
      getPageSliders: function(pageId) {
        var sliderCollection;
        sliderCollection = new PageSliderElements.SliderElementCollection;
        sliderCollection.fetch({
          data: {
            pageId: pageId
          }
        });
        return sliderCollection;
      }
    };
    return App.reqres.setHandler("get:page:slider:elements", function(pageId) {
      return API.getPageSliders(pageId);
    });
  });
});
