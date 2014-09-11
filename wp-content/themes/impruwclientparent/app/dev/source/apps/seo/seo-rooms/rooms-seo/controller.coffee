define ['app', 'controllers/base-controller'
        'apps/seo/seo-rooms/rooms-seo/view'], (App, AppController)->
    App.module 'SeoApp.SeoRooms.Rooms', (Rooms, App, Backbone, Marionette, $, _)->

        class Rooms.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->

                @roomId = roomId= opts.roomId
                @language = language =  opts.language

                @roomModel = App.request "get:translated:room:model", roomId , language

                App.execute "when:fetched", @roomModel, =>
                    @translatedRoomId = @roomModel.get('translatedPostID')
                    @roomSeoModel =  App.request "get:seo:model", @translatedRoomId
                    @roomContentView = @_getRoomView @roomSeoModel
                
                    @listenTo @roomContentView, "room:seo:save", @roomSeoSave

                    #function to load view
                    @show @roomContentView,
                        loading: true
                

            _getRoomView : (model)->
                new Rooms.Views.RoomContentItemView
                    model:model

            roomSeoSave:(newSeoTitle ,newSeoDesc, newSeoKeywords)->
                data= []
                data['seo_title'] = newSeoTitle
                data['meta_description'] = newSeoDesc
                data['meta_keywords'] = newSeoKeywords
                @roomSeoModel.set data
                @roomSeoModel.save null,
                    wait : true
                    onlyChanged : true
                    success : @pageSeoUpdated

            pageSeoUpdated :(model, response) =>
                @seoPageContentView.triggerMethod "room:seo:updated"   


        App.commands.setHandler "show:seo:rooms", (opts = {}) ->
            new Rooms.Controller opts