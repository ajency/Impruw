// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['app', 'controllers/builder-base-controller', 'apps/builder/site-builder/element/views'], function(App, AppController) {
    App.module('SiteBuilderApp.Element', function(Element, App, Backbone, Marionette, $, _) {
      var _ref;
      return Element.Controller = (function(_super) {
        __extends(Controller, _super);

        function Controller() {
          _ref = Controller.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        Controller.prototype.initialize = function(opt) {
          var container, element, evt, options, type;
          if (opt == null) {
            opt = {};
          }
          evt = opt.evt, type = opt.type;
          container = $(evt.target);
          options = {
            elementType: type,
            draggable: true
          };
          element = App.request("create:new:element", options);
          this.view = this._getView(element, type);
          this.listenTo(this.view, "show:setting:popup", function() {
            return App.vent.trigger("show:settings:popup", this.element, x, y);
          });
          this.listenTo(element, "element:model:fetched", this.setupViews);
          return this.add(this.view, container);
        };

        Controller.prototype._getView = function(elementModel, element) {
          var ele;
          return ele = new Element.Views.ElementView({
            model: elementModel
          });
        };

        Controller.prototype.addElementMarkup = function(view) {
          this.view.$el.find('.element-markup').html(view.$el);
          view.render();
          return view.triggerMethod("show");
        };

        return Controller;

      })(AppController);
    });
    return App.SiteBuilderApp.Element.Controller;
  });

}).call(this);
