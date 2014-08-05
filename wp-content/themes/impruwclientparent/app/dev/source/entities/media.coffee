define ["app", 'backbone'], ( App, Backbone ) ->
   App.module "Entities.Media", ( Media, App, Backbone, Marionette, $, _ )->

      #Media Model
      class Media.MediaModel extends Backbone.Model
         idAttribute : 'id'

         name : 'media'

         # function to calculate the best fit for the given size
         getBestFit : ( width )->
            sizes = @get 'sizes'

            closest = null
            # get closest size
            smallest = 99999
            _.each sizes, ( size, key )->
               val = size.width - width
               val = if val < 0 then (-1 * val) else val
               if val <= smallest
                  closest =
                     url : size.url
                     size : key
                  smallest = val

            closest = sizes['full'] if _.isNull closest

            closest

      window.Media = Media.MediaModel
      #Media collection
      class Media.MediaCollection extends Backbone.Collection

         initialize : (options = {})->
            
            @perPage = 6

            @totalMedia = 0

            @filters = 
               order : 'DESC'
               orderby : 'date'
               paged : 1
               posts_per_page : @perPage

         model : Media.MediaModel

         fetch : (options = {})->
            
            if @models.length is 0
               paged = 1
            else
               paged = ( Math.floor @models.length / @perPage ) + 1
               
            @filters = 
               order : 'DESC'
               orderby : 'date'
               paged : paged
               posts_per_page : @perPage

            options.add  = true
            options.remove  = false
            options.data = @filters
            xhr = super options
            xhr.done (response)=>
               @totalMedia = response.total

            xhr

         url : ->
            "#{AJAXURL}?action=query_attachments"

         parse : ( resp )->
            return resp.data if resp.code is 'OK'
            resp


      # intiate the collection
      mediaCollection = new Media.MediaCollection


      ##PUBLIC API FOR ENitity
      API =
         fetchMedia : ( params = {}, reset )->
            
            Media.MediaCollection

      #get a media
         getMediaById : ( mediaId )->
            return API.getPlaceHolderMedia() if 0 is parseInt mediaId

            media = mediaCollection.get parseInt mediaId

            if _.isUndefined media
               media = new Media.MediaModel id : mediaId
               mediaCollection.add media
               media.fetch()

            media

         getEmptyMediaCollection : ->
            new Media.MediaCollection

      # this fucntion will return a placeholder media for the requesting element
      # this will be special purpose media model.
         getPlaceHolderMedia : ->
            media = new Media.MediaModel
            media

         createNewMedia : ( data )->
            media = new Media.MediaModel data
            mediaCollection.add media
            media


      #REQUEST HANDLERS
      App.reqres.setHandler "get:empty:media:collection", ->
         API.getEmptyMediaCollection()

      App.reqres.setHandler "fetch:media", ( shouldReset = true ) ->
         API.fetchMedia shouldReset

      App.reqres.setHandler "get:media:by:id", ( mediaId )->
         API.getMediaById mediaId

      App.commands.setHandler "new:media:added", ( modelData )->
         API.createNewMedia modelData
