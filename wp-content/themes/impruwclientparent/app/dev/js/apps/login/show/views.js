var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'tpl!apps/login/show/templates/login'], function(App, loginTpl) {
  return App.module('LoginApp.Show.View', function(View, App) {
    return View.LoginView = (function(_super) {
      __extends(LoginView, _super);

      function LoginView() {
        return LoginView.__super__.constructor.apply(this, arguments);
      }

      LoginView.prototype.className = 'modal-dialog';

      LoginView.prototype.template = loginTpl;

      LoginView.prototype.dialog = {
        backdrop: 'static',
        keyboard: false
      };

      return LoginView;

    })(Marionette.ItemView);
  });
});
