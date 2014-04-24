define ["app", 'backbone', 'moment'], (App, Backbone, moment) ->

		App.module "Entities.Revision", (Revision, App, Backbone, Marionette, $, _)->

			# Page Model
			class RevisionModel extends Backbone.Model
				# defaults for 
				defaults :->
					post_title 	: ''

				name: 'revision'

				parse:(resp)->
					data = if resp.code is 'OK' then resp.data else resp
					data.id = parseInt data.id
					data.timestamp = moment(data.datetime).toDate().getTime()
					data.timeago = moment(data.datetime).fromNow()
					data.datetime = moment(data.datetime).format 'D/MM/YYYY h:m:s'
					data


			# Page collection
			class RevisionCollection extends Backbone.Collection

				# model
				model : RevisionModel

				comparator : 'timestamp'

				url : ->
					"#{AJAXURL}?action=fetch-revisions"


			# object to hold all revisions for different pages
			# format:
			# {
			#   pageId : RevisionCollection,
			#   pageId : RevisionCollection
			# }
			revisionsArray = {}

			# PUBLIC API FOR ENitity
			API =
				getPageRevisions:(pageId)->
					revisionsCollection = revisionsArray[pageId] || false

					if not revisionsCollection
						revisionsCollection = new RevisionCollection
						revisionsCollection.fetch
												data : 
													page_id : pageId
						revisionsArray[pageId] = revisionsCollection

					revisionsCollection

				
				getPages: (param = {})->
					pages

				createNewPage:(data = {})->
					page = new Pages.PageModel data
					page

			# REQUEST HANDLERS
			App.reqres.setHandler "get:page:revisions",(pageId)->
				API.getPageRevisions pageId

		