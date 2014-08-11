var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageRooms.TranslatedPolicy.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.TranslatedPolicyView = (function(_super) {
      __extends(TranslatedPolicyView, _super);

      function TranslatedPolicyView() {
        return TranslatedPolicyView.__super__.constructor.apply(this, arguments);
      }

      TranslatedPolicyView.prototype.tagName = 'div';

      TranslatedPolicyView.prototype.className = 'col-sm-5';

      TranslatedPolicyView.prototype.template = '<form class="form-horizontal edit_additional_policy"> <div class="form-group"> <div class="col-sm-12"> <input type="text" placeholder="{{#polyglot}}Add Translation{{/polyglot}}"  class="form-control" value ="{{additional_policy}}" data-siteoption= "additional-policy"> </div> </div> </form> <div> <button class="btn btn-xs aj-imp-orange-btn" name="btn_update-additional_policy" id="btn_update-additional_policy"> Update </button> </div>';

      TranslatedPolicyView.prototype.events = {
        "click #btn_update-additional_policy": "updatePolicy"
      };

      TranslatedPolicyView.prototype.updatePolicy = function(e) {
        var siteTranslation;
        e.preventDefault();
        siteTranslation = [];
        this.$el.find("input").each(function() {
          siteTranslation.push({
            translated_option: $(this).val(),
            translation_of_option: $(this).attr("data-siteoption")
          });
        });
        return this.trigger('update:translated:policy', siteTranslation);
      };

      TranslatedPolicyView.prototype.onPolicyUpdated = function() {
        this.$el.find('.alert').remove();
        this.$el.append('<div class="alert alert-success">' + _.polyglot.t('Policy translation updated successfully') + '</div>');
        return this.$el.find('.alert').fadeOut(5000);
      };

      return TranslatedPolicyView;

    })(Marionette.ItemView);
  });
});
