var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/builder/site-builder/elements/list/views', 'apps/builder/site-builder/elements/list/settings/controller'], function(App) {
  return App.module('SiteBuilderApp.Element.List', function(List, App, Backbone, Marionette, $, _) {
    return List.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        _.defaults(options.modelData, {
          element: 'List',
          style: '',
          contents: {
            en: [
              {
                data: 'demo'
              }, {
                data: 'demo'
              }, {
                data: 'demo'
              }, {
                data: 'demo'
              }
            ],
            nb: [
              {
                data: 'demo'
              }, {
                data: 'demo'
              }, {
                data: 'demo'
              }, {
                data: 'demo'
              }
            ]
          }
        });
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype.bindEvents = function() {
        this.listenTo(this.layout.model, "change:style ", this.renderElement);
        return Controller.__super__.bindEvents.call(this);
      };

      Controller.prototype._getListView = function() {
        return new List.Views.ListView({
          model: this.layout.model,
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
            return _this.view.trigger('save:list');
          };
        })(this));
      };

      Controller.prototype.renderElement = function() {
        this.removeSpinner();
        this._generateCollections();
        this.view = this._getListView();
        this.listenTo(this.view, 'itemview:save:list save:list', function() {
          var data;
          data = this.layout.model.get('contents');
          data[WPML_DEFAULT_LANG] = this.collection.toJSON();
          data[WPML_OTHER_LANG] = this.collectionOther.toJSON();
          this.layout.model.set('contents', data);
          return this.layout.model.save();
        });
        this.listenTo(this.view, 'add:new:model:to:collection', function() {
          var data;
          data = {
            en: {
              data: 'demo'
            },
            nb: {
              data: 'demo'
            }
          };
          this.collection.add(data[WPML_DEFAULT_LANG]);
          this.collectionOther.add(data[WPML_OTHER_LANG]);
          return this.view.trigger('save:list');
        });
        return this.layout.elementRegion.show(this.view);
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
