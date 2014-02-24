define ["app", 'backbone'], (App, Backbone) ->

		App.module "Entities.Media", (Media, App, Backbone, Marionette, $, _)->

			#Media Model
			class Media.MediaModel extends Backbone.AssociatedModel
				idAttribute : 'ID'

				parse:(resp)->
					# change sizes to an array
					if resp.code is 'OK'
						return resp.data 

					resp


			#Media collection
			class Media.MediaCollection extends Backbone.Collection

				filters: 
					order           : 'DESC'
					orderby         : 'date'
					paged           : 1
					posts_per_page  : 40
				
				model : Media.MediaModel

				parse:(resp)->
					return resp.data if resp.code is 'OK'
					resp

				
			##PUBLIC API FOR ENitity
			API =
				fetchMedia: (params ={}, reset)->
					
					mediaCollection = App.request "get:collection", 'mediacollection'
					
					if not mediaCollection
						mediaCollection = new Media.MediaCollection
					
					mediaCollection.url = "#{AJAXURL}?action=query_attachments"
					
					_.defaults params,mediaCollection.filters 

					mediaCollection.fetch
									reset : reset
									data  : params
							 
					mediaCollection

				# create a empty collection of media and store it in offline store
				createStoreCollection:->
					mediaCollection = new Media.MediaCollection
					App.request "set:collection", 'mediacollection', mediaCollection

				#get a media 
				getMediaById:(mediaId)->
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
			
			App.reqres.setHandler "fetch:media",(shouldReset = true) ->
				API.fetchMedia shouldReset

			App.reqres.setHandler "get:media:by:id",(mediaId)->
				API.getMediaById mediaId
