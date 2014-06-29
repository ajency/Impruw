define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-rooms/original-room-facilities/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageRooms.OriginalRoomFacilities', (OriginalRoomFacilities, App, Backbone, Marionette, $, _)->

        class OriginalRoomFacilities.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->

                {editLang} = (opts) 

                #get page collection
                @facilityCollection = facilityCollection = App.request "get:default:facilities", editLang

                @roomFacilitiesView = @_getroomFacilitiesView facilityCollection

                #function to load view
                @show @roomFacilitiesView,
                    loading: true

            _getroomFacilitiesView : (collection)->
                new OriginalRoomFacilities.Views.OriginalRoomFacilitiesView
                    collection: collection

        App.commands.setHandler "original:room:facilities:app", (opts) ->
            new OriginalRoomFacilities.Controller opts
