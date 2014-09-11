define ['app', 'controllers/base-controller'
        'apps/seo/seo-rooms/choose-rooms-seo/view'], (App, AppController)->
    App.module 'SeoApp.SeoRooms.ChooseSeoRooms', (ChooseSeoRooms, App, Backbone, Marionette, $, _)->

        class ChooseSeoRooms.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                #rooom collection
                @collection = collection = App.request "get:room:entities"

                @ChooseRoomsView = @_getRoomView collection

                @listenTo @ChooseRoomsView, "load:rooms", @loadRooms

                #function to load view
                @show @ChooseRoomsView,
                    loading: true

            _getRoomView : (collection) ->
                if collection.length==0
                   new ChooseSeoRooms.Views.EmptyView
                    collection:collection 
                else
                    new ChooseSeoRooms.Views.ChooseRoomsView
                     collection:collection

            loadRooms: (selectedRoomId) ->
                Marionette.triggerMethod.call @region, "seo:room", selectedRoomId


        App.commands.setHandler "choose:seo:rooms:app", (opts) ->
            new ChooseSeoRooms.Controller opts