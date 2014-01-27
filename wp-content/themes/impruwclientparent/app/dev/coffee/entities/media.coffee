define ["app", 'backbone'], (App, Backbone) ->

        App.module "Entities.Media", (Media, App)->

            class Media.MediaModel extends Backbone.RelationalModel


            class Media.MediaCollection extends Backbone.Collection

                

            ##PUBLIC API FOR ENitity
            API =
                getMedia: (param ={})->

                    media = new Media.MediaCollection
                    
                    media.url = AJAXURL + '?action=get-media'
                    
                    media.fetch
                                reset : true
                                data  : param
                                
                    media


            #REQUEST HANDLERS
            App.reqres.setHandler "get:media:entities", ->
                API.getMedia()
