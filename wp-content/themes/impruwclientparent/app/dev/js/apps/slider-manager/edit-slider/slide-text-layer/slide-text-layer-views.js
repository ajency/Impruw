var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SliderManager.SlideTextLayer.Views', function(Views, App) {
    return Views.TextLayerView = (function(_super) {
      __extends(TextLayerView, _super);

      function TextLayerView() {
        return TextLayerView.__super__.constructor.apply(this, arguments);
      }

      TextLayerView.prototype.className = 'row';

      TextLayerView.prototype.template = '<div id="text-not-entered" class="alert alert-error hide">{{#polyglot}}Please enter text before saving{{/polyglot}}</div> <div class="col-sm-12 "> <form action="" method="POST" role="form" class="form-horizontal" validate> <div class="form-group "> <label for="" class="col-sm-4 control-label">{{#polyglot}}Enter Caption Text{{/polyglot}}</label> <div class="col-sm-8"> <input type="text" name="text" class=" form-control" placeholder="Enter caption text"/> </div> </div> <div class="form-group "> <label for="" class="col-sm-4 control-label">{{#polyglot}}Caption Style{{/polyglot}}</label> <div class="col-sm-8"> <select name="style"> <option value="black">Black</option> <option value="large_bold_white">Large Bold White</option> <option value="large_bold_black">Large Bold Black</option> <option value="excerpt">Excerpt</option> <option value="very_big_white">Very Big White</option> <option value="very_big_black">Very Big Black</option> </select> </div> </div> <!--	    <div class="form-group "> <label for="" class="col-sm-4 control-label">{{#polyglot}}Text Animation{{/polyglot}}</label> <div class="col-sm-8"> <select name="animation"> <option value="tp-fade">Fade</option> <option value="sft">Short from Top</option> <option value="sfl">Short from Left</option> <option value="lft">Long from Top</option> <option value="lfl">Long from Left</option> </select> </div> </div> --> <div class="form-group "> <label for="" class="col-sm-4 control-label">{{#polyglot}}Horizontal Position{{/polyglot}}</label> <div class="col-sm-8"> <select name="left"> <option value="left">{{#polyglot}}Left{{/polyglot}}</option> <option value="center">{{#polyglot}}Center{{/polyglot}}</option> <option value="right">{{#polyglot}}Right{{/polyglot}}</option> </select> </div> </div> <div class="form-group "> <label for="" class="col-sm-4 control-label">{{#polyglot}}Vertical Position{{/polyglot}}</label> <div class="col-sm-8"> <select name="top"> <option value="top">{{#polyglot}}Top{{/polyglot}}</option> <option value="center">{{#polyglot}}Center{{/polyglot}}</option> <option value="bottom">{{#polyglot}}Bottom{{/polyglot}}</option> </select> </div> </div> <div class="form-group "> <button type="button"  class="btn btn-sm aj-imp-submit" id="save-slide-layer"> Save </button> <button type="button" class="btn btn-sm aj-imp-submit" id="cancel-slide-layer"> Cancel </button> <button type="button" class="btn btn-sm aj-imp-submit" id="delete-slide-layer"> Delete </button> </div> </form>';

      TextLayerView.prototype.events = {
        'click #save-slide-layer': function(e) {
          var data, layer;
          data = Backbone.Syphon.serialize(this);
          if (data.text === '') {
            return this.$el.find('#text-not-entered').removeClass('hide');
          } else {
            layer = this.model.get('layers')[0];
            _.extend(layer, data);
            this.model.set('layers', [layer]);
            return this.trigger('save:text:layer');
          }
        },
        'click #delete-slide-layer': function(e) {
          this.model.set('layers', []);
          return this.trigger('save:text:layer');
        },
        'click #cancel-slide-layer': function(e) {
          return this.trigger('cancel:text:layer');
        }
      };

      TextLayerView.prototype.onShow = function() {
        Backbone.Syphon.deserialize(this, this.model.get('layers')[0]);
        return this.$el.find('select').selectpicker();
      };

      return TextLayerView;

    })(Marionette.ItemView);
  });
});
