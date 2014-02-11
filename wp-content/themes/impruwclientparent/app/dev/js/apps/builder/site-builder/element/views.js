// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['app', 'ckeditor', 'holder', 'tpl!apps/builder/site-builder/element/templates/element'], function(App, CKEDITOR, Holder, elementTpl) {
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
          'click': function() {
            return this.trigger("show:setting:popup");
          }
        };

        ElementView.prototype.modelEvents = {
          'change:markup': 'renderMarkup'
        };

        ElementView.prototype.onRender = function() {
          this.$el.attr("data-element", this.model.get('type'));
          return this.$el.find('.element-markup span').spin(this._getOptions());
        };

        ElementView.prototype.renderMarkup = function(model) {
          this.$el.find('.element-markup span').spin(false);
          this.$el.find('.element-markup').html(model.get('markup'));
          this.setInilineEditing();
          return this.setImagePlaceholders();
        };

        ElementView.prototype.setInilineEditing = function() {
          var editable;
          editable = this.$el.find('.element-markup').children().eq(0).attr('contenteditable');
          if (_.isUndefined(editable)) {
            return;
          }
          _.each(CKEDITOR.instances, function(instance, key) {
            return delete CKEDITOR.instances[key];
          });
          return CKEDITOR.inlineAll();
        };

        ElementView.prototype.setImagePlaceholders = function() {
          var imageElements;
          imageElements = this.$el.find('*[data-src]');
          if (_.size(imageElements) > 0) {
            Holder.run();
            return $(imageElements).removeAttr('data-src');
          }
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
