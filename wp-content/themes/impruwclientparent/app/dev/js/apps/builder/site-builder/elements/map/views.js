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
        this.className += " " + Marionette.getOption(this, 'className');
        if (window.ADDRESS.trim() === '') {
          return this.$el.html("<h5>Address not specified. Please click <a href='" + SITEURL + "/dashboard/#site-profile'> here </a></h5>");
        } else {
          return this.geoCodeAddress();
        }
      };

      MapView.prototype.geoCodeAddress = function() {
        var address, geocoder;
        address = window.ADDRESS;
        geocoder = new google.maps.Geocoder();
        return geocoder.geocode({
          address: address
        }, (function(_this) {
          return function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              return _this.displayMap(results[0].geometry.location, address);
            } else {
              return _this.displayGeoCodeErrorMessage();
            }
          };
        })(this));
      };

      MapView.prototype.displayMap = function(location, address) {
        var map;
        map = new google.maps.Map(document.getElementById("map-canvas"), {
          center: location,
          zoom: 14
        });
        return this.createMarker(map, address);
      };

      MapView.prototype.createMarker = function(map, address) {
        var marker;
        marker = new google.maps.Marker({
          map: map,
          position: map.getCenter()
        });
        return this.createInfoWindow(map, marker, address);
      };

      MapView.prototype.createInfoWindow = function(map, marker, address) {
        var infowindow;
        infowindow = new google.maps.InfoWindow({
          content: address
        });
        return google.maps.event.addListener(marker, 'click', function() {
          return infowindow.open(map, marker);
        });
      };

      MapView.prototype.displayGeoCodeErrorMessage = function() {
        return this.$el.html("<h4>Failed to geocode your address. Please click <a href='" + SITEURL + "/dashboard/#site-profile'> here to update</a></h4>");
      };

      return MapView;

    })(Marionette.ItemView);
  });
});
