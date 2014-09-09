var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('Media.EditMedia.Views', function(Views, App) {
    return Views.EditMediaView = (function(_super) {
      __extends(EditMediaView, _super);

      function EditMediaView() {
        return EditMediaView.__super__.constructor.apply(this, arguments);
      }

      EditMediaView.prototype.template = '<form action="" method="POST" role="form"> <!--<h5>{{#polyglot}}Media{{/polyglot}}</h5>--> <div class="form-group"> <!--<label for="">{{#polyglot}}Title{{/polyglot}}</label>--> <label for="">{{#polyglot}}Image Name{{/polyglot}}</label> <input type="text" placeholder="" name="title" value="{{title}}" class="form-control" readonly ="readonly"/> </div> <!--<div class="form-group">--> <!--<label for="">{{#polyglot}}Caption{{/polyglot}}</label>--> <!--<input type="text" placeholder="" name="caption" value="{{caption}}" class="form-control"/>--> <!--</div>--> <!--<div class="form-group">--> <!--<label for="">{{#polyglot}}Alt Text{{/polyglot}}</label>--> <!--<input type="text" placeholder="" name="alt" value="{{alt}}" class="form-control"/>--> <!--</div>--> <!--<div class="form-group">--> <!--<label for="">{{#polyglot}}Description{{/polyglot}}</label>--> <!--<input type="text" placeholder="" name="description" value="{{description}}" class="form-control"/>--> <!--</div>--> <!--<button type="button" id="save-media-details" class="btn btn-sm aj-imp-orange-btn">{{#polyglot}}Save{{/polyglot}}</button>--> </form>';

      EditMediaView.prototype.events = {
        'click #save-media-details': '_updateImageData'
      };

      EditMediaView.prototype._updateImageData = function() {
        var data;
        data = Backbone.Syphon.serialize(this);
        return this.trigger('update:image:data', data);
      };

      return EditMediaView;

    })(Marionette.ItemView);
  });
});
