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

      SingleSetView.prototype.template = '<div class="thumbnail" id="flipthis"> <div class="colors"></div> <div class="caption"> <h3>{{name}}</h3> <p> <a href="#" class="btn btn-xs btn-primary apply-theme-color" role="button"><span class="glyphicon glyphicon-check"></span> Apply</a> <a href="#" class="btn btn-xs btn-default edit-theme-color" id="flipCard" role="button"><span class="glyphicon glyphicon-edit"></span> Edit</a> </p> </div> </div>';

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
          return function(colorValue, index) {
            if (index !== 'name') {
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
          return this.getEditView();
        }
      };

      SingleSetView.prototype.getEditView = function() {
        var back, back_content, front, front2;
        front = this.$el.find('#flipthis').html();
        front2 = document.getElementById("flipthis");
        back = void 0;
        back_content = "<div class='edit-colors'> <h5>Color Set 1</h5> <div class='color-sets'> <div class='color row'> <div class='col-sm-2'> <span class='color-picker-box' style='background: #FF5F5F;'>Click to Edit</span> </div> <div class='col-sm-10'> <h6>Primary Color</h6> <p>Used in Headings, Links, Menu, Buttons and Accents</p> </div> </div> <div class='color row'> <div class='col-sm-2'> <span class='color-picker-box' style='background: #2A3B66;'>Click to Edit</span> </div> <div class='col-sm-10'> <h6>Secondary Color</h6> <p>Used in Headings, Links, Menu, Buttons and Accents</p> </div> </div> <div class='color row'> <div class='col-sm-2'> <span class='color-picker-box' style='background: #16A2F5;'>Click to Edit</span> </div> <div class='col-sm-10'> <h6>Tertiary Color</h6> <p>Used in Headings, Links, Menu, Buttons and Accents</p> </div> </div> <div class='color row'> <div class='col-sm-2'> <span class='color-picker-box' style='background:#CCCCCC;'>Click to Edit</span> </div> <div class='col-sm-10'> <h6>Background Color</h6> <p>Used in Headings, Links, Menu, Buttons and Accents</p> </div> </div> <div class='color row'> <div class='col-sm-2'> <span class='color-picker-box' style='background: #333333;'>Click to Edit</span> </div> <div class='col-sm-10'> <h6>Text Color</h6> <p>Used in Headings, Links, Menu, Buttons and Accents</p> </div> </div> </div> <div class='actions'> <button id='closeCard' class='btn btn-xs'>Cancel</button> <button id='applyCard' class='btn btn-xs btn-primary'>Apply</button> </div> </div>";
        return back = flippant.flip(front2, back_content, "modal");
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
