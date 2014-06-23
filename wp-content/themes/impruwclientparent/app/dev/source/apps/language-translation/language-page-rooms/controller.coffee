define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-rooms/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageRooms', (LanguagePageRooms, App, Backbone, Marionette, $, _)->
        class LanguagePageRooms.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @languagePageRoomsView = @_getPageRoomsView()


                #function to load view
                @show @languagePageRoomsView,
                    loading: true

            _getPageRoomsView : ()->
                new LanguagePageRooms.Views.LanguagePageRoomsView


        App.commands.setHandler "show:language:page:rooms:app", (opts) ->
            new LanguagePageRooms.Controller opts