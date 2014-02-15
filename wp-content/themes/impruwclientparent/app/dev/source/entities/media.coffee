define ["app", 'backbone'], (App, Backbone) ->

        App.module "Entities.Media", (Media, App, Backbone, Marionette, $, _)->

            #Media Model
            class Media.MediaModel extends Backbone.AssociatedModel

            #Media collection
            class Media.MediaCollection extends Backbone.Collection
                
                model : Media.MediaModel

                url :(models = []) ->

                    if models.length is 0 
                        "#{AJAXURL}?action=media"
                    else
                        ids = []
                        ids.push media.get('ID') for media in models
                        ids = ids.join()
                        "#{AJAXURL}?action=media&ids=#{ids}"

                
            ##PUBLIC API FOR ENitity
            API =
                getMedia: (param ={})->

                    media = new Media.MediaCollection
                    
                    media.fetch
                                reset : true
                                data  : param
                                
                    media


            #REQUEST HANDLERS
            App.reqres.setHandler "get:media:entities", ->
                API.getMedia()
