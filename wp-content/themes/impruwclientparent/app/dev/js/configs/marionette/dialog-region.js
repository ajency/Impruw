// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['marionette'], function(Marionette) {
    var _ref;
    return Marionette.Region.Dialog = (function(_super) {
      __extends(Dialog, _super);

      function Dialog() {
        _ref = Dialog.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Dialog.prototype.onShow = function(view) {
        var options,
          _this = this;
        this.setupBindings(view);
        options = view.dialog ? view.dialog : {};
        _.defaults(options, {});
        this.$el.modal(options);
        this.$el.modal('show');
        return this.$el.on('hidden.bs.modal', function() {
          return _this.closeDialog();
        });
      };

      Dialog.prototype.setupBindings = function(view) {
        this.listenTo(view, 'dialog:close', this.closeDialog);
        return this.listenTo(view, 'dialog:resize', this.resizeDialog);
      };

      Dialog.prototype.closeDialog = function() {
        this.close();
        return this.$el.empty();
      };

      return Dialog;

    })(Marionette.Region);
  });

}).call(this);
