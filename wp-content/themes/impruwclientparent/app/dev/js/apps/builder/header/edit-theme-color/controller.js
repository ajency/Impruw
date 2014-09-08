var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module('EditThemeColorApp', function(EditThemeColorApp, App, Backbone, Marionette, $, _) {
    var EditThemeColorController, EditThemeColorView;
    EditThemeColorController = (function(_super) {
      __extends(EditThemeColorController, _super);

      function EditThemeColorController() {
        return EditThemeColorController.__super__.constructor.apply(this, arguments);
      }

      EditThemeColorController.prototype.initialize = function(opts) {
        this.model = opts.model;
        this.region = opts.region;
        this.view = this.getView(this.model);
        this.listenTo(this.view, "close:edit:theme:clicked", this.closeEditThemeClick);
        this.listenTo(this.view, "create:custom:set:color", this.createCustomSetColor);
        return this.show(this.view, {
          loading: true
        });
      };

      EditThemeColorController.prototype.getView = function(model) {
        $("#theme-color-set").slideUp();
        return new EditThemeColorView({
          model: model
        });
      };

      EditThemeColorController.prototype.closeEditThemeClick = function() {
        this.region.close();
        return $("#theme-color-set").slideDown();
      };

      EditThemeColorController.prototype.createCustomSetColor = function(formdata) {
        var options;
        options = {
          url: AJAXURL,
          method: 'POST',
          data: {
            action: 'create-custom-theme-color',
            formdata: formdata,
            modeldata: this.model.toJSON()
          }
        };
        return $.ajax(options).done(function(response) {
          return window.location.reload(true);
        }).fail(function(resp) {
          return console.log('error');
        });
      };

      return EditThemeColorController;

    })(AppController);
    EditThemeColorView = (function(_super) {
      __extends(EditThemeColorView, _super);

      function EditThemeColorView() {
        return EditThemeColorView.__super__.constructor.apply(this, arguments);
      }

      EditThemeColorView.prototype.tagName = 'form';

      EditThemeColorView.prototype.template = "<div class='edit-colors'> <h5>{{name}}</h5> <div class='color-sets'> </div> <div class='actions'> <button class='btn btn-xs closeCard'>{{#polyglot}}Cancel{{/polyglot}}</button> <button class='btn btn-xs btn-primary applyCard'>{{#polyglot}}Apply{{/polyglot}}</button> </div> </div>";

      EditThemeColorView.prototype.onShow = function() {
        var colorSetTpl, self;
        colorSetTpl = this.displayEditColorSet();
        this.$el.find('.color-sets').append(colorSetTpl);
        self = this;
        return this.$el.find('.theme_colour').minicolors({
          defaults: {
            inline: false
          },
          hide: function() {
            return $(this).removeClass('show').addClass('hide');
          },
          change: function(hex, opacity) {
            var id;
            id = $(this).attr('name');
            return self.$el.find("#" + id).css('background-color', hex);
          }
        });
      };

      EditThemeColorView.prototype.serializeData = function() {
        var data;
        data = EditThemeColorView.__super__.serializeData.call(this);
        data.name = _.polyglot.t(this.model.get('name'));
        return data;
      };

      EditThemeColorView.prototype.events = {
        'click .closeCard': function(e) {
          e.preventDefault();
          return this.trigger("close:edit:theme:clicked");
        },
        'click .applyCard': function(e) {
          var formdata;
          e.preventDefault();
          formdata = Backbone.Syphon.serialize(this);
          this.$el.find('.applyCard').text('Applying..');
          return this.trigger("create:custom:set:color", formdata);
        },
        'click .minicolor': function(e) {
          var id;
          id = $(e.target).attr('id');
          this.$el.find("input[name='" + id + "']").removeClass('hide').addClass('show');
          return _.delay((function(_this) {
            return function() {
              return _this.$el.find("input[name='" + id + "']").minicolors('show');
            };
          })(this), 100);
        },
        'click input': function() {
          return console.log('clicked');
        }
      };

      EditThemeColorView.prototype.displayEditColorSet = function() {
        var colorSetHtml;
        colorSetHtml = " ";
        _.each(this.model.attributes, (function(_this) {
          return function(attributeValue, attributeName) {
            var themeDescription, themeTitle;
            if (attributeName !== 'name') {
              themeTitle = _.polyglot.t(attributeValue.title);
              themeDescription = _.polyglot.t(attributeValue.description);
              return colorSetHtml += "<div class='color row'> <div class='col-sm-2'> <div id='" + attributeName + "' class=' minicolor' style='background-color:" + attributeValue.color + "; height:58px;'  ></div> <input type='text' name='" + attributeName + "' class='theme_colour hide'  value='" + attributeValue.color + "'> </div> <div class='col-sm-10'> <h6>" + themeTitle + "</h6> <p>" + themeDescription + "</p> </div> </div>";
            }
          };
        })(this));
        return colorSetHtml;
      };

      return EditThemeColorView;

    })(Marionette.ItemView);
    return App.commands.setHandler("edit:theme:color:set", function(opts) {
      return new EditThemeColorController(opts);
    });
  });
});
