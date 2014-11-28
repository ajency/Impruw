var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/builder/site-builder/elements/smarttable/views', 'apps/builder/site-builder/elements/smarttable/settings/controller'], function(App) {
  return App.module('SiteBuilderApp.Element.SmartTable', function(SmartTable, App, Backbone, Marionette, $, _) {
    return SmartTable.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        _.defaults(options.modelData, {
          element: 'SmartTable',
          style: 'Testimonials',
          innerStyle: 'Default',
          contents: {
            en: [
              {
                dt: 'demo',
                dd: 'demo',
                em: 'demo'
              }, {
                dt: 'demo',
                dd: 'demo',
                em: 'demo'
              }
            ],
            nb: [
              {
                dt: 'demo',
                dd: 'demo',
                em: 'demo'
              }, {
                dt: 'demo',
                dd: 'demo',
                em: 'demo'
              }
            ]
          }
        });
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype.bindEvents = function() {
        this.listenTo(this.layout.model, "change:style change:innerStyle", this.renderElement);
        return Controller.__super__.bindEvents.call(this);
      };

      Controller.prototype._getSmartTableView = function(model, template) {
        return new SmartTable.Views.TableView({
          model: model,
          collection: this.collection
        });
      };

      Controller.prototype._generateCollections = function() {
        this.collection = new Backbone.Collection(this.layout.model.get('contents')[WPML_DEFAULT_LANG]);
        window.WPML_OTHER_LANG = WPML_DEFAULT_LANG === 'en' ? 'nb' : 'en';
        this.collectionOther = new Backbone.Collection(this.layout.model.get('contents')[WPML_OTHER_LANG]);
        return this.listenTo(this.collection, 'remove', (function(_this) {
          return function(model, collection, options) {
            _this.collectionOther.remove(_this.collectionOther.at(options.index));
            return _this.view.trigger('save:smart:table');
          };
        })(this));
      };

      Controller.prototype.renderElement = function() {
        this.removeSpinner();
        this._generateCollections();
        this.view = this._getSmartTableView(this.layout.model);
        this.listenTo(this.view, 'itemview:save:smart:table save:smart:table', function() {
          var data;
          data = this.layout.model.get('contents');
          data[WPML_DEFAULT_LANG] = this.collection.toJSON();
          data[WPML_OTHER_LANG] = this.collectionOther.toJSON();
          _.each(data, function(value, key) {
            return _.each(value, function(val1, key1) {
              return _.each(val1, function(val2, key2) {
                return data[key][key1][key2] = _.stripslashes(val2);
              });
            });
          });
          this.layout.model.set('contents', data);
          return this.layout.model.save();
        });
        this.listenTo(this.view, 'add:new:model:to:collection', function() {
          var data;
          data = {
            en: {
              dt: 'demo',
              dd: 'demo',
              em: 'demo'
            },
            nb: {
              dt: 'demo',
              dd: 'demo',
              em: 'demo'
            }
          };
          this.collection.add(data[WPML_DEFAULT_LANG]);
          this.collectionOther.add(data[WPML_OTHER_LANG]);
          return this.view.trigger('save:smart:table');
        });
        return this.layout.elementRegion.show(this.view);
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
