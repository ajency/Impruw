define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-rooms/translated-language-rooms/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageRooms.TranslatedRooms', (TranslatedRooms, App, Backbone, Marionette, $, _)->

        class TranslatedRooms.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->

                @roomId = roomId= opts.roomId
                @editingLang = editingLang =  opts.editingLang

                #get room model
                @roomModel = roomModel = App.request "get:translated:room:model", roomId , editingLang

                @translatedContentView = @_getLanguageView roomModel

                @listenTo @translatedContentView, "translated:room:updated", @updateTranslatedRoom

                #function to load view
                @show @translatedContentView,
                    loading: true

            _getLanguageView : (model)->
                new TranslatedRooms.Views.TranslatedItemView
                    model:model

            updateTranslatedRoom : (newRoomTitle, newRoomDesc, roomId)->
                data= []
                data['translatedRoomTitle'] = newRoomTitle
                data['translatedRoomDesc'] = newRoomDesc
                data['translatedPostID'] = roomId
                @roomModel.set data
                # AJAX 
                $.post "#{AJAXURL}?action=update-translated-room",
                    (
                        room_title : newRoomTitle
                        room_desc : newRoomDesc
                        room_id : roomId
                    ), @roomUpdated, 'json'

            roomUpdated:(response) =>
                @translatedContentView.triggerMethod "room:data:updated"    


        App.commands.setHandler "show:translated:rooms:app", (opts = {}) ->
            new TranslatedRooms.Controller opts