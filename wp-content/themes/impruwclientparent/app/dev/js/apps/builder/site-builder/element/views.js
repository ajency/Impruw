var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

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
        this._isAddon();
        return this._noOptions();
      };

      ElementView.prototype._noOptions = function() {
        var nodelete, nomove, nosettings;
        if (ISTHEMEEDITOR === 'no') {
          nosettings = ['Logo', 'Text', 'Title', 'Gallery', 'ContactForm', 'RoomFacilities', 'RoomTitle', 'RoomDescription', 'RoomTariff', 'RoomBooking', 'Map'];
          if (nosettings.indexOf(this.model.get('element')) !== -1) {
            this.$el.children('.element-controls').children('.aj-imp-settings-btn').remove();
          }
          nodelete = ['Menu', 'LanguageSwitcher'];
          if (nodelete.indexOf(this.model.get('element')) !== -1) {
            this.$el.children('.element-controls').children('.aj-imp-delete-btn').remove();
          }
          nomove = ['Menu', 'LanguageSwitcher'];
          if (nomove.indexOf(this.model.get('element')) !== -1) {
            return this.$el.children('.element-controls').children('.aj-imp-drag-handle').addClass('non-visible');
          }
        }
      };

      ElementView.prototype.onBeforeRenderElement = function() {
        var field, _i, _len, _ref;
        _ref = ['meta_id', 'style', 'element', 'justified'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          field = _ref[_i];
          this.setHiddenField(field, this.model.get(field));
        }
        return this.setDraggable(this.model.get('draggable'));
      };

      ElementView.prototype._isAddon = function() {
        var addons, _ref;
        addons = _.pluck(_.where(ELEMENTS, {
          addOn: true
        }), 'element');
        if (_ref = this.model.get('element'), __indexOf.call(addons, _ref) >= 0) {
          this.$el.children('.element-controls').append('<div class="aj-imp-addon-btn"><span title="' + _.polyglot.t('Paid Add-on') + '" class="bicon icon-uniF155"></span></div>');
          return this.$el.children('.element-controls').children('.aj-imp-addon-btn').attr({
            'data-toggle': 'popover',
            'data-trigger': "focus",
            'role': "button",
            tabindex: "0",
            'data-placement': 'top',
            'data-template': '<div class="popover elem-box" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
            'data-content': _.polyglot.t('This is a paid addon. To check allowed addon go ') + '<a href="' + SITEURL + '/dashboard/#/billing/account-summary" target="BLANK">' + _.polyglot.t('here') + '</a>'
          }).popover({
            html: true
          });
        }
      };

      ElementView.prototype.addHiddenFields = function() {
        var field, _i, _len, _ref;
        _ref = ['draggable', 'style'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          field = _ref[_i];
          this.$el.children('form').append("<input type='hidden' name='" + field + "' value=''/>");
        }
        if (this.model.get('element') === 'Tabs') {
          return this.$el.children('form').append("<input type='hidden' name='justified' value=''/>");
        }
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

    })(Marionette.Layout);
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
