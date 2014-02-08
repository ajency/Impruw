// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['app', 'controllers/builder-base-controller', 'apps/builder/site-builder/new/views'], function(App, AppController) {
    App.module('SiteBuilderApp.NewElement', function(NewElement, App, Backbone, Marionette, $, _) {
      var _ref;
      return NewElement.Controller = (function(_super) {
        __extends(Controller, _super);

        function Controller() {
          _ref = Controller.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        Controller.prototype.initialize = function(opt) {
          var element, evt, options, sectionID, type, ui, view;
          if (opt == null) {
            opt = {};
          }
          evt = opt.evt, ui = opt.ui;
          sectionID = $(evt.target).attr('id');
          type = ui.item.attr('data-element');
          options = {
            type: type,
            position: sectionID,
            draggable: true,
            parent: 0
          };
          element = App.request("create:new:element", options);
          view = this._getView(element);
          return this.add(view, $("#" + sectionID));
        };

        Controller.prototype._getView = function(element) {
          return new NewElement.Views.ElementView({
            model: element
          });
        };

        return Controller;

      })(AppController);
    });
    return App.SiteBuilderApp.NewElement.Controller;
  });

}).call(this);
