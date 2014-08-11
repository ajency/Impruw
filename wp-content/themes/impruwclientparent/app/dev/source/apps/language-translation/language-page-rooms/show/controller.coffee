define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-rooms/show/view'
        'apps/language-translation/language-page-rooms/original-language-rooms/controller'
        'apps/language-translation/language-page-rooms/translated-language-rooms/controller'
        'apps/language-translation/language-page-rooms/choose-rooms/controller'
        'apps/language-translation/language-page-rooms/choose-plans/controller'
        'apps/language-translation/language-page-rooms/original-room-facilities/controller'
        'apps/language-translation/language-page-rooms/translated-room-facilities/controller'
        'apps/language-translation/language-page-rooms/original-room-dateranges/controller'
        'apps/language-translation/language-page-rooms/translated-room-dateranges/controller'
        'apps/language-translation/language-page-rooms/original-room-plans/controller'
        'apps/language-translation/language-page-rooms/translated-room-plans/controller'
        'apps/language-translation/language-page-rooms/original-policy/controller'
        'apps/language-translation/language-page-rooms/translated-policy/controller'
        ], (App, AppController)->
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

                    App.execute "original:room:dateranges:app",
                        region: @pageLanguageLayout.originalRoomDateranges,
                        editLang : @editingLang 

                    App.execute "translated:room:dateranges:app",
                        region: @pageLanguageLayout.translatedRoomDateranges,
                        editLang : @editingLang

                    App.execute "original:room:policy:app",
                        region: @pageLanguageLayout.originalPolicy,
                        editLang : @editingLang 

                    App.execute "translated:room:policy:app",
                        region: @pageLanguageLayout.translatedPolicy,
                        editLang : @editingLang   

                    App.execute 'choose:plans:app',
                        region: @pageLanguageLayout.choosePlans                                              

                @listenTo @pageLanguageLayout.chooseRooms, "original:room", @_loadOriginalRooms 

                @listenTo @pageLanguageLayout.chooseRooms, "translated:room", @_loadTranslatedRooms 

                @listenTo @pageLanguageLayout.choosePlans, "original:plan", @_loadOriginalPlans 

                @listenTo @pageLanguageLayout.choosePlans, "translated:plan", @_loadTranslatedPlans   
            
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

            _loadOriginalPlans : (selectedPlan) =>
                    App.execute 'show:original:plans:app',
                        region: @pageLanguageLayout.originalPlanContent 
                        planId: selectedPlan
                    return

            _loadTranslatedPlans : (selectedPlan) =>
                    App.execute 'show:translated:plans:app',
                        region: @pageLanguageLayout.translatedPlanContent 
                        planId: selectedPlan
                        editingLang: @editingLang
                    return                     


        App.commands.setHandler "show:language:page:rooms:app", (opts) ->
            new LanguagePageRooms.Controller opts