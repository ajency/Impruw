define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-rooms/room-facilities/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageRooms.RoomFacilities', (RoomFacilities, App, Backbone, Marionette, $, _)->

        class RoomFacilities.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->

                {editLang} = (opts) 

                #get page collection
                @facilityCollection = facilityCollection = App.request "get:all:facilities", editLang

                console.log "INSIDE room facilities facilityModel => ",facilityCollection,"editLang "+editLang

                @roomFacilitiesView = @_getroomFacilitiesView facilityCollection

                #function to load view
                @show @roomFacilitiesView,
                    loading: true

            _getroomFacilitiesView : (collection)->
                new RoomFacilities.Views.RoomFacilitiesView
                    collection: collection

        App.commands.setHandler "language:room:facilities:app", (opts) ->
            new RoomFacilities.Controller opts
