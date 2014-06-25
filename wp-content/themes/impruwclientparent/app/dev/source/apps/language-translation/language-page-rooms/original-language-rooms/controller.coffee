define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-rooms/original-language-rooms/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageRooms.OriginalRooms', (OriginalRooms, App, Backbone, Marionette, $, _)->

        class OriginalRooms.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @originalContentView = @_getLanguageView 

                #function to load view
                @show @originalContentView,
                    loading: true

            _getLanguageView : ->
                new OriginalRooms.Views.OriginalItemView

        App.commands.setHandler "show:original:rooms:app", (opts) ->
            new OriginalRooms.Controller opts
