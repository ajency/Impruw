var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Slider", function(Slider, App, Backbone, Marionette, $, _) {
    var API, SlideCollection, SlideModel, sliderCollection;
    Slider.SliderModel = (function(_super) {
      __extends(SliderModel, _super);

      function SliderModel() {
        return SliderModel.__super__.constructor.apply(this, arguments);
      }

      SliderModel.prototype.idAttribute = 'id';

      SliderModel.prototype.name = 'slider';

      return SliderModel;

    })(Backbone.Model);
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
        var data, params;
        if (options == null) {
          options = {};
        }
        this.sort();
        data = {
          arrIDs: []
        };
        data.arrIDs = this.map(function(slide, index) {
          return slide.get('id');
        });
        data['sliderID'] = this.at(0).get('slider_id');
        params = {
          action: 'revslider_ajax_action',
          client_action: 'update_slides_order',
          data: data,
          nonce: _RVNONCE
        };
        return $.post(AJAXURL, params, (function(_this) {
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
    sliderCollection = new Slider.SliderCollection;
    API = {
      fetchSliders: function(reset) {
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
        var slider;
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
        var slider;
        slider = new Slider.SliderModel(data);
        sliderCollection.add(slider);
        return slider;
      },
      createNewSlide: function(data) {
        var slide;
        slide = new SlideModel(data);
        return slide;
      }
    };
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
    App.reqres.setHandler("get:slides:collection", function() {
      return new SlideCollection;
    });
    App.reqres.setHandler("get:dummy:slides:collection", function() {
      return new SlideCollection([
        {
          "id": 1,
          "thumb_url": "http://classicgreen2.unpruwen.com/wp-content/themes/impruwclientparent/images/dummy/1.jpg",
          "order": 1
        }, {
          "id": 2,
          "thumb_url": "http://classicgreen2.unpruwen.com/wp-content/themes/impruwclientparent/images/dummy/2.jpg",
          "order": 2
        }, {
          "id": 3,
          "thumb_url": "http://classicgreen2.unpruwen.com/wp-content/themes/impruwclientparent/images/dummy/3.jpg",
          "order": 3
        }, {
          "id": 4,
          "thumb_url": "http://classicgreen2.unpruwen.com/wp-content/themes/impruwclientparent/images/dummy/4.jpg",
          "order": 4
        }, {
          "id": 5,
          "thumb_url": "http://classicgreen2.unpruwen.com/wp-content/themes/impruwclientparent/images/dummy/5.jpg",
          "order": 5
        }
      ]);
    });
    App.reqres.setHandler("create:new:slider:model", function(modelData) {
      return API.createNewSlider(modelData);
    });
    return App.reqres.setHandler("create:new:slide:model", function(modelData) {
      return API.createNewSlide(modelData);
    });
  });
});
