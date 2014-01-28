define ["app", 'backbone'], (App, Backbone) ->

        App.module "Entities.Rooms", (Rooms, App, Backbone, Marionette, $, _)->

            class Rooms.Room extends Backbone.RelationalModel

                relations : [(
                                type : Backbone.HasMany
                                key  : 'facilities'
                                relatedModel : 'App.Entities.Facilities.Facility'
                                collectionType : 'App.Entities.Facilities.FacilityCollection'
                            ),
                            (
                                type : Backbone.HasMany
                                key  : 'attachments'
                                relatedModel : 'App.Entities.Media.MediaModel'
                                collectionType : 'App.Entities.Media.MediaCollection'
                            )]

            class Rooms.RoomCollection extends Backbone.Collection



            #PUBLIC API FOR ENtity
            API =
                getRooms: (param ={})->

                    rooms = new Rooms.RoomCollection
                    
                    rooms.url = AJAXURL + '?action=get-rooms'
                    
                    rooms.fetch
                                reset : true
                                data  : param
                                
                    rooms


            #REQUEST HANDLERS
            App.reqres.setHandler "get:room:entities", ->
                API.getRooms()
