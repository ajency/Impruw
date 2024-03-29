var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette'], function(Marionette) {
  return Marionette.Region.Settings = (function(_super) {
    __extends(Settings, _super);

    function Settings() {
      return Settings.__super__.constructor.apply(this, arguments);
    }

    Settings.prototype.onShow = function(view) {
      this.$el.draggable({
        handle: ".settings-header",
        addClasses: false
      });
      this.$el.center(false);
      if (ISTHEMEEDITOR === 'no') {
        return view.$el.find('form .form-group').not('.edit-by-user').hide();
      }
    };

    Settings.prototype.onClose = function() {
      return this.$el.draggable('destroy');
    };

    return Settings;

  })(Marionette.Region);
});
