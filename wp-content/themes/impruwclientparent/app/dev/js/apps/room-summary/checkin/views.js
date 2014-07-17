var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/room-summary/checkin/templates/checkinView.html'], function(App, checkinformTpl) {
  return App.module('RoomSummaryApp.Checkin.View', function(View, App, Backbone, Marionette, $, _) {
    return View.CheckinForm = (function(_super) {
      __extends(CheckinForm, _super);

      function CheckinForm() {
        this.checkTimeFormatSelection = __bind(this.checkTimeFormatSelection, this);
        return CheckinForm.__super__.constructor.apply(this, arguments);
      }

      CheckinForm.prototype.tagName = 'form';

      CheckinForm.prototype.template = checkinformTpl;

      CheckinForm.prototype.className = 'form-horizontal clearfix';

      CheckinForm.prototype.onShow = function() {
        var radioHtml, timeFormat;
        timeFormat = this.model.get('checkin_time_format');
        radioHtml = this.$el.find('input:radio[name="checkin_time_format"]').filter("[value='" + timeFormat + "']");
        radioHtml.attr('checked', 'checked');
        radioHtml.parent().parent().find('.radio').addClass('checked');
        this.$el.find('.check-time').timepicker({
          'forceRoundTime': true,
          'step': 5
        });
        return this.$el.find('.radio').click((function(_this) {
          return function() {
            return _.delay(function() {
              return _this.checkTimeFormatSelection();
            }, 10);
          };
        })(this));
      };

      CheckinForm.prototype.checkTimeFormatSelection = function() {
        if (this.$el.find('#tweleve-hour').hasClass('checked')) {
          this.$el.find('.check-time').timepicker('remove');
          return this.$el.find('.check-time').timepicker({
            'timeFormat': 'g:ia',
            'forceRoundTime': true,
            'step': 5
          });
        } else {
          this.$el.find('.check-time').timepicker('remove');
          return this.$el.find('.check-time').timepicker({
            'timeFormat': 'H:i',
            'forceRoundTime': true,
            'step': 5
          });
        }
      };

      CheckinForm.prototype.events = {
        'click #save-checkin': function(e) {
          var formdata;
          e.preventDefault();
          formdata = Backbone.Syphon.serialize(this);
          if (this.$el.valid()) {
            return this.trigger("update:checkin:time:click", formdata);
          }
        }
      };

      CheckinForm.prototype.onCheckinTimeUpdated = function() {
        this.$el.find('.alert').remove();
        return this.$el.prepend('<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + _.polyglot.t('Check-in and Check-out time saved') + '</div>');
      };

      return CheckinForm;

    })(Marionette.ItemView);
  });
});
