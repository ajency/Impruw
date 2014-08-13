define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-rooms/choose-rooms/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageRooms.ChooseRooms', (ChooseRooms, App, Backbone, Marionette, $, _)->

        class ChooseRooms.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                #rooom collection
                @collection = collection = App.request "get:room:entities"

                @ChooseRoomsView = @_getLanguageView collection

                @listenTo @ChooseRoomsView, "load:original:rooms", @loadOriginalRooms
                @listenTo @ChooseRoomsView, "load:translated:rooms", @loadTranslatedRooms

                #function to load view
                @show @ChooseRoomsView,
                    loading: true

            _getLanguageView : (collection) ->
                if collection.length==0
                   new ChooseRooms.Views.EmptyView
                    collection:collection 
                else
                    new ChooseRooms.Views.ChooseRoomsView
                     collection:collection

            loadOriginalRooms: (selectedRoomId) ->
                Marionette.triggerMethod.call @region, "original:room", selectedRoomId
            
            loadTranslatedRooms: (selectedRoomId) ->
                Marionette.triggerMethod.call @region, "translated:room", selectedRoomId


        App.commands.setHandler "choose:rooms:app", (opts) ->
            new ChooseRooms.Controller opts