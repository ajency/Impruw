// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['app', 'holder', 'tpl!apps/builder/site-builder/element/templates/element'], function(App, Holder, elementTpl) {
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
          'click .aj-imp-settings-btn': function(evt) {
            var x, y;
            if (this.model.get('elementType') === 'TextElement' || this.model.get('elementType') === 'TitleElement') {
              return;
            }
            evt.stopPropagation();
            x = screen.width / 2 - this.$el.width() / 2;
            y = screen.height / 2 - this.$el.height() / 2;
            return this.trigger("show:setting:popup", x, y);
          },
          'click .aj-imp-delete-btn': function(evt) {
            evt.stopPropagation();
            return this.trigger("delete:element", this.model);
          }
        };

        ElementView.prototype.modelEvents = {
          'change:markup': 'renderMarkup',
          'change:meta_id': 'setMetaId'
        };

        ElementView.prototype.onRender = function() {
          this.$el.attr("data-element", this.model.get('type'));
          this.$el.find('.element-markup > span').spin(this._getOptions());
          return this.setElementType();
        };

        ElementView.prototype.onElementViewFetched = function() {
          var mouseOverFn,
            _this = this;
          mouseOverFn = _.debounce(function(evt) {
            evt.stopPropagation();
            return _this.$el.addClass("hover-class");
          }, 100, true);
          this.$el.mouseover(mouseOverFn).mouseout(function(evt) {
            return _this.$el.removeClass("hover-class");
          });
          if (this.model.get('elementType') === 'BuilderRow') {
            return this.$el.find('.column').sortable({
              revert: 'invalid',
              items: '> .element-wrapper',
              connectWith: '.droppable-column,.column',
              handle: '.aj-imp-drag-handle',
              helper: 'clone',
              opacity: .65,
              update: function(evt, ui) {
                return _this.trigger("element:dropped", evt, ui);
              }
            });
          }
        };

        ElementView.prototype.setMetaId = function(model) {
          return this.$el.find('input[name="meta_id"]').val(model.get('meta_id'));
        };

        ElementView.prototype.setElementType = function() {
          return this.$el.find('input[name="element_type"]').val(this.model.get('elementType'));
        };

        ElementView.prototype.renderMarkup = function(model) {
          this.$el.find('.element-markup > span').spin(false);
          this.$el.find('.element-markup').html(model.get('markup'));
          this.setInilineEditing();
          this.setImagePlaceholders();
          return this.triggerMethod("element:view:fetched");
        };

        ElementView.prototype.setInilineEditing = function() {
          var editable;
          editable = this.$el.find('.element-markup').children().eq(0).attr('contenteditable');
          if (_.isUndefined(editable)) {
            return;
          }
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
