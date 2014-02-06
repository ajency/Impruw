define ["app", 'backbone'], (App, Backbone) ->

        App.module "Entities.Rooms", (Rooms, App, Backbone, Marionette, $, _)->

            # Room Model
            class Rooms.RoomModel extends Backbone.RelationalModel

                defaults : ()->
                    post_title      : ''
                    post_content    : ''
                    facilities      : []
                    attachments     : []
                    thumbnail_id    : 0
                    no_of_rooms     : 0
                    tariffs         : []


                relations : [(
                                type : Backbone.HasOne
                                key  : 'thumbnail_id'
                                relatedModel : 'App.Entities.Media.MediaModel'
                                collectionType : 'App.Entities.Media.MediaCollection'
                            )
                            (
                                type : Backbone.HasMany
                                key  : 'facilities'
                                relatedModel : 'App.Entities.Facilities.Facility'
                                collectionType : 'App.Entities.Facilities.FacilityCollection'
                            )
                            (
                                type : Backbone.HasMany
                                key  : 'attachments'
                                relatedModel : 'App.Entities.Media.MediaModel'
                                collectionType : 'App.Entities.Media.MediaCollection'
                            )
                            (
                                type : Backbone.HasMany
                                key  : 'tariffs'
                                relatedModel : 'App.Entities.Tariffs.TariffModel'
                                collectionType : 'App.Entities.Tariffs.TariffCollection'
                            )]

            # Rooms Collection
            class Rooms.RoomCollection extends Backbone.Collection

                model : Rooms.RoomModel

                url :->
                    AJAXURL + '?action=get-rooms'


            # PUBLIC API FOR ENtity
            API =
                getRooms: (param ={})->

                    rooms = new Rooms.RoomCollection
                    
                    rooms.fetch
                                reset : true
                                data  : param
                                
                    rooms


            # REQUEST HANDLERS
            App.reqres.setHandler "get:room:entities", ->
                API.getRooms()
