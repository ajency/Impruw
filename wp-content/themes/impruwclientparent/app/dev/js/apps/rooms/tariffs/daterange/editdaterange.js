var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'text!apps/rooms/tariffs/daterange/templates/editDaterange.html'], function(App, AppController, editDateRangeTpl) {
  return App.module("RoomsApp.RoomsTariff.DateRange.Edit", function(Edit, App) {
    var EditDateRangeController, EditDateRangeView;
    EditDateRangeController = (function(_super) {
      __extends(EditDateRangeController, _super);

      function EditDateRangeController() {
        this.dateRangeUpdated = __bind(this.dateRangeUpdated, this);
        this.daterangeDeleted = __bind(this.daterangeDeleted, this);
        return EditDateRangeController.__super__.constructor.apply(this, arguments);
      }

      EditDateRangeController.prototype.initialize = function(opt) {
        var dateRangeView, model;
        model = opt.model;
        this.dateRangeView = dateRangeView = this._getEditDateRangeView(model);
        this.listenTo(dateRangeView, "update:daterange:details", (function(_this) {
          return function(data) {
            model.save(data);
            return model.save(null, {
              wait: true,
              success: _this.dateRangeUpdated
            });
          };
        })(this));
        this.listenTo(dateRangeView, "delete:daterange", (function(_this) {
          return function(data) {
            return model.destroy({
              allData: false,
              wait: true,
              success: _this.daterangeDeleted
            });
          };
        })(this));
        return this.show(dateRangeView, {
          loading: true
        });
      };

      EditDateRangeController.prototype.daterangeDeleted = function() {
        return this.dateRangeView.triggerMethod("deleted:daterange");
      };

      EditDateRangeController.prototype.dateRangeUpdated = function(dateRange) {
        return this.dateRangeView.triggerMethod("updated:daterange");
      };

      EditDateRangeController.prototype._getEditDateRangeView = function(dateRange) {
        return new EditDateRangeView({
          model: dateRange
        });
      };

      return EditDateRangeController;

    })(AppController);
    EditDateRangeView = (function(_super) {
      __extends(EditDateRangeView, _super);

      function EditDateRangeView() {
        return EditDateRangeView.__super__.constructor.apply(this, arguments);
      }

      EditDateRangeView.prototype.tagName = 'form';

      EditDateRangeView.prototype.className = 'form-horizontal';

      EditDateRangeView.prototype.template = editDateRangeTpl;

      EditDateRangeView.prototype.dialogOptions = {
        modal_title: 'Edit DateRange',
        modal_size: 'medium-modal'
      };

      EditDateRangeView.prototype.events = {
        'click #btn_updatedaterange': function() {
          var data;
          if (this.$el.valid()) {
            data = Backbone.Syphon.serialize(this);
            return this.trigger("update:daterange:details", data);
          }
        },
        'click #btn_deletedaterange': function(e) {
          if (confirm('Delete the Date range?')) {
            e.preventDefault();
            return this.trigger("delete:daterange", this.model);
          }
        }
      };

      EditDateRangeView.prototype.serializeData = function() {
        var data;
        data = EditDateRangeView.__super__.serializeData.call(this);
        data.from_date = moment(data.from_date).format("YYYY-MM-DD");
        data.to_date = moment(data.to_date).format("YYYY-MM-DD");
        return data;
      };

      EditDateRangeView.prototype.onUpdatedDaterange = function() {
        this.$el.parent().find('.alert').remove();
        return this.$el.parent().prepend('<div class="alert alert-success">Updated successfully</div>');
      };

      EditDateRangeView.prototype.onDeletedDaterange = function() {
        return this.trigger("dialog:close");
      };

      EditDateRangeView.prototype.onShow = function() {
        this.$el.find('input[type="checkbox"]').checkbox();
        this.$el.find('#daterange_color').minicolors();
        return this.$el.find('.dated').datepicker({
          showOtherMonths: true,
          selectOtherMonths: true,
          dateFormat: "yy-mm-dd"
        }).prev('.btn').on('click', (function(_this) {
          return function(e) {
            e && e.preventDefault();
            return $(datepickerSelector).focus();
          };
        })(this));
      };

      return EditDateRangeView;

    })(Marionette.ItemView);
    return App.commands.setHandler("show:edit:daterange", function(opts) {
      opts = {
        region: App.dialogRegion,
        model: opts.model
      };
      return new EditDateRangeController(opts);
    });
  });
});
