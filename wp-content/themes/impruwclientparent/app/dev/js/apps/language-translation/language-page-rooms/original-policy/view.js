var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageRooms.OriginalPolicy.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.OriginalPolicyView = (function(_super) {
      __extends(OriginalPolicyView, _super);

      function OriginalPolicyView() {
        return OriginalPolicyView.__super__.constructor.apply(this, arguments);
      }

      OriginalPolicyView.prototype.tagName = 'div';

      OriginalPolicyView.prototype.className = 'col-sm-7';

      OriginalPolicyView.prototype.template = '<div class="form-group"> <label class="col-sm-3 control-label label-head" for="">{{#polyglot}}Additional Policy{{/polyglot}}</label> <div class="col-sm-9 col-sm-offset-3"> <div class="original title">{{additional_policy}} </div> </div> </div>';

      return OriginalPolicyView;

    })(Marionette.ItemView);
  });
});
