var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'text!apps/rooms/tariffs/edittariff/templates/edittariff.html'], function(App, AppController, editTariffTpl) {
  return App.module("RoomsApp.RoomsTariff.Show", function(Show, App) {
    var EditTariffController, EditTariffView;
    EditTariffController = (function(_super) {
      __extends(EditTariffController, _super);

      function EditTariffController() {
        return EditTariffController.__super__.constructor.apply(this, arguments);
      }

      EditTariffController.prototype.initialize = function(opt) {
        var tariff, tariffView;
        if (!opt.model) {
          tariff = App.request("get:tariff", opt.tariffId);
        } else {
          tariff = opt.model;
        }
        this.tariffView = tariffView = this._getEditTariffView(tariff);
        return this.show(tariffView, {
          loading: true
        });
      };

      EditTariffController.prototype._getEditTariffView = function(tariff) {
        return new EditTariffView({
          model: tariff
        });
      };

      return EditTariffController;

    })(AppController);
    EditTariffView = (function(_super) {
      __extends(EditTariffView, _super);

      function EditTariffView() {
        return EditTariffView.__super__.constructor.apply(this, arguments);
      }

      EditTariffView.prototype.tagName = 'form';

      EditTariffView.prototype.className = 'form-horizontal';

      EditTariffView.prototype.template = editTariffTpl;

      EditTariffView.prototype.dialogOptions = {
        modal_title: 'Edit Tariff',
        modal_size: 'medium-modal'
      };

      EditTariffView.prototype.events = {
        'click .update-tariff': function() {
          var data;
          if (this.$el.valid()) {
            data = Backbone.Syphon.serialize(this);
            console.log(data);
            return this.trigger("update:tariff:details", data);
          }
        }
      };

      EditTariffView.prototype.onShow = function() {
        return this.$el.find('input[type="checkbox"]').checkbox();
      };

      return EditTariffView;

    })(Marionette.ItemView);
    return App.commands.setHandler("show:edit:tariff", function(opt) {
      var opts;
      opts = {
        region: App.dialogRegion
      };
      if (opt.tariffModel) {
        opts.model = opt.tariffModel;
      } else {
        opts.tariffId = opt.tariffId;
      }
      return new EditTariffController(opts);
    });
  });
});
