var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/builder/site-builder/elements/address/views', 'apps/builder/site-builder/elements/address/settings/controller'], function(App) {
  return App.module('SiteBuilderApp.Element.Address', function(Address, App, Backbone, Marionette, $, _) {
    return Address.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.renderElement = __bind(this.renderElement, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        _.defaults(options.modelData, {
          element: 'Address',
          street: 'Street',
          city: 'City',
          postal_code: '4000212',
          country: 'Country',
          phone_no: '9999888877',
          email: 'demo@email.com',
          style: 'Default Style'
        });
        if (_.isObject(window.HOTELADDRESS)) {
          options.modelData.street = window.HOTELADDRESS.street;
          options.modelData.city = window.HOTELADDRESS.city;
          options.modelData.country = window.HOTELADDRESS.country;
          options.modelData.phone_no = window.HOTELADDRESS.other_phone_no[0];
          options.modelData.email = window.HOTELADDRESS.site_email;
        }
        if (window.ISDEMOTHEME === '1') {
          options.modelData.email = 'info@impruw.com';
        }
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype.bindEvents = function() {
        this.listenTo(this.layout.model, "change:style", this.renderElement);
        return Controller.__super__.bindEvents.call(this);
      };

      Controller.prototype._getAddressView = function(model, template) {
        return new Address.Views.AddressView({
          model: model,
          template: template
        });
      };

      Controller.prototype.renderElement = function() {
        var template, view;
        this.removeSpinner();
        template = this._getElementTemplate(this.layout.model);
        view = this._getAddressView(this.layout.model, template);
        return this.layout.elementRegion.show(view);
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
