define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-rooms/show/view'
        'apps/language-translation/language-page-rooms/original-language-rooms/controller'
        'apps/language-translation/language-page-rooms/translated-language-rooms/controller'
        'apps/language-translation/language-page-rooms/choose-rooms/controller'
        'apps/language-translation/language-page-rooms/original-room-facilities/controller'
        'apps/language-translation/language-page-rooms/translated-room-facilities/controller'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageRooms', (LanguagePageRooms, App, Backbone, Marionette, $, _)->
        class LanguagePageRooms.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                {editLang} = opts

                @editingLang = editLang

                @pageLanguageLayout = @_getLanguageLayout()

                #Make page content div visible after the room content app is executed
                $('.aj-imp-widget-content').show()

                #function to load view
                @show @pageLanguageLayout,
                    loading: true


                @listenTo @pageLanguageLayout, 'show',=>  
                    App.execute 'choose:rooms:app',
                        region: @pageLanguageLayout.chooseRooms


                    App.execute "original:room:facilities:app",
                        region: @pageLanguageLayout.originalRoomFacilities,
                        editLang : @editingLang 

                    App.execute "translated:room:facilities:app",
                        region: @pageLanguageLayout.translatedRoomFacilities,
                        editLang : @editingLang                                                

                @listenTo @pageLanguageLayout.chooseRooms, "original:room", @_loadOriginalRooms 

                @listenTo @pageLanguageLayout.chooseRooms, "translated:room", @_loadTranslatedRooms   
            
            _getLanguageLayout : ->
                    new LanguagePageRooms.Views.PageRooomsLayout

            _loadOriginalRooms : (selectedRoomIndex) =>
                    App.execute 'show:original:rooms:app',
                        region: @pageLanguageLayout.originalRoomContent 
                        roomId: selectedRoomIndex
                    return            

            _loadTranslatedRooms : (selectedRoomIndex) =>
                    App.execute 'show:translated:rooms:app',
                        region: @pageLanguageLayout.translatedRoomContent 
                        roomId: selectedRoomIndex
                        editingLang: @editingLang
                    return


        App.commands.setHandler "show:language:page:rooms:app", (opts) ->
            new LanguagePageRooms.Controller opts