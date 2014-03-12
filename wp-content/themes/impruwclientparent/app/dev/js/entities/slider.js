var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Slider", function(Slider, App, Backbone, Marionette, $, _) {
    var API, SlideCollection, SlideModel;
    Slider.SliderModel = (function(_super) {
      __extends(SliderModel, _super);

      function SliderModel() {
        return SliderModel.__super__.constructor.apply(this, arguments);
      }

      SliderModel.prototype.idAttribute = 'id';

      SliderModel.prototype.name = 'slider';

      return SliderModel;

    })(Backbone.AssociatedModel);
    SlideModel = (function(_super) {
      __extends(SlideModel, _super);

      function SlideModel() {
        return SlideModel.__super__.constructor.apply(this, arguments);
      }

      SlideModel.prototype.name = 'slide';

      return SlideModel;

    })(Slider.SliderModel);
    Slider.SliderCollection = (function(_super) {
      __extends(SliderCollection, _super);

      function SliderCollection() {
        return SliderCollection.__super__.constructor.apply(this, arguments);
      }

      SliderCollection.prototype.model = Slider.SliderModel;

      SliderCollection.prototype.url = function() {
        return "" + AJAXURL + "?action=fetch-sliders";
      };

      return SliderCollection;

    })(Backbone.Collection);
    SlideCollection = (function(_super) {
      __extends(SlideCollection, _super);

      function SlideCollection() {
        return SlideCollection.__super__.constructor.apply(this, arguments);
      }

      SlideCollection.prototype.model = SlideModel;

      SlideCollection.prototype.comparator = 'order';

      SlideCollection.prototype.saveOrder = function(options) {
        var slideIds;
        if (options == null) {
          options = {};
        }
        this.sort();
        slideIds = this.map(function(slide, index) {
          return slide.get('id');
        });
        return $.post(AJAXURL, {
          action: 'update-slides-order',
          newOrder: slideIds
        }, (function(_this) {
          return function(response) {
            if (options.success) {
              options.success();
            }
            return _this.trigger("slides:order:updated");
          };
        })(this), 'json');
      };

      return SlideCollection;

    })(Backbone.Collection);
    API = {
      createStoreCollection: function() {
        var sliderCollection;
        sliderCollection = new Slider.SliderCollection;
        return App.request("set:collection", 'slidercollection', sliderCollection);
      },
      fetchSliders: function(reset) {
        var sliderCollection;
        sliderCollection = App.request("get:collection", 'slidercollection');
        sliderCollection.fetch({
          reset: reset
        });
        return sliderCollection;
      },
      fetchSlides: function(sliderId, reset) {
        var slideCollection;
        slideCollection = new SlideCollection();
        slideCollection.url = "" + AJAXURL + "?action=fetch-slides&slider_id=" + sliderId;
        slideCollection.fetch({
          reset: reset
        });
        return slideCollection;
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
        sliderCollection.add(slider);
        return slider;
      },
      createNewSlide: function(data) {
        var slide;
        slide = new SlideModel(data);
        return slide;
      }
    };
    App.commands.setHandler("create:slider:store", function() {
      return API.createStoreCollection();
    });
    App.reqres.setHandler("get:sliders", function(shouldReset) {
      if (shouldReset == null) {
        shouldReset = true;
      }
      return API.fetchSliders(shouldReset);
    });
    App.reqres.setHandler("get:slides", function(sliderId, shouldReset) {
      if (shouldReset == null) {
        shouldReset = true;
      }
      return API.fetchSlides(shouldReset);
    });
    App.reqres.setHandler("get:slider:by:id", function(sliderId) {
      return API.getSliderById(sliderId);
    });
    App.reqres.setHandler("get:slides:for:slide", function(sliderId, shouldReset) {
      if (shouldReset == null) {
        shouldReset = true;
      }
      return API.fetchSlides(sliderId, shouldReset);
    });
    App.reqres.setHandler("create:new:slider:model", function(modelData) {
      return API.createNewSlider(modelData);
    });
    return App.reqres.setHandler("create:new:slide:model", function(modelData) {
      return API.createNewSlide(modelData);
    });
  });
});
