// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['builderelement', 'tpl!builder/templates/elements/BasicElement.tpl', 'global'], function(BuilderElement, template, global) {
    var RoomCarousel, _ref;
    return RoomCarousel = (function(_super) {
      __extends(RoomCarousel, _super);

      function RoomCarousel() {
        _ref = RoomCarousel.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      RoomCarousel.prototype.className = 'aj-imp-elem-room-carousel element';

      RoomCarousel.prototype.template = template;

      RoomCarousel.prototype.elementType = 'RoomCarousel';

      RoomCarousel.prototype.events = {
        'mouseenter': 'elementMouseEnter',
        'mouseleave': 'elementMouseLeave',
        'click > .aj-imp-delete-btn': 'destroyElement',
        'contextmenu': 'showContextMenu',
        'click a': 'void'
      };

      RoomCarousel.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        if (_.isUndefined(options.config)) {
          this.id = this.type() + '-' + global.generateRandomId();
          this.$el.attr('id', this.id);
        } else {
          this.setProperties(options.config);
        }
        this.generateMarkup({
          icon: 'uniF11C',
          name: 'Room Carousel'
        });
        this.setContextMenu();
      };

      return RoomCarousel;

    })(BuilderElement);
  });

}).call(this);