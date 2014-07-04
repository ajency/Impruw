define ["app", 'backbone'], (App, Backbone) ->
    App.module "Entities.Rooms", (Rooms, App, Backbone, Marionette, $, _)->

        # Room Model
        class Rooms.RoomModel extends Backbone.Model

            idAttribute: 'ID'

            defaults: ()->
                post_title: ''
                post_content: ''
                post_status: 'auto-draft'
                facilities: []
                slider_id: 0
                image_url: 'http://placehold.it/100x150'
                no_of_rooms: 0
                tariffs: []

            name: 'room'


        # Rooms Collection
        class Rooms.RoomCollection extends Backbone.Collection

            model: Rooms.RoomModel

            url: ->
                "#{AJAXURL}?action=get-rooms"
        #AJAXURL + '?action=get-rooms'


        rooms = new Rooms.RoomCollection
        rooms.fetch()

        # PUBLIC API FOR ENtity
        API =

            getRooms: (param = {})->
                rooms

            createNewRoomModel: (data = {})->
                room = new Rooms.RoomModel data
                room.save()
                room

            getRoomModel: (room_id) ->

                # check if model exists in collection
                room = rooms.get parseInt room_id

                if not room
                    room = new Rooms.RoomModel ID: parseInt room_id
                    room.fetch()
                    rooms.add room
                #console.log room
                room

            getDefaultRoomModel: (room_id) ->
                roomModel = new Rooms.RoomModel
                roomModel.fetch
                    data:
                        action: "read-language-room"
                        roomId : room_id
                roomModel            

            getTranslatedRoomModel: (room_id,editing_lang) ->
                roomModel = new Rooms.RoomModel
                roomModel.fetch
                    data:
                        action: "read-translated-room"
                        roomId : room_id
                        editingLang: editing_lang
                roomModel

            addRoomModelToCollection: (model)->
                rooms.add model


        # REQUEST HANDLERS
        App.reqres.setHandler "get:room:entities", ->
            API.getRooms()

        App.reqres.setHandler "create:new:room:model", (data)->
            API.createNewRoomModel data

        App.reqres.setHandler "get:room:model", (room_id) ->
            console.log "Get room model"
            API.getRoomModel room_id

        App.reqres.setHandler "get:default:room:model", (room_id) ->
            API.getDefaultRoomModel room_id        

        App.reqres.setHandler "get:translated:room:model", (room_id, editing_lang) ->
            API.getTranslatedRoomModel room_id, editing_lang

        App.commands.setHandler "add:room:model", (model)->
            return false if not _.isObject model
            API.addRoomModelToCollection model




