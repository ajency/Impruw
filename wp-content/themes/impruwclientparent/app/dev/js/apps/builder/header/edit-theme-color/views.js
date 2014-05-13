var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('ChangeThemeColorApp.Views', function(Views, App, Backbone, Marionette, $, _) {
    var EmptyView, SingleSetView;
    SingleSetView = (function(_super) {
      __extends(SingleSetView, _super);

      function SingleSetView() {
        return SingleSetView.__super__.constructor.apply(this, arguments);
      }

      SingleSetView.prototype.tagName = 'li';

      SingleSetView.prototype.template = '	<div class="thumbnail flipthis" > <div class="indicator"><span class="glyphicon glyphicon-ok"></span></div> <div class="colors"></div> <div class="caption"> <h3>{{name}}</h3> <p> <a href="#" class="btn btn-xs btn-primary apply-theme-color" role="button"><span class="glyphicon glyphicon-check"></span> Apply</a> <a href="#" class="btn btn-xs btn-default edit-theme-color" id="flipCard" role="button"><span class="glyphicon glyphicon-edit"></span> Edit</a> </p> </div> </div>';

      SingleSetView.prototype.onShow = function() {
        this.displayColorSet();
        return this.highlightCurrentColorSet();
      };

      SingleSetView.prototype.highlightCurrentColorSet = function() {
        var setName;
        setName = this.model.get('name');
        if (setName === THEMECOLORSET) {
          return this.$el.find('.thumbnail').addClass('selected');
        }
      };

      SingleSetView.prototype.displayColorSet = function() {
        return _.each(this.model.attributes, (function(_this) {
          return function(colorValue, attributeName) {
            if (attributeName !== 'name') {
              return _this.$el.find('.colors').append("<span style='background: " + colorValue + ";'>&nbsp;</span>");
            }
          };
        })(this));
      };

      SingleSetView.prototype.serializeData = function() {
        var data;
        data = SingleSetView.__super__.serializeData.call(this);
        data.THEMECOLORSET = THEMECOLORSET;
        return data;
      };

      SingleSetView.prototype.events = {
        'click .apply-theme-color': function() {
          this.$el.find('.apply-theme-color').text('Applying..');
          return this.trigger("change:theme:color", this.model);
        },
        'click .edit-theme-color': function() {
          return this.trigger("edit:theme:color:clicked", this.model);
        }
      };

      SingleSetView.prototype.getEditView = function() {
        var back, back_content, setColorHtml, setColorHtmlObject, setName;
        setColorHtmlObject = this.$el.find('.flipthis');
        setColorHtml = setColorHtmlObject.get('0');
        back = void 0;
        setName = this.model.get('name');
        back_content = ("<div class='edit-colors'> <h5> " + setName + "</h5> <div class='color-sets'>") + this.displayEditColorSet() + "</div> <div class='actions'> <button id='closeCard' class='btn btn-xs'>Cancel</button> <button id='applyCard' class='btn btn-xs btn-primary'>Apply</button> </div> </div>";
        back = flippant.flip(setColorHtml, back_content, "modal");
        return $('#closeCard').on('click', this.closeEditView(back));
      };

      SingleSetView.prototype.closeEditView = function(back) {
        return back.close();
      };

      SingleSetView.prototype.showColorPicker = function() {
        return $('.color-picker-box').on('click', function() {
          return $(this).minicolors();
        });
      };

      SingleSetView.prototype.displayEditColorSet = function() {
        var colorSetHtml;
        colorSetHtml = " ";
        _.each(this.model.attributes, (function(_this) {
          return function(colorValue, attributeName) {
            if (attributeName !== 'name') {
              return colorSetHtml += "<div class='color row'> <div class='col-sm-2'> <span class='color-picker-box' style='background: " + colorValue + ";'>Click to Edit</span> </div> <div class='col-sm-10'> <h6>" + attributeName + "</h6> <p>Used in Headings, Links, Menu, Buttons and Accents</p> </div> </div>";
            }
          };
        })(this));
        return colorSetHtml;
      };

      return SingleSetView;

    })(Marionette.ItemView);
    EmptyView = (function(_super) {
      __extends(EmptyView, _super);

      function EmptyView() {
        return EmptyView.__super__.constructor.apply(this, arguments);
      }

      EmptyView.prototype.tagName = 'li';

      EmptyView.prototype.template = 'No theme color set found';

      return EmptyView;

    })(Marionette.ItemView);
    return Views.ThemeColorSetView = (function(_super) {
      __extends(ThemeColorSetView, _super);

      function ThemeColorSetView() {
        return ThemeColorSetView.__super__.constructor.apply(this, arguments);
      }

      ThemeColorSetView.prototype.template = ' <ul class="color-set-list"></ul>';

      ThemeColorSetView.prototype.itemView = SingleSetView;

      ThemeColorSetView.prototype.emptyView = EmptyView;

      ThemeColorSetView.prototype.itemViewContainer = '.color-set-list';

      return ThemeColorSetView;

    })(Marionette.CompositeView);
  });
});
