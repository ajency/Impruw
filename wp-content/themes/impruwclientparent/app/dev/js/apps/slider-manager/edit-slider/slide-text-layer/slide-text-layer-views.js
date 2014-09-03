var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SliderManager.SlideTextLayer.Views', function(Views, App) {
    var NoTextLayerView, TextLayerView;
    NoTextLayerView = (function(_super) {
      __extends(NoTextLayerView, _super);

      function NoTextLayerView() {
        return NoTextLayerView.__super__.constructor.apply(this, arguments);
      }

      NoTextLayerView.prototype.template = '<div>There are no layers for this slide. Click on the add button to add a Text Layer</div>';

      return NoTextLayerView;

    })(Marionette.ItemView);
    TextLayerView = (function(_super) {
      __extends(TextLayerView, _super);

      function TextLayerView() {
        return TextLayerView.__super__.constructor.apply(this, arguments);
      }

      TextLayerView.prototype.className = 'text-layer-view';

      TextLayerView.prototype.template = '<div class="edit-text-layer"><input type="text" value="{{text}}" /></div> <div class="view-text-layer">{{text}}</div><div class="pull-right"><button class="remove-layer"> remove </button></div>';

      TextLayerView.prototype.events = {
        'blur input': function(e) {
          this.model.set('text', $(e.target).val());
          return this.$el.closest('#text-layers').siblings('.slide-display').find("#" + this.textId).html($(e.target).val());
        },
        'click .view-text-layer': function() {
          this.$el.siblings().removeClass('text-layer-edit').addClass('text-layer-view');
          return this.$el.removeClass('text-layer-view').addClass('text-layer-edit');
        },
        'click .remove-layer': function() {
          return this.trigger('remove:text:layer');
        }
      };

      TextLayerView.prototype.onShow = function() {
        this.textId = _.uniqueId('text-');
        this.$el.closest('#text-layers').siblings('.slide-display').prepend("<div class='movable' id='" + this.textId + "' style='position : absolute; top : " + (this.model.get('top')) + "px; left:" + (this.model.get('left')) + "px; z-index:1000'>" + (this.model.get('text')) + "</div>");
        return this.$el.closest('#text-layers').siblings('.slide-display').find("#" + this.textId).draggable({
          stop: (function(_this) {
            return function(evt, ui) {
              _this.model.set('top', ui.position.top);
              return _this.model.set('left', ui.position.left);
            };
          })(this)
        });
      };

      TextLayerView.prototype.onClose = function() {
        return this.$el.closest('#text-layers').siblings('.slide-display').find("#" + this.textId).remove();
      };

      return TextLayerView;

    })(Marionette.ItemView);
    return Views.TextlayerListView = (function(_super) {
      __extends(TextlayerListView, _super);

      function TextlayerListView() {
        return TextlayerListView.__super__.constructor.apply(this, arguments);
      }

      TextlayerListView.prototype.template = '<div class="slide-display" style="text-align:center;"><img style=" height:100%; position : relative" src="{{full_url}}"></div> <div id="text-layers"></div> <button id="add-text-layer">Add Layer</button> <button id="save-layers"> Save Slide </button>';

      TextlayerListView.prototype.itemView = TextLayerView;

      TextlayerListView.prototype.emptyView = NoTextLayerView;

      TextlayerListView.prototype.itemViewContainer = '#text-layers';

      TextlayerListView.prototype.events = {
        'click #add-text-layer': '_addTextLayer',
        'click #save-layers': '_saveLayers'
      };

      TextlayerListView.prototype.initialize = function() {};

      TextlayerListView.prototype.onShow = function() {
        var height, ratio, width;
        ratio = App.currentImageRatio.split(':');
        width = this.$el.find('.slide-display').width();
        height = width * ratio[1] / ratio[0];
        this.$el.find('.slide-display').width(width);
        return this.$el.find('.slide-display').height(height);
      };

      TextlayerListView.prototype._addTextLayer = function() {
        return this.trigger('add:text:layer');
      };

      TextlayerListView.prototype._saveLayers = function() {
        return this.trigger('save:layers');
      };

      return TextlayerListView;

    })(Marionette.CompositeView);
  });
});
