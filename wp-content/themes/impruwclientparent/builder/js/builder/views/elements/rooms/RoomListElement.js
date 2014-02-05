// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['builderelement', 'tpl!builder/templates/elements/BasicElement.tpl', 'global'], function(BuilderElement, template, global) {
    var RoomElement, _ref;
    return RoomElement = (function(_super) {
      __extends(RoomElement, _super);

      function RoomElement() {
        _ref = RoomElement.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      RoomElement.prototype.className = 'aj-imp-elem-room element ';

      RoomElement.prototype.template = template;

      RoomElement.prototype.elementType = 'RoomListElement';

      RoomElement.prototype.dataSource = 0;

      RoomElement.prototype.events = {
        'mouseenter': 'elementMouseEnter',
        'mouseleave': 'elementMouseLeave',
        'click > .aj-imp-delete-btn': 'destroyElement',
        'contextmenu': 'showContextMenu',
        'click a': 'void',
        'click': 'showChooseRoomModal'
      };

      RoomElement.prototype.initialize = function(options) {
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
          icon: '',
          name: 'Room Element'
        });
        this.setContextMenu();
      };

      RoomElement.prototype.hasExtraSettings = function() {
        var html;
        if (_.isEmpty(ROOMS)) {
          return '';
        }
        html = "<div class='form-group'><select name='for-room'>";
        html += "<option value='0'>Select</option>";
        _.each(ROOMS, function(room, index) {
          html += "<option value=" + room.id + ">" + room.name + "</option>";
        });
        return html += '</select></div>';
      };

      RoomElement.prototype.updateExtraProperties = function(evt) {
        var pcontent;
        if (evt == null) {
          evt = {};
        }
        pcontent = $(evt.target).closest('.popover');
        return this.dataSource = parseInt($(pcontent).find('select[name="for-room"]').val());
      };

      RoomElement.prototype.showChooseRoomModal = function() {
        return require(['underscore', 'chooseroom'], _.bind(function(_, ChooseRoom) {
          var chooseroom;
          chooseroom = getAppInstance().ViewManager.findByCustom("choose-room");
          if (_.isUndefined(chooseroom)) {
            chooseroom = new ChooseRoom();
            getAppInstance().ViewManager.add(chooseroom, "choose-room");
          }
          this.listenTo(getAppInstance().vent, 'room-selected', this.updateSelf);
          return chooseroom.open();
        }, this));
      };

      RoomElement.prototype.updateSelf = function(room) {
        var json, param, responseFn,
          _this = this;
        this.stopListening(getAppInstance().vent, 'room-selected', this.updateSelf);
        this.dataSource = room.get('ID');
        json = this.generateJSON();
        responseFn = function(resp) {
          return _this.$el.find('.content').html(resp.html);
        };
        param = {
          action: 'get-element-markup',
          json: json
        };
        return $.get(AJAXURL, param, responseFn, 'json');
      };

      return RoomElement;

    })(BuilderElement);
  });

}).call(this);
