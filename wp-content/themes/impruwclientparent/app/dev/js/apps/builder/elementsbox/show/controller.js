var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/builder/elementsbox/show/views'], function(App, AppController) {
  return App.module('ElementsBoxApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    Show.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opt) {
        var view;
        if (opt == null) {
          opt = {};
        }
        this.elements = App.request("get:elementbox:elements");
        view = this.getView(this.elements);
        this.listenTo(App.vent, "change:page:check:single:room", (function(_this) {
          return function() {
            return view.triggerMethod('room:elements:visibility', _this.isSingleRoomPage());
          };
        })(this));
        this.listenTo(App.vent, 'page:took:over', function() {
          return view.triggerMethod('page:took:over');
        });
        this.listenTo(App.vent, 'page:released', function() {
          return view.triggerMethod('page:released');
        });
        return this.show(view, {
          loading: true
        });
      };

      Controller.prototype.isSingleRoomPage = function() {
        var pageName;
        pageName = App.request("get:current:editable:page:name");
        return pageName === SINGLE_ROOM_PAGE;
      };

      Controller.prototype.getView = function(elements) {
        this.singleroom = this.isSingleRoomPage();
        return new Show.Views.MainView({
          collection: elements,
          singleroom: this.singleroom
        });
      };

      return Controller;

    })(AppController);
    return Show.ErrorController = (function(_super) {
      __extends(ErrorController, _super);

      function ErrorController() {
        return ErrorController.__super__.constructor.apply(this, arguments);
      }

      ErrorController.prototype.initialize = function(opt) {
        var view;
        if (opt == null) {
          opt = {};
        }
        view = new Show.Views.ErrorView;
        return this.show(view);
      };

      return ErrorController;

    })(AppController);
  });
});
