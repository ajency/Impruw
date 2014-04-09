var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'text!apps/rooms/tariffs/daterange/templates/editDaterange.html'], function(App, AppController, editDateRangeTpl) {
  return App.module("RoomsApp.RoomsTariff.DateRange.Edit", function(Edit, App) {
    var EditDateRangeController, EditDateRangeView;
    EditDateRangeController = (function(_super) {
      __extends(EditDateRangeController, _super);

      function EditDateRangeController() {
        this.dateRangeSaved = __bind(this.dateRangeSaved, this);
        return EditDateRangeController.__super__.constructor.apply(this, arguments);
      }

      EditDateRangeController.prototype.initialize = function(opt) {
        var dateRangeView, model;
        model = opt.model;
        this.dateRangeView = dateRangeView = this._getEditDateRangeView(model);
        this.listenTo(dateRangeView, "add:daterange:details", (function(_this) {
          return function(data) {
            var dateRange;
            dateRange = App.request("create:new:daterange:model", data);
            return dateRange.save(null, {
              wait: true,
              success: _this.dateRangeSaved
            });
          };
        })(this));
        return this.show(dateRangeView, {
          loading: true
        });
      };

      EditDateRangeController.prototype.dateRangeSaved = function(dateRange) {
        App.execute("add:daterange", dateRange);
        return this.dateRangeView.triggerMethod("saved:daterange");
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
        modal_title: 'Add DateRange',
        modal_size: 'medium-modal'
      };

      EditDateRangeView.prototype.events = {
        'click #btn_savedaterange': function() {
          var data;
          if (this.$el.valid()) {
            data = Backbone.Syphon.serialize(this);
            return this.trigger("add:daterange:details", data);
          }
        }
      };

      EditDateRangeView.prototype.onSavedDaterange = function() {
        this.$el.parent().find('.alert').remove();
        this.$el.parent().prepend('<div class="alert alert-success">Saved successfully</div>');
        return this.$el.find('input').val('');
      };

      EditDateRangeView.prototype.onShow = function() {
        this.$el.find('input[type="checkbox"]').checkbox();
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
