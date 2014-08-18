var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'text!apps/billing/update-billing/templates/addressView.html'], function(App, AppController, viewTpl) {
  return App.module('BillingApp.BillingAddress', function(BillingAddress, App, Backbone, Marionette, $, _) {
    var BillingAddressView;
    BillingAddress.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.addressUpdated = __bind(this.addressUpdated, this);
        this.addressAdded = __bind(this.addressAdded, this);
        this.updateAddress = __bind(this.updateAddress, this);
        this.addAddress = __bind(this.addAddress, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var brainTreeCustomerId;
        brainTreeCustomerId = opts.customerId;
        this.billingAddressModel = App.request("get:billing:address", brainTreeCustomerId);
        this.view = this.getAddressView(this.billingAddressModel);
        this.listenTo(this.view, "add:address", this.addAddress);
        this.listenTo(this.view, "update:address", this.updateAddress);
        return this.show(this.view, {
          loading: true
        });
      };

      Controller.prototype.getAddressView = function(billingAddressModel) {
        return new BillingAddressView({
          model: billingAddressModel
        });
      };

      Controller.prototype.addAddress = function(addressData) {
        this.billingAddressModel.set(addressData);
        return this.billingAddressModel.save(null, {
          wait: true,
          success: this.addressAdded
        });
      };

      Controller.prototype.updateAddress = function(addressData) {
        this.billingAddressModel.set(addressData);
        return this.billingAddressModel.save(null, {
          wait: true,
          success: this.addressUpdated
        });
      };

      Controller.prototype.addressAdded = function(addressModel, response) {
        if (response.code === "OK") {
          return this.view.triggerMethod("address:added");
        } else {
          return this.view.triggerMethod("address:not:added", response.msg);
        }
      };

      Controller.prototype.addressUpdated = function(addressModel, response) {
        if (response.code === "OK") {
          return this.view.triggerMethod("address:updated");
        } else {
          return this.view.triggerMethod("address:not:updated", response.msg);
        }
      };

      return Controller;

    })(AppController);
    BillingAddressView = (function(_super) {
      __extends(BillingAddressView, _super);

      function BillingAddressView() {
        return BillingAddressView.__super__.constructor.apply(this, arguments);
      }

      BillingAddressView.prototype.template = viewTpl;

      BillingAddressView.prototype.onShow = function() {
        var addressExists;
        addressExists = this.model.get('address_exists');
        if (addressExists === false) {
          this.$el.find('.btn-add').show();
          this.$el.find('.btn-update').hide();
        } else {
          this.$el.find('.btn-add').hide();
          this.$el.find('.btn-update').show();
        }
        return this.$el.find('select').selectpicker();
      };

      BillingAddressView.prototype.events = {
        'click .btn-add': function(e) {
          var addressData;
          e.preventDefault();
          this.$el.find('#pay_loader').show();
          addressData = Backbone.Syphon.serialize(this);
          return this.trigger("add:address", addressData);
        },
        'click .btn-update': function(e) {
          var addressUpdateData;
          e.preventDefault();
          this.$el.find('#pay_loader').show();
          addressUpdateData = Backbone.Syphon.serialize(this);
          return this.trigger("update:address", addressUpdateData);
        }
      };

      BillingAddressView.prototype.onAddresssAdded = function() {
        this.$el.find('#msg').empty();
        this.$el.find('#display-msg').show();
        this.$el.find('#pay_loader').hide();
        this.$el.find('#msg').text(_.polyglot.t('Address added successfully'));
        this.$el.find('.btn-add').hide();
        return this.$el.find('.btn-update').show();
      };

      BillingAddressView.prototype.onAddresssUpdated = function() {
        this.$el.find('#msg').empty();
        this.$el.find('#display-msg').show();
        this.$el.find('#pay_loader').hide();
        this.$el.find('#msg').text(_.polyglot.t('Address updated successfully'));
        this.$el.find('.btn-add').hide();
        return this.$el.find('.btn-update').show();
      };

      BillingAddressView.prototype.onAddresssNotAdded = function(errorMsg) {
        this.$el.find('#msg').empty();
        this.$el.find('#display-msg').show();
        this.$el.find('#pay_loader').hide();
        return this.$el.find('#msg').text(errorMsg);
      };

      BillingAddressView.prototype.onAddresssNotUpdated = function(errorMsg) {
        this.$el.find('#msg').empty();
        this.$el.find('#display-msg').show();
        this.$el.find('#pay_loader').hide();
        return this.$el.find('#msg').text(errorMsg);
      };

      BillingAddressView.prototype.serializeData = function() {
        var data;
        data = BillingAddressView.__super__.serializeData.call(this);
        data.THEMEURL = THEMEURL;
        return data;
      };

      return BillingAddressView;

    })(Marionette.ItemView);
    return App.commands.setHandler("show:address", function(opts) {
      return new BillingAddress.Controller(opts);
    });
  });
});
