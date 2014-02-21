define ["app", 'backbone'], (App, Backbone) ->

        App.module "Entities.Media", (Media, App, Backbone, Marionette, $, _)->

            #Media Model
            class Media.MediaModel extends Backbone.AssociatedModel
                idAttribute : 'ID'

                parse:(resp)->
                    return resp.data if resp.code is 'OK'

                    resp


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
                    mediaCollection = App.request "get:collection", 'mediacollection'
                    if not mediaCollection
                        mediaCollection = new Media.MediaCollection
                    
                    if not mediaCollection.fetched()
                        media.fetch()
                             
                    media

                # create a empty collection of media and store it in offline store
                createStoreCollection:->
                    mediaCollection = new Media.MediaCollection
                    App.request "set:collection", 'mediacollection', mediaCollection

                getImageById:(mediaId)->
                    # check if present
                    mediaCollection = App.request "get:collection", 'mediacollection'
                    media = mediaCollection.get parseInt mediaId

                    if _.isUndefined media
                        media = new Media.MediaModel ID : mediaId
                        media.url = "#{AJAXURL}?action=get-media&ID=#{mediaId}" 
                        mediaCollection.add media
                        media.fetch()

                    media


            #REQUEST HANDLERS
             App.commands.setHandler "create:media:store", ->
                API.createStoreCollection()
            
            App.reqres.setHandler "get:media:entities", ->
                API.getMedia()

            App.reqres.setHandler "get:media:by:id",(mediaId)->
                API.getImageById mediaId
