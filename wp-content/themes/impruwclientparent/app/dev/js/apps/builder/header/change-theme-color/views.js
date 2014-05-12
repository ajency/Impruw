var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/builder/header/show/templates/mainview.html'], function(App, mainviewTpl) {
  return App.module('HeaderApp.Show.Views', function(Views, App, Backbone, Marionette, $, _) {
    var EmptyView, SingleSetView, ThemeColorSetView;
    Views.MainView = (function(_super) {
      __extends(MainView, _super);

      function MainView() {
        return MainView.__super__.constructor.apply(this, arguments);
      }

      MainView.prototype.template = mainviewTpl;

      MainView.prototype.className = 'navbar navbar-default';

      MainView.prototype.serializeData = function() {
        var data;
        data = MainView.__super__.serializeData.call(this);
        data.LOGOUTURL = LOGOUTURL;
        data.DASHBOARDURL = DASHBOARDURL;
        return data;
      };

      MainView.prototype.events = {
        'click .add-new-page': function() {
          return this.trigger("add:new:page:clicked");
        },
        'click #aj-imp-color-sel': function() {
          return this.trigger("show:theme:color:clicked");
        }
      };

      MainView.prototype.onShow = function() {
        var back, back_content, front;
        front = document.getElementById("flipthis");
        back_content = "<div class='edit-colors'> <h5>Color Set 1</h5> <div class='color-sets'> <div class='color row'> <div class='col-sm-2'> <span class='color-picker-box' style='background: #FF5F5F;'>Click to Edit</span> </div> <div class='col-sm-10'> <h6>Primary Color</h6> <p>Used in Headings, Links, Menu, Buttons and Accents</p> </div> </div> <div class='color row'> <div class='col-sm-2'> <span class='color-picker-box' style='background: #2A3B66;'>Click to Edit</span> </div> <div class='col-sm-10'> <h6>Secondary Color</h6> <p>Used in Headings, Links, Menu, Buttons and Accents</p> </div> </div> <div class='color row'> <div class='col-sm-2'> <span class='color-picker-box' style='background: #16A2F5;'>Click to Edit</span> </div> <div class='col-sm-10'> <h6>Tertiary Color</h6> <p>Used in Headings, Links, Menu, Buttons and Accents</p> </div> </div> <div class='color row'> <div class='col-sm-2'> <span class='color-picker-box' style='background:#CCCCCC;'>Click to Edit</span> </div> <div class='col-sm-10'> <h6>Background Color</h6> <p>Used in Headings, Links, Menu, Buttons and Accents</p> </div> </div> <div class='color row'> <div class='col-sm-2'> <span class='color-picker-box' style='background: #333333;'>Click to Edit</span> </div> <div class='col-sm-10'> <h6>Text Color</h6> <p>Used in Headings, Links, Menu, Buttons and Accents</p> </div> </div> </div> <div class='actions'> <button id='closeCard' class='btn btn-xs'>Cancel</button> <button id='applyCard' class='btn btn-xs btn-primary'>Apply</button> </div> </div>";
        back = void 0;
        return document.getElementById("flipCard").addEventListener("click", function(e) {
          back = flippant.flip(front, back_content, "modal");
          document.getElementById("closeCard").addEventListener("click", function(e) {
            back = back.close();
          });
        });
      };

      MainView.prototype.onAddThemeColorSets = function(themeColorCollection) {
        var themeColorView;
        themeColorView = new ThemeColorSetView({
          collection: themeColorCollection
        });
        themeColorView.render();
        this.$el.find('.dropdown-accordion').append(themeColorView.$el);
        return this.listenTo(themeColorView, "itemview:change:theme:color:clicked", this.changeThemeColorClick);
      };

      MainView.prototype.onShowThemeColorSet = function(themeColorCollection) {
        var themeColorView;
        themeColorView = new ThemeColorSetView({
          collection: themeColorCollection,
          region: App.dialogRegion
        });
        themeColorView.render();
        this.$el.find('#aj-imp-color-sel').append(themeColorView.$el);
        return this.$el.find('#theme-color-pop').modal();
      };

      MainView.prototype.changeThemeColorClick = function(iv, model) {
        return this.trigger("change:theme:color", model);
      };

      return MainView;

    })(Marionette.Layout);
    SingleSetView = (function(_super) {
      __extends(SingleSetView, _super);

      function SingleSetView() {
        return SingleSetView.__super__.constructor.apply(this, arguments);
      }

      SingleSetView.prototype.tagName = 'li';

      SingleSetView.prototype.template = '<div class="thumbnail" id="flipthis"> <div class="colors"> <span style="background: #FF5F5F;" data-toggle="tooltip" title="Primary Color for Theme">&nbsp;</span> <span style="background: #2A3B66;">&nbsp;</span> <span style="background: #16A2F5;">&nbsp;</span> <span style="background: #CCCCCC;">&nbsp;</span> <span style="background: #333333;">&nbsp;</span> </div> <div class="caption"> <h3>Color Set 1</h3> <p> <a href="#" class="btn btn-xs btn-primary" role="button"><span class="glyphicon glyphicon-check"></span> Apply</a> <a href="#" class="btn btn-xs btn-default" id="flipCard" role="button"><span class="glyphicon glyphicon-edit"></span> Edit</a> </p> </div> </div>';

      return SingleSetView;

    })(Marionette.ItemView);
    EmptyView = (function(_super) {
      __extends(EmptyView, _super);

      function EmptyView() {
        return EmptyView.__super__.constructor.apply(this, arguments);
      }

      EmptyView.prototype.tagName = 'li';

      EmptyView.prototype.template = 'Nothing found';

      return EmptyView;

    })(Marionette.ItemView);
    return ThemeColorSetView = (function(_super) {
      __extends(ThemeColorSetView, _super);

      function ThemeColorSetView() {
        return ThemeColorSetView.__super__.constructor.apply(this, arguments);
      }

      ThemeColorSetView.prototype.template = ' <div class="modal medium-modal fade" id="theme-color-pop" tabindex="-1" role="dialog"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> <h4 class="modal-title">Choose Colors for Your Theme</h4> </div> <div class="modal-body"> <ul class="color-set-list"> </ul> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button> </div> </div> </div> </div>';

      ThemeColorSetView.prototype.itemView = SingleSetView;

      ThemeColorSetView.prototype.emptyView = EmptyView;

      ThemeColorSetView.prototype.itemViewContainer = '.color-set-list';

      return ThemeColorSetView;

    })(Marionette.CompositeView);
  });
});
