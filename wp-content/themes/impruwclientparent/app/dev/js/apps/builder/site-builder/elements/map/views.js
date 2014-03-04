var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.Map.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.MapView = (function(_super) {
      __extends(MapView, _super);

      function MapView() {
        return MapView.__super__.constructor.apply(this, arguments);
      }

      MapView.prototype.className = 'map';

      MapView.prototype.id = 'map-canvas';

      MapView.prototype.template = '';

      MapView.prototype.onShow = function() {
        var address, lat, lng, map, mapOptions, marker, zoom;
        this.className += " " + Marionette.getOption(this, 'className');
        lat = parseFloat(this.model.get('lat'));
        lng = parseFloat(this.model.get('lng'));
        zoom = parseInt(this.model.get('zoom'));
        address = this.model.get('address');
        mapOptions = {
          zoom: zoom,
          center: new google.maps.LatLng(lat, lng)
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        return marker = new google.maps.Marker({
          position: map.getCenter(),
          map: map,
          title: address
        });
      };

      return MapView;

    })(Marionette.ItemView);
  });
});
