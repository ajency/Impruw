var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.Map.Views', function(Views, App, Backbone, Marionette, $, _) {
    var callbacks;
    callbacks = null;
    window.initializeMap = function() {
      if (callbacks !== null) {
        callbacks.fire();
        return callbacks.remove(window['renderMap']);
      }
    };
    return Views.MapView = (function(_super) {
      __extends(MapView, _super);

      function MapView() {
        this.renderMap = __bind(this.renderMap, this);
        this.adjustMapHeight = __bind(this.adjustMapHeight, this);
        this.mapMoved = __bind(this.mapMoved, this);
        return MapView.__super__.constructor.apply(this, arguments);
      }

      MapView.prototype.className = 'map';

      MapView.prototype.id = 'map-canvas';

      MapView.prototype.template = '';

      MapView.prototype.onShow = function() {
        this.className += " " + Marionette.getOption(this, 'className');
        this.adjustMapHeight();
        this.$el.height('100%');
        this.$el.parent().resizable({
          handles: "s",
          stop: (function(_this) {
            return function(evt, ui) {
              _this.$el.parent().css('width', 'auto');
              return _this.trigger('set:image:height', {
                height: _this.$el.parent().height(),
                width: _this.$el.parent().width()
              });
            };
          })(this)
        });
        if (window.ADDRESS.trim() === '') {
          this.$el.html("<div class='empty-view no-click'><span class='bicon icon-uniF132'></span>Address not specified. Please<a href='" + SITEURL + "/dashboard/#site-profile'> click here to add.</a></div>");
        } else {
          this.geoCodeAddress();
        }
        this.parentColumns = this.$el.parents('.column');
        return this.parentColumns.each((function(_this) {
          return function(index, parentColumn) {
            $(parentColumn).on('class:changed', _this.adjustMapHeight);
            return $(parentColumn).on('element:moved', _this.mapMoved);
          };
        })(this));
      };

      MapView.prototype.mapMoved = function() {
        this.parentColumns.each((function(_this) {
          return function(index, parentColumn) {
            $(parentColumn).off('element:moved', _this.mapMoved);
            return $(parentColumn).off('class:changed', _this.adjustMapHeight);
          };
        })(this));
        this.parentColumns = this.$el.parents('.column');
        this.parentColumns.each((function(_this) {
          return function(index, parentColumn) {
            $(parentColumn).on('element:moved', _this.mapMoved);
            return $(parentColumn).on('class:changed', _this.adjustMapHeight);
          };
        })(this));
        return this.adjustMapHeight();
      };

      MapView.prototype.adjustMapHeight = function() {
        return this.$el.parent().height(parseFloat(this.model.get('heightRatio')) * this.$el.parent().width());
      };

      MapView.prototype.geoCodeAddress = function() {
        callbacks = $.Callbacks('once');
        window['renderMap'] = this.renderMap;
        callbacks.add(window['renderMap']);
        if (typeof google === 'undefined') {
          return $.getScript('https://maps.googleapis.com/maps/api/js?libraries=places&sensor=false&callback=initializeMap');
        } else {
          return this.renderMap();
        }
      };

      MapView.prototype.renderMap = function() {
        var address, map, newCenter, service;
        address = window.ADDRESS;
        map = new google.maps.Map(document.getElementById("map-canvas"), {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 17
        });
        if (window.HOTELPOSITION.position) {
          newCenter = new google.maps.LatLng(window.HOTELPOSITION.latitude, window.HOTELPOSITION.longitude);
          this.displayMap(map, newCenter, address);
          return;
        }
        service = new google.maps.places.PlacesService(map);
        return service.textSearch({
          query: address
        }, (function(_this) {
          return function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
              return _this.displayMap(map, results[0].geometry.location, address);
            } else {
              return _this.displayGeoCodeErrorMessage();
            }
          };
        })(this));
      };

      MapView.prototype.displayMap = function(map, location, address) {
        map.setCenter(location);
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
        return this.$el.html("<div class='empty-view no-click'><span class='bicon icon-uniF132'></span>" + _.polyglot.t('Failed to geocode your address. Please click') + ("<a href='" + SITEURL + "/dashboard/#/site-profile'> ") + _.polyglot.t('here to update.') + "</a></div>");
      };

      return MapView;

    })(Marionette.ItemView);
  });
});
