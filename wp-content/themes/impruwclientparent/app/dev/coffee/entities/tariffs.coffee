define ["app", 'backbone'], (App, Backbone) ->

        App.module "Entities.Tariffs", (Tariffs, App, Backbone, Marionette, $, _)->

            # Tariff model
            class Tariffs.TariffModel extends Backbone.RelationalModel

                defaults : ()->
                    weekdays    : 
                        tariff_amount : 0
                    weekends    : 
                        tariff_amount : 0

                relations : [(
                                type : Backbone.HasOne
                                key  : 'room'
                                relatedModel : 'App.Tariffs.Media.MediaModel'
                                collectionType : 'App.Tariffs.Media.MediaCollection'
                            )]

            # Tariff Collection
            class Tariffs.TariffCollection extends Backbone.Collection

                model : Tariffs.TariffModel

                url :(models = []) ->

                    if models.length is 0 
                        "#{AJAXURL}?action=get-tariffs"
                    else
                        ids = []
                        ids.push tariff.get('id') for tariff in models
                        ids = ids.join()
                        "#{AJAXURL}?action=get-tariffs&ids=#{ids}"


            #PUBLIC API FOR ENtity
            API =
                getTariffs: (param ={})->

                    rooms = new Tariffs.TariffCollection
                    
                    rooms.fetch
                                reset : true
                                data  : param
                                
                    rooms


            #REQUEST HANDLERS
            App.reqres.setHandler "get:tariffs:entities", ->
                API.getTariffs()
