define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-rooms/original-language-rooms/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageRooms.OriginalRooms', (OriginalRooms, App, Backbone, Marionette, $, _)->

        class OriginalRooms.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->             

                {roomId} = opts  

                @language = "en"

                #get page collection
                @pageModel = pageModel = App.request "get:language:page:model", roomId

                @originalContentView = @_getLanguageView pageModel

                #function to load view
                @show @originalContentView,
                    loading: true

            _getLanguageView : (model)->
                new OriginalRooms.Views.OriginalItemView
                    model: model

        App.commands.setHandler "show:original:rooms:app", (opts) ->
            new OriginalRooms.Controller opts
