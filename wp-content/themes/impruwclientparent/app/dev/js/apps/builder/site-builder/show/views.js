// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['app', 'text!apps/builder/site-builder/show/templates/maintemplate.html'], function(App, mainviewTpl) {
    App.module('SiteBuilderApp.Show.View', function(View, App, Backbone, Marionette, $, _) {
      var _ref;
      return View.MainView = (function(_super) {
        __extends(MainView, _super);

        function MainView() {
          _ref = MainView.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        MainView.prototype.template = mainviewTpl;

        MainView.prototype.className = 'aj-imp-builder-area';

        MainView.prototype.events = {
          'click .auto-save': function(evt) {
            evt.preventDefault();
            return App.commands.execute("auto:save");
          }
        };

        MainView.prototype.onShow = function() {
          var _this = this;
          return this.$el.find('.droppable-column').sortable({
            revert: 'invalid',
            items: '> .element-wrapper',
            connectWith: '.droppable-column,.column',
            start: function(e, ui) {
              return ui.placeholder.height(ui.item.height());
            },
            helper: 'clone',
            opacity: .65,
            receive: function(evt, ui) {
              if (ui.item.prop("tagName") === 'LI') {
                return _this.trigger("element:dropped", $(evt.target), ui);
              }
            }
          });
        };

        return MainView;

      })(Marionette.CompositeView);
    });
    return App.SiteBuilderApp.Show.View;
  });

}).call(this);
