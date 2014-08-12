define ['app'], (App)->

    App.module 'LanguageApp.LanguagePageRooms.OriginalPolicy.Views', (Views, App, Backbone, Marionette, $, _)->

        class Views.OriginalPolicyView extends Marionette.ItemView

            tagName : 'div'

            className : 'col-sm-7'

            template : '<div class="form-group">
                   <label class="col-sm-3 control-label label-head" for="">{{#polyglot}}Additional Policy{{/polyglot}}</label>
                       <div class="col-sm-9 col-sm-offset-3">
                          <p class="original title">{{additional_policy}}
                              </p>
                              </div>
                              </div>'
