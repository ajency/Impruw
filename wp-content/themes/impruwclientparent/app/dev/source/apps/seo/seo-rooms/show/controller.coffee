define ['app', 'controllers/base-controller'
        'apps/seo/seo-rooms/show/view'
        'apps/seo/seo-rooms/choose-rooms-seo/controller'
        'apps/seo/seo-rooms/rooms-seo/controller'
        ], (App, AppController)->
    App.module 'SeoApp.SeoRooms', (SeoRooms, App, Backbone, Marionette, $, _)->
        class SeoRooms.Controller extends AppController

            # initialize controller
            initialize: (opts)->
                {language} = opts

                @language = language

                @roomLayout = @_getRoomLayout()

                #Make page content div visible after the room content app is executed
                $('.aj-imp-widget-content').show()

                #function to load view
                @show @roomLayout,
                    loading: true


                @listenTo @roomLayout, 'show',=>  
                    App.execute 'choose:seo:rooms:app',
                        region: @roomLayout.chooseRooms


                @listenTo @roomLayout.chooseRooms, "seo:room", @_loadSeoRooms  
            
            _getRoomLayout : ->
                    new SeoRooms.Views.SeoRooomsLayout

            _loadSeoRooms : (selectedRoomIndex) =>
                    App.execute 'show:seo:rooms',
                        region: @roomLayout.seoRoomContent 
                        roomId: selectedRoomIndex
                        language: @language
                    return            

        App.commands.setHandler "show:seo:rooms:app", (opts) ->
            new SeoRooms.Controller opts