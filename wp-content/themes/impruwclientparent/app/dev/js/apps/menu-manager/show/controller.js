var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'bootbox'], function(App, AppController, bootbox) {
  return App.module("MenuManager.Show", function(Show, App) {
    var DropdownListView, MediaMangerLayout, MenuOption, MenuStyleItemView, MenuStylesView;
    Show.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.addMenuResponseHandler = __bind(this.addMenuResponseHandler, this);
        this.deleteMenuResponseHandler = __bind(this.deleteMenuResponseHandler, this);
        this.addNewMenu = __bind(this.addNewMenu, this);
        this.saveMenuElementModel = __bind(this.saveMenuElementModel, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var layout;
        this.menuId = opts.menuId, this.menuElementModel = opts.menuElementModel, this.region = opts.region;
        this.layout = layout = this.getLayout(this.menuId);
        this.listenTo(layout, 'add:new:menu', this.addNewMenu);
        this.listenTo(layout, 'delete:menu:clicked', this.deleteMenu);
        this.listenTo(this.region, 'before:close', this.saveMenuElementModel);
        return this.show(this.layout);
      };

      Controller.prototype.saveMenuElementModel = function() {
        return this.menuElementModel.save();
      };

      Controller.prototype.addNewMenu = function(menuName) {
        var data;
        data = {
          action: 'builder-add-new-menu',
          menu_name: menuName
        };
        return $.post(AJAXURL, data, this.addMenuResponseHandler, 'json');
      };

      Controller.prototype.deleteMenu = function(menuId) {
        var ajaxData;
        menuId = parseInt(menuId);
        if (menuId === 0) {
          return;
        }
        ajaxData = {
          action: 'builder-delete-menu',
          menu_id: menuId
        };
        return $.post(AJAXURL, ajaxData, this.deleteMenuResponseHandler, 'json');
      };

      Controller.prototype.deleteMenuResponseHandler = function(response) {
        var menuModel;
        this.menuElementModel.set('menu_id', 0);
        menuModel = window.menusCollection.get(response.menu_id);
        window.menusCollection.remove(menuModel);
        return this.layout.triggerMethod('menu:delete:success');
      };

      Controller.prototype.addMenuResponseHandler = function(response) {
        var model;
        if (response.success !== true) {
          return this.layout.triggerMethod("add:menu:failed", response.message);
        } else {
          model = new App.Entities.Menus.MenuModel(response.data);
          window.menusCollection.add(model);
          return this.layout.triggerMethod("add:menu:success", model.get('term_id'));
        }
      };

      Controller.prototype.getLayout = function(menuId) {
        var globalMenusCollection;
        globalMenusCollection = window.menusCollection;
        return new MediaMangerLayout({
          collection: globalMenusCollection,
          menuId: menuId,
          menuElementModel: this.menuElementModel
        });
      };

      return Controller;

    })(AppController);
    MenuOption = (function(_super) {
      __extends(MenuOption, _super);

      function MenuOption() {
        return MenuOption.__super__.constructor.apply(this, arguments);
      }

      MenuOption.prototype.tagName = 'option';

      MenuOption.prototype.template = '{{name}}';

      MenuOption.prototype.onRender = function() {
        return this.$el.attr('value', this.model.get('term_id'));
      };

      return MenuOption;

    })(Marionette.ItemView);
    DropdownListView = (function(_super) {
      __extends(DropdownListView, _super);

      function DropdownListView() {
        this.menuChanged = __bind(this.menuChanged, this);
        return DropdownListView.__super__.constructor.apply(this, arguments);
      }

      DropdownListView.prototype.tagName = 'select';

      DropdownListView.prototype.className = 'global-menus-list';

      DropdownListView.prototype.itemView = MenuOption;

      DropdownListView.prototype.emptyView = Marionette.ItemView.extend({
        tagName: 'option',
        template: 'Add Menu'
      });

      DropdownListView.prototype.events = {
        'change': 'menuChanged'
      };

      DropdownListView.prototype.menuChanged = function() {
        var menuId;
        menuId = this.$el.selectpicker('val');
        if (menuId !== '') {
          return this.trigger('menu:changed', menuId);
        }
      };

      DropdownListView.prototype.onRender = function() {
        return this.$el.prepend('<option value="">Choose Menu</option>');
      };

      DropdownListView.prototype.onShow = function() {
        var menuId;
        menuId = Marionette.getOption(this, 'menuId');
        menuId = parseInt(menuId) === 0 ? '' : menuId;
        this.$el.selectpicker();
        this.$el.selectpicker('val', menuId);
        if (menuId !== '') {
          return this.trigger('menu:changed', menuId);
        }
      };

      DropdownListView.prototype.onMenuDeleted = function() {
        this.$el.selectpicker('refresh');
        return this.$el.selectpicker('val', '');
      };

      return DropdownListView;

    })(Marionette.CollectionView);
    MenuStyleItemView = (function(_super) {
      __extends(MenuStyleItemView, _super);

      function MenuStyleItemView() {
        return MenuStyleItemView.__super__.constructor.apply(this, arguments);
      }

      MenuStyleItemView.prototype.className = 'col-sm-6 single-item';

      MenuStyleItemView.prototype.template = '<a href="#" class="thumbnail"> <div class="ticker ui-selectee" style=""><span class="glyphicon glyphicon-ok ui-selectee"></span><span class="glyphicon glyphicon-minus ui-selectee" style=""></span></div> <div class="imgthumb"> <img alt="{{name}}" class="img-responsive" src="{{imagePath}}" /> </div> </a>';

      MenuStyleItemView.prototype.onRender = function() {
        return this.$el.attr('data-menu-style', this.model.get('name'));
      };

      return MenuStyleItemView;

    })(Marionette.ItemView);
    MenuStylesView = (function(_super) {
      __extends(MenuStylesView, _super);

      function MenuStylesView() {
        this.menuStyleSelected = __bind(this.menuStyleSelected, this);
        return MenuStylesView.__super__.constructor.apply(this, arguments);
      }

      MenuStylesView.prototype.itemView = MenuStyleItemView;

      MenuStylesView.prototype.onShow = function() {
        var currentStyle;
        currentStyle = Marionette.getOption(this, 'currentStyle');
        this.$el.selectable({
          selected: this.menuStyleSelected
        });
        return this.$el.find("div[data-menu-style='" + currentStyle + "']").addClass('ui-selected');
      };

      MenuStylesView.prototype.menuStyleSelected = function(event, ui) {
        return this.trigger("menu:style:selected", $(ui.selected).attr('data-menu-style'));
      };

      return MenuStylesView;

    })(Marionette.CollectionView);
    MediaMangerLayout = (function(_super) {
      __extends(MediaMangerLayout, _super);

      function MediaMangerLayout() {
        this.menuChanged = __bind(this.menuChanged, this);
        this.updateSelectedMenu = __bind(this.updateSelectedMenu, this);
        this.showMenuStyles = __bind(this.showMenuStyles, this);
        return MediaMangerLayout.__super__.constructor.apply(this, arguments);
      }

      MediaMangerLayout.prototype.className = 'menu-manager-container row';

      MediaMangerLayout.prototype.events = {
        'click a.delete-menu': function() {
          var message;
          message = _.polyglot.t('Deleting this menu will remove all occurrences of this menu from your site. Are you sure you want to continue?');
          return bootbox.confirm(message, (function(_this) {
            return function(answer) {
              if (answer === true) {
                return _this.trigger("delete:menu:clicked", _this.menuId);
              }
            };
          })(this));
        },
        'click #new-menu-name button': function() {
          this.$el.find('#new-menu-name form-group').removeClass('has-error');
          this.$el.find('#new-menu-name p.help-block').remove();
          return this.trigger("add:new:menu", this.$el.find('#new-menu-name input[type="text"]').val());
        }
      };

      MediaMangerLayout.prototype.template = '<div class="col-md-12"> <div class="modal-help-text"> <span class="glyphicon glyphicon-info-sign"></span>&nbsp; {{#polyglot}}If you wanted to go to a particular page you can do that by selecting the page in Current Page: drop down on the site builder right below the header.{{/polyglot}} </div> <p class="desc"> {{#polyglot}}You can either edit a previously added menu or create a new menu. To edit a previously added menu, select it from the dropdown{{/polyglot}} <small>{{#polyglot}}Note: Editing a menu will update all occurrences of this menu.{{/polyglot}}</small> </p> </div> <div class="col-md-8"> <div class="create-menu-container"> <div class="choose-menu"> <label class="control-label">{{#polyglot}}Select a Menu to Edit{{/polyglot}}</label> <div class="btn-group bootstrap-select"> <div id="global-menus-list-view"></div> </div> <span class="option-or">{{#polyglot}}Or{{/polyglot}}</span> <a href="#new-menu-name" data-toggle="collapse" class="create-new-menu">{{#polyglot}}Create a Menu{{/polyglot}}</a> </div> <form id="new-menu-name" class="form-inline collapse"> <div class="form-group"> <input class="form-control" placeholder="{{#polyglot}}Enter a name for your menu{{/polyglot}}" type="text"> </div> <button class="btn btn-default aj-imp-orange-btn" type="button">{{#polyglot}}Create{{/polyglot}}</button> </form> </div> <div id="add-menu-items"></div> <div id="list-menu-items"></div> <div class="menu-actions clearfix hidden"> <a class="delete-menu red-link"><span class="glyphicon glyphicon-trash"></span>&nbsp;{{#polyglot}}Delete Menu{{/polyglot}}</a> </div> </div> <div class="col-md-4"> <div class="styles-container"> <h4>{{#polyglot}}Choose a Menu Style{{/polyglot}}</h4> <div id="menu-style-list-region" class="row thumbnails overflow-view"> </div> </div> </div>';

      MediaMangerLayout.prototype.initialize = function(options) {
        this.collection = options.collection, this.menuId = options.menuId, this.menuElementModel = options.menuElementModel;
        this.listenTo(this, 'show', (function(_this) {
          return function() {
            _this.menuListView = new DropdownListView({
              collection: _this.collection,
              menuId: _this.menuId
            });
            _this.listenTo(_this.menuListView, "menu:changed", _this.menuChanged);
            return _this.gloablMenusList.show(_this.menuListView);
          };
        })(this));
        return this.listenTo(this, 'show', this.showMenuStyles);
      };

      MediaMangerLayout.prototype.showMenuStyles = function() {
        var menuStylesView, model, styles, stylesCollection;
        model = App.request("get:element:settings:options", 'Menu');
        styles = model.get('styles');
        styles = _.isArray(styles) ? styles : [];
        stylesCollection = new Backbone.Collection(styles);
        menuStylesView = new MenuStylesView({
          collection: stylesCollection,
          currentStyle: this.menuElementModel.get('style')
        });
        this.listenTo(menuStylesView, "menu:style:selected", this.updateSelectedMenu);
        return this.menuStylesRegion.show(menuStylesView);
      };

      MediaMangerLayout.prototype.updateSelectedMenu = function(menuStyle) {
        return this.menuElementModel.set('style', menuStyle);
      };

      MediaMangerLayout.prototype.menuChanged = function(menuId) {
        this.menuId = menuId;
        this.menuElementModel.set('menu_id', this.menuId);
        this.$el.find('a.delete-menu').parent().removeClass('hidden');
        App.execute("add:menu:items:app", {
          region: this.addMenuRegion,
          menuId: this.menuId
        });
        return App.execute("list:menu:items:app", {
          region: this.listMenuRegion,
          menuId: this.menuId,
          menuElementModel: this.menuElementModel
        });
      };

      MediaMangerLayout.prototype.onMenuDeleteSuccess = function() {
        this.listMenuRegion.close();
        this.addMenuRegion.close();
        this.$el.find('a.delete-menu').addClass('hidden');
        return this.menuListView.triggerMethod('menu:deleted');
      };

      MediaMangerLayout.prototype.onAddMenuFailed = function(message) {
        message = '<p class="help-block">' + _.polyglot.t(message + '</p>');
        this.$el.find('#new-menu-name .form-group').addClass('has-error');
        return this.$el.find('#new-menu-name input[type="text"]').after(message);
      };

      MediaMangerLayout.prototype.onAddMenuSuccess = function(menuId) {
        this.$el.find('#new-menu-name input').val('');
        this.$el.find('#new-menu-name .form-group').removeClass('has-error');
        this.$el.find('select.global-menus-list').selectpicker('refresh');
        return this.$el.find('select.global-menus-list').selectpicker('val', menuId);
      };

      MediaMangerLayout.prototype.dialogOptions = {
        modal_title: _.polyglot.t('Menu Manager')
      };

      MediaMangerLayout.prototype.regions = {
        addMenuRegion: '#add-menu-items',
        listMenuRegion: '#list-menu-items',
        gloablMenusList: '#global-menus-list-view',
        menuStylesRegion: '#menu-style-list-region'
      };

      return MediaMangerLayout;

    })(Marionette.Layout);
    return App.commands.setHandler("menu-manager", function(menuElementModel, menuId) {
      var opts;
      opts = {
        region: App.dialogRegion,
        menuId: menuId,
        menuElementModel: menuElementModel
      };
      return new Show.Controller(opts);
    });
  });
});
