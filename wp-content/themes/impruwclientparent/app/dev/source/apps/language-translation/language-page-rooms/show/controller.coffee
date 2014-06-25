define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-rooms/show/view'
        'apps/language-translation/language-page-rooms/original-language-rooms/controller'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageRooms', (LanguagePageRooms, App, Backbone, Marionette, $, _)->
        class LanguagePageRooms.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @pageLanguageLayout = @_getLanguageLayout()

                #function to load view
                @show @pageLanguageLayout,
                    loading: true


                @listenTo @pageLanguageLayout, 'show',=>      
                    App.execute 'show:original:rooms:app',
                        region: @pageLanguageLayout.originalRoomContent  

                   App.execute 'show:translated:rooms:app',
                        region: @pageLanguageLayout.translatedRoomContent 

            _getLanguageLayout : ->
                    new LanguagePageRooms.Views.PageRooomsLayout              

        App.commands.setHandler "show:language:page:rooms:app", (opts) ->
            new LanguagePageRooms.Controller opts