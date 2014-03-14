define ["app", 'backbone'], (App, Backbone) ->

        App.module "Entities.Rooms", (Rooms, App, Backbone, Marionette, $, _)->

            # Room Model
            class Rooms.RoomModel extends Backbone.AssociatedModel

                defaults : ()->
                    post_title      : ''
                    post_content    : ''
                    facilities      : []
                    slider_id       : 0
                    thumbnail_id    : 0
                    no_of_rooms     : 0
                    tariffs         : []

                name : 'room'


            # Rooms Collection
            class Rooms.RoomCollection extends Backbone.Collection

                model : Rooms.RoomModel

                url :->
                    "#{AJAXURL}?action=create-room"
                    #AJAXURL + '?action=get-rooms'

            # PUBLIC API FOR ENtity
            API =
                getRooms: (param ={})->

                    rooms = new Rooms.RoomCollection
                    
                    rooms.fetch
                            reset : true
                            data  : param
                                
                    rooms

                createNewRoomModel:(data = {})->

                    room = new Rooms.RoomModel data

                    room


            # REQUEST HANDLERS
            App.reqres.setHandler "get:room:entities", ->
                API.getRooms()

            App.reqres.setHandler "create:new:room:model", (data)->
                API.createNewRoomModel data
