// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['app', 'text!apps/media-manager/edit-media/templates/form.html'], function(App, formTpl) {
    return App.module('MediaManager.EditMedia.Views', function(Views, App) {
      var _ref;
      return Views.EditMediaView = (function(_super) {
        __extends(EditMediaView, _super);

        function EditMediaView() {
          _ref = EditMediaView.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        EditMediaView.prototype.template = formTpl;

        return EditMediaView;

      })(Marionette.ItemView);
    });
  });

}).call(this);
