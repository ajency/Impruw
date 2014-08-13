define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-rooms/original-policy/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageRooms.OriginalPolicy', (OriginalPolicy, App, Backbone, Marionette, $, _)->

        class OriginalPolicy.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->

                {editLang} = (opts) 

                #get site collection
                @siteModel = siteModel = App.request "get:site:model"

                @policyView = @_getPolicyView siteModel

                #function to load view
                @show @policyView,
                    loading: true

            _getPolicyView : (model)->
                new OriginalPolicy.Views.OriginalPolicyView
                    model: model

        App.commands.setHandler "original:room:policy:app", (opts) ->
            new OriginalPolicy.Controller opts
