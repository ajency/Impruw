var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module('SliderManager.GridView', function(GridView, App, Backbone, Marionette, $, _) {
    var GridViewController, SliderGridView, SliderView;
    GridViewController = (function(_super) {
      __extends(GridViewController, _super);

      function GridViewController() {
        return GridViewController.__super__.constructor.apply(this, arguments);
      }

      GridViewController.prototype.initialize = function(opt) {
        var collection, view;
        collection = opt.collection;
        view = this._getSliderGridView(collection);
        this.listenTo(view, "create:new:slider", function() {
          return Marionette.triggerMethod.call(this.region, "create:new:slider");
        });
        this.listenTo(view, "itemview:edit:slider", function(iv, id) {
          return Marionette.triggerMethod.call(this.region, "edit:slider", id);
        });
        this.listenTo(view, "itemview:delete:slider", function(iv, id) {
          return Marionette.triggerMethod.call(this.region, "delete:slider", id);
        });
        return this.show(view, {
          loading: true
        });
      };

      GridViewController.prototype._getSliderGridView = function(collection) {
        return new SliderGridView({
          collection: collection
        });
      };

      return GridViewController;

    })(AppController);
    SliderView = (function(_super) {
      __extends(SliderView, _super);

      function SliderView() {
        return SliderView.__super__.constructor.apply(this, arguments);
      }

      SliderView.prototype.template = '<div class="thumbnail"><img src="{{thumb_url}}" style="height:200px;width:100%"/> <div class="caption"> <h5>{{title}}<span class="badge">Slides: {{no_of_slides}}</span></h5> </div> <div class="actions"> <button type="button" class="btn btn-default btn-xs edit-slider"><span class="glyphicon glyphicon-pencil"></span>&nbsp;Edit</button> <button type="button" class="btn btn-danger btn-xs delete-slider"><span class="glyphicon glyphicon-trash"></span>&nbsp;Delete</button> </div> </div>';

      SliderView.prototype.className = 'col-sm-2';

      SliderView.prototype.events = {
        'click .edit-slider': function() {
          return this.trigger("edit:slider", this.model.get('id'));
        },
        'click .delete-slider': function() {
          if (confirm(_.polyglot.t("Are you sure?"))) {
            return this.trigger("delete:slider", this.model.get('id'));
          }
        }
      };

      return SliderView;

    })(Marionette.ItemView);
    SliderGridView = (function(_super) {
      __extends(SliderGridView, _super);

      function SliderGridView() {
        return SliderGridView.__super__.constructor.apply(this, arguments);
      }

      SliderGridView.prototype.template = '<div class="col-sm-2"> <a href="#" class="thumbnail create-slider"><span class="glyphicon glyphicon-plus-sign"></span><br>{{#polyglot}}Add New Slider{{/polyglot}}</a> </div>';

      SliderGridView.prototype.className = 'row sliders';

      SliderGridView.prototype.itemView = SliderView;

      SliderGridView.prototype.events = {
        'click a.create-slider': function(e) {
          e.preventDefault();
          return this.trigger("create:new:slider");
        }
      };

      return SliderGridView;

    })(Marionette.CompositeView);
    return App.commands.setHandler('show:sliders:grid', function(opts) {
      if (opts == null) {
        opts = {};
      }
      App.navigate('slider-manager');
      return new GridViewController(opts);
    });
  });
});
