var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'text!apps/rooms/tariffs/addtariff/templates/addtariff.html'], function(App, AppController, addTariffTpl) {
  return App.module("RoomsApp.RoomsTariff.Add", function(Add, App) {
    var AddTariffController, AddTariffView;
    AddTariffController = (function(_super) {
      __extends(AddTariffController, _super);

      function AddTariffController() {
        this.tariffSaved = __bind(this.tariffSaved, this);
        return AddTariffController.__super__.constructor.apply(this, arguments);
      }

      AddTariffController.prototype.initialize = function(opt) {
        var currentCurrency, sitemodel, tariff, tariffView;
        if (!opt.model) {
          tariff = App.request("get:tariff", opt.tariffId);
        } else {
          tariff = opt.model;
        }
        sitemodel = App.request("get:site:model");
        currentCurrency = sitemodel.get('currency');
        this.tariffView = tariffView = this._getAddTariffView(tariff, currentCurrency);
        this.listenTo(tariffView, "add:tariff", (function(_this) {
          return function(data) {
            tariff.set(data);
            return tariff.save(null, {
              wait: true,
              success: _this.tariffSaved
            });
          };
        })(this));
        return this.show(tariffView, {
          loading: true
        });
      };

      AddTariffController.prototype.tariffSaved = function(tariffModel) {
        var tariffs;
        tariffs = App.request("get:current:tariffs:collection");
        tariffs.add(tariffModel);
        return this.tariffView.triggerMethod("saved:tariff");
      };

      AddTariffController.prototype._getAddTariffView = function(tariff, currentCurrency) {
        return new AddTariffView({
          currency: currentCurrency
        });
      };

      return AddTariffController;

    })(AppController);
    AddTariffView = (function(_super) {
      __extends(AddTariffView, _super);

      function AddTariffView() {
        return AddTariffView.__super__.constructor.apply(this, arguments);
      }

      AddTariffView.prototype.tagName = 'form';

      AddTariffView.prototype.className = 'form-horizontal';

      AddTariffView.prototype.template = addTariffTpl;

      AddTariffView.prototype.dialogOptions = {
        modal_title: _.polyglot.t('Add Tariff'),
        modal_size: 'medium-modal'
      };

      AddTariffView.prototype.events = {
        'click .update-tariff': function() {
          var data;
          if (this.$el.valid()) {
            data = Backbone.Syphon.serialize(this);
            return this.trigger("add:tariff", data);
          }
        }
      };

      AddTariffView.prototype.onSavedTariff = function() {
        this.$el.parent().find('.alert').remove();
        return this.$el.parent().prepend("<div class=\"alert alert-success\">" + _.polyglot.t("Tariff added succesfully for the plan") + "</div>");
      };

      AddTariffView.prototype.onShow = function() {
        this.$el.find('input[type="checkbox"]').checkbox();
        this.$el.find('.currency').text(Marionette.getOption(this, "currency"));
        return this.$el.validate();
      };

      return AddTariffView;

    })(Marionette.ItemView);
    return App.commands.setHandler("show:add:tariff", function(opt) {
      var opts;
      opts = {
        region: App.dialogRegion,
        model: opt.model
      };
      return new AddTariffController(opts);
    });
  });
});
