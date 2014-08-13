define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-rooms/original-room-dateranges/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageRooms.OriginalRoomDateranges', (OriginalRoomDateranges, App, Backbone, Marionette, $, _)->

        class OriginalRoomDateranges.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->

                {editLang} = (opts) 

                #get page collection
                @daterangeCollection = daterangeCollection = App.request "get:daterange:collection", editLang

                @roomDaterangesView = @_getroomDaterangesView daterangeCollection

                #function to load view
                @show @roomDaterangesView,
                    loading: true

            _getroomDaterangesView : (collection)->
                new OriginalRoomDateranges.Views.OriginalRoomDaterangesView
                    collection: collection

        App.commands.setHandler "original:room:dateranges:app", (opts) ->
            new OriginalRoomDateranges.Controller opts
