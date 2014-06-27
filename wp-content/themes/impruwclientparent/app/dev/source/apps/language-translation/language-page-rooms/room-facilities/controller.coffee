define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-rooms/room-facilities/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageRooms.RoomFacilities', (RoomFacilities, App, Backbone, Marionette, $, _)->

        class RoomFacilities.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->

                {editLang} = (opts) 

                #get page collection
                @facilityModel = facilityModel = App.request "get:lang:facilities", editLang

                console.log "INSIDE room facilities facilityModel => ",facilityModel

                @roomFacilitiesView = @_getroomFacilitiesView facilityModel

                #function to load view
                @show @roomFacilitiesView,
                    loading: true

            _getroomFacilitiesView : (model)->
                new RoomFacilities.Views.RoomFacilitiesView
                    model: model

        App.commands.setHandler "language:room:facilities:app", (opts) ->
            new RoomFacilities.Controller opts
