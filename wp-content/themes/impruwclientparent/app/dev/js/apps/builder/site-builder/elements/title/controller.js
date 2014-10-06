var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/builder/site-builder/elements/title/views', 'apps/builder/site-builder/elements/title/settings/controller'], function(App) {
  return App.module('SiteBuilderApp.Element.Title', function(Title, App, Backbone, Marionette, $, _) {
    return Title.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.renderElement = __bind(this.renderElement, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        var data;
        data = {};
        data['en'] = 'Click here to enter title';
        data['nb'] = 'Klikk her for å skrive inn tittel';
        _.defaults(options.modelData, {
          element: 'Title',
          content: data,
          style: '',
          justify: ''
        });
        this.settingsModel = App.request("get:element:settings:options", 'Title');
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype.bindEvents = function() {
        this.listenTo(this.layout.model, "change:style", this.renderElement);
        this.layout.elementRegion.on('show', (function(_this) {
          return function(view) {
            return _this.layout.setStyle(_.slugify(_this.layout.model.get('style')));
          };
        })(this));
        return Controller.__super__.bindEvents.call(this);
      };

      Controller.prototype._getTitleView = function(model) {
        return new Title.Views.TitleView({
          model: model,
          settingsModel: this.settingsModel
        });
      };

      Controller.prototype.renderElement = function() {
        var view;
        this.removeSpinner();
        view = this._getTitleView(this.layout.model);
        this.listenTo(view, "title:element:blur", (function(_this) {
          return function(html) {
            var data, original_data;
            original_data = _this.layout.model.get('content');
            if (_.isObject(original_data)) {
              data = {};
              Object.getOwnPropertyNames(original_data).forEach(function(val, idx, array) {
                return data[val] = _.stripslashes(original_data[val]);
              });
            } else {
              data = {};
              data['en'] = original_data;
            }
            data[WPML_DEFAULT_LANG] = html;
            _this.layout.model.set('content', data);
            return _this.layout.model.save();
          };
        })(this));
        this.layout.model.save();
        return this.layout.elementRegion.show(view);
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
