var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/builder/site-builder/elements/text/views', 'apps/builder/site-builder/elements/text/settings/controller'], function(App) {
  return App.module('SiteBuilderApp.Element.Text', function(Text, App, Backbone, Marionette, $, _) {
    return Text.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.renderElement = __bind(this.renderElement, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        var data;
        data = {};
        data['en'] = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s';
        data['nb'] = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s';
        _.defaults(options.modelData, {
          element: 'Text',
          content: data
        });
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype.bindEvents = function() {
        return Controller.__super__.bindEvents.call(this);
      };

      Controller.prototype._getTextView = function(model) {
        return new Text.Views.TextView({
          model: model
        });
      };

      Controller.prototype.renderElement = function() {
        var view;
        this.removeSpinner();
        view = this._getTextView(this.layout.model);
        this.listenTo(view, "text:element:blur", (function(_this) {
          return function(html) {
            var data, original_data;
            original_data = _this.layout.model.get('content');
            if (_.isObject(original_data)) {
              data = original_data;
            } else {
              data = {};
              data['en'] = original_data;
            }
            data[WPML_DEFAULT_LANG] = html;
            _this.layout.model.set('content', data);
            return _this.layout.model.save();
          };
        })(this));
        return this.layout.elementRegion.show(view);
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
