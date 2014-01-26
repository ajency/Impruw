define ["app", 'backbone'], (App, Backbone) ->

    class Room extends Backbone.Model

    class RoomCollection extends Backbone.Collection

    ##PUBLIC API FOR ENitity
    API =
        getRooms: (action, param ={})->

            rooms = new RoomCollection
            
            rooms.url = AJAXURL + '?action=get-rooms'
            
            rooms.fetch
                        reset : true
                        data  : param
                        
            rooms


    #REQUEST HANDLERS
    App.reqres.setHandler "get:room:entities", ->
        API.getRooms()
