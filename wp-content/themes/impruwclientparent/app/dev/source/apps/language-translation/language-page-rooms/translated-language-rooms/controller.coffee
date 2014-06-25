define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-rooms/translated-language-rooms/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageRooms.TranslatedRooms', (TranslatedRooms, App, Backbone, Marionette, $, _)->

        class TranslatedRooms.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @translatedContentView = @_getLanguageView 

                #function to load view
                @show @originalContentView,
                    loading: true

            _getLanguageView : ->
                new TranslatedRooms.Views.TranslatedItemView

        App.commands.setHandler "show:translated:rooms:app", (opts) ->
            new TranslatedRooms.Controller opts