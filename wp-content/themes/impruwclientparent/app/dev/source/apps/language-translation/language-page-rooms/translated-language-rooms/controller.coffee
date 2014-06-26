define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-rooms/translated-language-rooms/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageRooms.TranslatedRooms', (TranslatedRooms, App, Backbone, Marionette, $, _)->

        class TranslatedRooms.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->

                {roomId} = opts

                #get page collection
                @pageModel = pageModel = App.request "get:default:room:model", roomId

                @translatedContentView = @_getLanguageView pageModel

                #function to load view
                @show @translatedContentView,
                    loading: true

            _getLanguageView : (model)->
                new TranslatedRooms.Views.TranslatedItemView
                    model:model

        App.commands.setHandler "show:translated:rooms:app", (opts) ->
            new TranslatedRooms.Controller opts