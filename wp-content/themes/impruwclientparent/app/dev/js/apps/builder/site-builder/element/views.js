// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['app', 'holder', 'text!apps/builder/site-builder/element/templates/element.html'], function(App, Holder, elementTpl) {
    App.module('SiteBuilderApp.Element.Views', function(Views, App, Backbone, Marionette, $, _) {
      var _ref;
      return Views.ElementView = (function(_super) {
        __extends(ElementView, _super);

        function ElementView() {
          _ref = ElementView.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        ElementView.prototype.template = elementTpl;

        ElementView.prototype.tagName = 'div';

        ElementView.prototype.className = 'element-wrapper';

        ElementView.prototype.events = {
          'click': function(evt) {
            var x, y;
            evt.stopPropagation();
            x = screen.width / 2 - this.$el.width() / 2;
            y = screen.height / 2 - this.$el.height() / 2;
            return this.trigger("show:setting:popup", this.model, x, y);
          },
          'click .aj-imp-delete-btn': function(evt) {
            evt.stopPropagation();
            return this.trigger("delete:element", this.model);
          }
        };

        ElementView.prototype.modelEvents = {
          'change:templates': 'renderMarkup',
          'change:meta_id': 'setMetaId'
        };

        ElementView.prototype.onRender = function() {
          this.$el.find('.element-markup > span').spin(this._getOptions());
          return this.setElementType();
        };

        ElementView.prototype.setMetaId = function(model) {
          return this.$el.find('input[name="meta_id"]').val(model.get('meta_id'));
        };

        ElementView.prototype.setElementType = function() {
          return this.$el.find('input[name="element_type"]').val(this.model.get('element'));
        };

        ElementView.prototype.renderMarkup = function(model) {
          return this.$el.find('.element-markup > span').spin(false);
        };

        ElementView.prototype._getOptions = function() {
          return {
            lines: 10,
            length: 6,
            width: 2.5,
            radius: 7,
            corners: 1,
            rotate: 9,
            direction: 1,
            color: '#000',
            speed: 1,
            trail: 60,
            shadow: false,
            hwaccel: true,
            className: 'spinner',
            zIndex: 2e9,
            top: '0px',
            left: '40px'
          };
        };

        return ElementView;

      })(Marionette.ItemView);
    });
    return App.SiteBuilderApp.Element.Views;
  });

}).call(this);
