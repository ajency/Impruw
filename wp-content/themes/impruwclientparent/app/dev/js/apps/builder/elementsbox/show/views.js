// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['app', 'tpl!apps/builder/elementsbox/show/templates/main', 'tpl!apps/builder/elementsbox/show/templates/singleelement'], function(App, mainviewTpl, singleEleTpl) {
    App.module('ElementsBoxApp.Show.Views', function(Views, App, Backbone, Marionette, $, _) {
      var _ref, _ref1;
      Views.MainView = (function(_super) {
        __extends(MainView, _super);

        function MainView() {
          _ref = MainView.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        MainView.prototype.template = mainviewTpl;

        MainView.prototype.className = 'aj-imp-drag-menu';

        MainView.prototype.id = 'controls-drag';

        return MainView;

      })(Marionette.CompositeView);
      return Views.SingleElement = (function(_super) {
        __extends(SingleElement, _super);

        function SingleElement() {
          _ref1 = SingleElement.__super__.constructor.apply(this, arguments);
          return _ref1;
        }

        SingleElement.prototype.template = singleEleTpl;

        return SingleElement;

      })(Marionette.ItemView);
    });
    return App.ElementsBoxApp.Show.Views;
  });

}).call(this);
