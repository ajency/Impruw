var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteProfileApp.Edit.View', function(View, App) {
    var callbacks;
    callbacks = null;
    window.initializeDragMap = function() {
      if (callbacks !== null) {
        callbacks.fire();
        return callbacks.remove(window['renderDragMap']);
      }
    };
    return View.MapView = (function(_super) {
      __extends(MapView, _super);

      function MapView() {
        this.renderMap = __bind(this.renderMap, this);
        return MapView.__super__.constructor.apply(this, arguments);
      }

      MapView.prototype.template = '<div class="row"> <div id="map-preview-top-info" class="col-sm-10"> <div class="default-position default-text hide"> <span>Position not accurate? Move the marker to set to accurate position</span> </div> <div class="default-position not-found-text hide"> <span>your address could not be found. Move the marker to your address</span> </div> <div class="custom-position hide"> <span>Now showing custom position. Click on default button to show default. </div> </div> <div class="buttons col-sm-2 "> <button class="custom-position hide btn btn-primary set-default-position" type="button">Show Default</button> </div> </div> <div id="map-canvas" class="col-sm-offset-1 col-sm-10"></div>';

      MapView.prototype.modelEvents = {
        'change:position': 'positionChange'
      };

      MapView.prototype.events = {
        'click .set-default-position': 'setDefaultPosition'
      };

      MapView.prototype.onShow = function() {
        return this.geoCodeAddress();
      };

      MapView.prototype.positionChange = function(model, position) {
        return this.$el.find('.custom-position, .default-position').addClass('hide');
      };

      MapView.prototype.geoCodeAddress = function() {
        callbacks = $.Callbacks('once');
        window['renderDragMap'] = this.renderMap;
        callbacks.add(window['renderDragMap']);
        if (typeof google === 'undefined') {
          return $.getScript('https://maps.googleapis.com/maps/api/js?libraries=places&sensor=false&callback=initializeDragMap');
        } else {
          return this.renderMap();
        }
      };

      MapView.prototype.onRefreshMap = function() {
        this.model.set({
          position: false,
          placeId: ''
        });
        this.trigger('save:coordinates');
        return this.renderMap();
      };

      MapView.prototype.renderMap = function() {
        var pos;
        this.$el.find('.custom-position, .default-position').addClass('hide');
        if (!this.map) {
          this.map = new google.maps.Map(document.getElementById("map-canvas"), {
            center: new google.maps.LatLng(59.913, 10.750),
            zoom: 17
          });
          this.marker = new google.maps.Marker({
            map: this.map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
          });
          google.maps.event.addListener(this.marker, 'dragend', this.onMarkerDrag.bind(this));
        }
        if (this.model.get('position')) {
          pos = new google.maps.LatLng(this.model.get('latitude'), this.model.get('longitude'));
          this.$el.find('.custom-position').removeClass('hide');
          return this.displayMap(pos, this.model.get('address'));
        } else if (_.trim(this.model.get('placeId')) !== '') {
          this.getPlacesDetails(this.model.get('placeId'), this.model.get('address'));
          return this.$el.find('.default-position').not('.not-found-text').removeClass('hide');
        } else {
          return this.getPositionFromAddress();
        }
      };

      MapView.prototype.getPositionFromAddress = function() {
        var address, service;
        address = this.model.get('address');
        service = new google.maps.places.PlacesService(this.map);
        return service.textSearch({
          query: address
        }, (function(_this) {
          return function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
              _this.model.set({
                placeId: results[0].place_id,
                position: false
              }, {
                silent: true
              });
              _this.trigger('save:coordinates');
              _this.getPlacesDetails(results[0].place_id, address);
              console.log('x');
              return _this.$el.find('.default-position').not('.not-found-text').removeClass('hide');
            } else {
              _this.displayMap(_this.map.getCenter(), address);
              console.log('y');
              return _this.$el.find('.default-position').not('.default-text').removeClass('hide');
            }
          };
        })(this));
      };

      MapView.prototype.getPlacesDetails = function(placeId, address) {
        var service;
        service = new google.maps.places.PlacesService(this.map);
        return service.getDetails({
          placeId: placeId
        }, (function(_this) {
          return function(place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              _this.displayMap(place.geometry.location, address);
              return console.log('z');
            } else {
              _this.displayMap(_this.map.getCenter(), address);
              console.log('A');
              return _this.$el.find('.default-position').not('.default-text').removeClass('hide');
            }
          };
        })(this));
      };

      MapView.prototype.displayMap = function(location, address) {
        if (address == null) {
          address = "";
        }
        this.map.setCenter(location);
        return this.createMarker(address);
      };

      MapView.prototype.createMarker = function(address) {
        this.marker.setPosition(this.map.getCenter());
        return this.createInfoWindow(address);
      };

      MapView.prototype.createInfoWindow = function(address) {
        if (this.infowindow) {
          this.infowindow.setContent(address);
        } else {
          this.infowindow = new google.maps.InfoWindow({
            content: address
          });
        }
        return google.maps.event.addListener(this.marker, 'click', (function(_this) {
          return function() {
            return _this.infowindow.open(_this.map, _this.marker);
          };
        })(this));
      };

      MapView.prototype.displayGeoCodeErrorMessage = function() {
        return this.$el.html("<div class='empty-view no-click'><span class='bicon icon-uniF132'></span>" + _.polyglot.t('Failed to geocode your address. Please click') + "</div>");
      };

      MapView.prototype.onMarkerDrag = function(data) {
        this.model.set('position', true);
        this.model.set('latitude', data.latLng.k);
        this.model.set('longitude', data.latLng.D);
        this.trigger('save:coordinates');
        return this.$el.find('.custom-position').removeClass('hide');
      };

      MapView.prototype.setDefaultPosition = function() {
        this.model.set('position', false);
        this.trigger('save:coordinates');
        return this.renderMap();
      };

      return MapView;

    })(Marionette.ItemView);
  });
});
