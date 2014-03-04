var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Slider", function(Slider, App, Backbone, Marionette, $, _) {
    var API;
    Slider.SliderModel = (function(_super) {
      __extends(SliderModel, _super);

      function SliderModel() {
        return SliderModel.__super__.constructor.apply(this, arguments);
      }

      SliderModel.prototype.idAttribute = 'id';

      return SliderModel;

    })(Backbone.AssociatedModel);
    Slider.SliderCollection = (function(_super) {
      __extends(SliderCollection, _super);

      function SliderCollection() {
        return SliderCollection.__super__.constructor.apply(this, arguments);
      }

      SliderCollection.prototype.filters = {
        order: 'DESC',
        orderby: 'date',
        paged: 1,
        posts_per_page: 40
      };

      SliderCollection.prototype.model = Slider.SliderModel;

      SliderCollection.prototype.parse = function(resp) {
        if (resp.code === 'OK') {
          return resp.data;
        }
        return resp;
      };

      return SliderCollection;

    })(Backbone.Collection);
    API = {
      createStoreCollection: function() {
        var sliderCollection;
        sliderCollection = new Slider.SliderCollection;
        return App.request("set:collection", 'slidercollection', sliderCollection);
      },
      fetchSliders: function(reset) {
        return App.request("set:collection", 'slidercollection', sliderCollection);
      },
      getSliderById: function(sliderId) {
        var slider, sliderCollection;
        sliderCollection = App.request("get:collection", 'slidercollection');
        slider = sliderCollection.get(parseInt(sliderId));
        if (_.isUndefined(slider)) {
          slider = new Slider.SliderModel({
            id: sliderId
          });
          slider.url = "" + AJAXURL + "?action=get-slider&id=" + sliderId;
          sliderCollection.add(slider);
          slider.fetch();
        }
        return slider;
      },
      createNewSlider: function(data) {
        var slider, sliderCollection;
        slider = new Slider.SliderModel(data);
        sliderCollection = App.request("get:collection", 'slidercollection');
        slider.collection = sliderCollection;
        return slider;
      }
    };
    App.commands.setHandler("create:slider:store", function() {
      return API.createStoreCollection();
    });
    App.reqres.setHandler("fetch:sliders", function(shouldReset) {
      if (shouldReset == null) {
        shouldReset = true;
      }
      return API.fetchSliders(shouldReset);
    });
    App.reqres.setHandler("get:slider:by:id", function(sliderId) {
      return API.getSliderById(sliderId);
    });
    return App.reqres.setHandler("create:new:slider:model", function(modelData) {
      return API.createNewSlider(modelData);
    });
  });
});
