var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'text!apps/rooms/tariffs/edittariff/templates/edittariff.html'], function(App, AppController, editTariffTpl) {
  return App.module("RoomsApp.RoomsTariff.Edit", function(Edit, App) {
    var EditTariffController, EditTariffView;
    EditTariffController = (function(_super) {
      __extends(EditTariffController, _super);

      function EditTariffController() {
        this.tariffDeleted = __bind(this.tariffDeleted, this);
        this.tariffSaved = __bind(this.tariffSaved, this);
        return EditTariffController.__super__.constructor.apply(this, arguments);
      }

      EditTariffController.prototype.initialize = function(opt) {
        var sitemodel, tariff;
        if (!opt.model) {
          tariff = App.request("get:tariff", opt.tariffId);
        } else {
          tariff = opt.model;
        }
        sitemodel = App.request("get:site:model");
        return App.execute("when:fetched", sitemodel, (function(_this) {
          return function() {
            var currentCurrency, tariffView;
            currentCurrency = sitemodel.get('currency');
            _this.tariffView = tariffView = _this._getEditTariffView(tariff, currentCurrency);
            _this.listenTo(tariffView, "update:tariff:details", function(data) {
              tariff.set(data);
              return tariff.save(null, {
                wait: true,
                success: _this.tariffSaved
              });
            });
            _this.listenTo(tariffView, "delete:tariff", function(model) {
              return model.destroy({
                allData: false,
                wait: true,
                success: _this.tariffDeleted
              });
            });
            return _this.show(tariffView, {
              loading: true
            });
          };
        })(this));
      };

      EditTariffController.prototype.tariffSaved = function(model) {
        return this.tariffView.triggerMethod("saved:tariff");
      };

      EditTariffController.prototype.tariffDeleted = function() {
        return this.tariffView.triggerMethod("deleted:tariff");
      };

      EditTariffController.prototype._getEditTariffView = function(tariff, currentCurrency) {
        return new EditTariffView({
          model: tariff,
          currency: currentCurrency
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

      EditTariffView.prototype.mixinTemplateHelpers = function(data) {
        data = EditTariffView.__super__.mixinTemplateHelpers.call(this, data);
        data.currency = Marionette.getOption(this, "currency");
        return data;
      };

      EditTariffView.prototype.dialogOptions = {
        modal_title: _.polyglot.t('Edit Tariff'),
        modal_size: 'medium-modal'
      };

      EditTariffView.prototype.events = {
        'click .update-tariff': function() {
          var data;
          if (this.$el.valid()) {
            data = Backbone.Syphon.serialize(this);
            return this.trigger("update:tariff:details", data);
          }
        },
        'click .delete-tariff-btn': function(e) {
          e.preventDefault();
          if (confirm(_.polyglot.t('Confirm tarrif delete'))) {
            return this.trigger("delete:tariff", this.model);
          }
        }
      };

      EditTariffView.prototype.initialize = function() {
        var weekday, weekend;
        weekday = this.model.get('weekday');
        if (weekday.enable == null) {
          weekday.enable = true;
          this.model.set('weekday', weekday);
        }
        weekend = this.model.get('weekend');
        if (weekend.enable == null) {
          weekend.enable = true;
          return this.model.set('weekend', weekend);
        }
      };

      EditTariffView.prototype.onSavedTariff = function() {
        this.$el.find('.alert').remove();
        return this.$el.parent().prepend("<div class=\"alert alert-success\">" + _.polyglot.t("Tariff updated successfully") + "</div>");
      };

      EditTariffView.prototype.onDeletedTariff = function() {
        return this.trigger("dialog:close");
      };

      EditTariffView.prototype.onShow = function() {
        var weekday, weekend;
        this.$el.find('input[type="checkbox"]').radiocheck();
        weekday = this.model.get('weekday');
        if (weekday.enable == null) {
          weekday.enable = true;
          this.model.set('weekday', weekday);
        }
        if (_.toBoolean(weekday.enable)) {
          this.$el.find('input[type="checkbox"][name="weekday[enable]"]').radiocheck('check');
        }
        weekend = this.model.get('weekend');
        if (weekend.enable == null) {
          weekend.enable = true;
          this.model.set('weekend', weekend);
        }
        if (_.toBoolean(weekend.enable)) {
          this.$el.find('input[type="checkbox"][name="weekend[enable]"]').radiocheck('check');
        }
        return this.$el.validate();
      };

      return EditTariffView;

    })(Marionette.ItemView);
    return App.commands.setHandler("show:edit:tariff", function(opt) {
      var opts;
      opts = {
        region: App.dialogRegion,
        model: opt.model
      };
      return new EditTariffController(opts);
    });
  });
});
