var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App, elementTpl) {
  return App.module('SiteBuilderApp.Element.Views', function(Views, App, Backbone, Marionette, $, _) {
    Views.ElementView = (function(_super) {
      __extends(ElementView, _super);

      function ElementView() {
        this.onShow = __bind(this.onShow, this);
        this.initialize = __bind(this.initialize, this);
        return ElementView.__super__.constructor.apply(this, arguments);
      }

      ElementView.prototype.template = '<form> <input type="hidden" name="meta_id"/> <input type="hidden" name="element"/> </form> <div class="element-controls"> <div class="aj-imp-drag-handle"> <p title="{{#polyglot}}Move{{/polyglot}}"><span class="bicon icon-uniF140"></span></p> </div> <div class="aj-imp-delete-btn"><span title="{{#polyglot}}Delete{{/polyglot}}">&times;</span></div> <div class="aj-imp-settings-btn"><span title="{{#polyglot}}Settings{{/polyglot}}" class="glyphicon glyphicon-cog"></span></div> </div> <div class="element-markup"><span></span></div>';

      ElementView.prototype.tagName = 'div';

      ElementView.prototype.regions = {
        elementRegion: '> .element-markup'
      };

      ElementView.prototype.className = 'element-wrapper';

      ElementView.prototype.events = {
        'click .aj-imp-settings-btn': function(evt) {
          evt.stopPropagation();
          return this.trigger("show:setting:popup", this.model);
        },
        'click .aj-imp-delete-btn': function(evt) {
          evt.stopPropagation();
          return this.trigger("delete:element", this.model);
        },
        'click': function(e) {
          if (this.model.get('element') !== 'Table') {
            e.stopPropagation();
          }
          return App.ElementsBoxApp.ElementsBoxEvtAggr.trigger('highlight:element', this.model.get('element'));
        }
      };

      ElementView.prototype.initialize = function() {
        this.once('before:render:element', (function(_this) {
          return function() {
            return _this.trigger("bind:element:events");
          };
        })(this));
        this.canEdit = true;
        this.listenTo(App.vent, 'page:took:over', (function(_this) {
          return function(errorMessage) {
            return _this.canEdit = false;
          };
        })(this));
        return this.listenTo(App.vent, 'page:released', (function(_this) {
          return function() {
            return _this.canEdit = true;
          };
        })(this));
      };

      ElementView.prototype.onRender = function() {
        return this.$el.find('.element-markup > span').spin(this._getOptions());
      };

      ElementView.prototype.onShow = function() {
        this.$el.mouseover((function(_this) {
          return function(evt) {
            evt.stopPropagation();
            if (window.dragging || !_this.canEdit) {
              return;
            }
            return _this.$el.addClass('hover-class');
          };
        })(this)).mouseout((function(_this) {
          return function() {
            return _this.$el.removeClass('hover-class');
          };
        })(this));
        return this._noOptions();
      };

      ElementView.prototype._noOptions = function() {
        var nosettings;
        if (ISTHEMEEDITOR === 'no') {
          nosettings = ['Logo', 'Text', 'Title', 'Gallery', 'ContactForm', 'RoomFacilities', 'RoomTitle', 'RoomDescription', 'RoomTariff', 'RoomBooking', 'Map'];
          if (nosettings.indexOf(this.model.get('element')) !== -1) {
            return this.$el.children('.element-controls').children('.aj-imp-settings-btn').remove();
          }
        }
      };

      ElementView.prototype.onBeforeRenderElement = function() {
        var field, _i, _len, _ref;
        _ref = ['meta_id', 'style', 'element'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          field = _ref[_i];
          this.setHiddenField(field, this.model.get(field));
        }
        return this.setDraggable(this.model.get('draggable'));
      };

      ElementView.prototype.addHiddenFields = function() {
        var field, _i, _len, _ref, _results;
        _ref = ['draggable', 'style'];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          field = _ref[_i];
          _results.push(this.$el.children('form').append("<input type='hidden' name='" + field + "' value=''/>"));
        }
        return _results;
      };

      ElementView.prototype.setDraggable = function(draggable) {
        if (draggable === false) {
          this.$el.find('.aj-imp-drag-handle').addClass('non-visible');
        } else if (draggable === true) {
          this.$el.find('.aj-imp-drag-handle').removeClass('non-visible');
        }
        return this.setHiddenField('draggable', draggable);
      };

      ElementView.prototype.setMargin = function(newMargin, prevMargin) {
        var element;
        if (prevMargin == null) {
          prevMargin = '';
        }
        element = this.elementRegion.currentView;
        element.$el.removeClass(prevMargin);
        return element.$el.addClass(newMargin);
      };

      ElementView.prototype.setStyle = function(newStyle, prevStyle) {
        var element;
        if (prevStyle == null) {
          prevStyle = '';
        }
        element = this.elementRegion.currentView;
        element.$el.removeClass(prevStyle);
        return element.$el.addClass(newStyle);
      };

      ElementView.prototype.setHiddenField = function(name, value) {
        if (this.$el.children('form').find("input[name='" + name + "']").length === 1) {
          return this.$el.children('form').find("input[name='" + name + "']").val(value);
        }
      };

      ElementView.prototype.onElementModelCreated = function() {
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
          color: '#ff9e2c',
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

    })(Marionette.LayoutView);
    return Views.ErrorView = (function(_super) {
      __extends(ErrorView, _super);

      function ErrorView() {
        return ErrorView.__super__.constructor.apply(this, arguments);
      }

      ErrorView.prototype.template = '<div class="load-error"> <span class="glyphicon glyphicon-warning-sign"></span> Component of type <em>{{element}}</em> did not load properly. </div>';

      return ErrorView;

    })(Marionette.ItemView);
  });
});
