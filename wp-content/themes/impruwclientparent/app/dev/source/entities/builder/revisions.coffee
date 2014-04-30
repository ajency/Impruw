define ["app", 'backbone', 'moment'], (App, Backbone, moment) ->

		App.module "Entities.Revision", (Revision, App, Backbone, Marionette, $, _)->

			# Page Model
			class RevisionModel extends Backbone.Model
				
				idAttribute : 'ID'

				# defaults for 
				defaults :->
					post_title 	: ''

				name: 'revision'

				parse:(resp)->
					data = if resp.code is 'OK' then resp.data else resp
					data


			# Page collection
			class RevisionCollection extends Backbone.Collection

				# model
				model : RevisionModel

				comparator : (model)->
					- model.get 'ID'

				url : ->
					"#{AJAXURL}?action=fetch-revisions"

				parse:(resp)->
					data = if resp.code is 'OK' then resp.data else resp
					data


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

				addNewRevision:(pageId, revisionData)->
					revision = new RevisionModel revisionData

					# add to revision collection
					revisionsCollection = revisionsArray[pageId] || false
					if not revisionsCollection
						revisionsCollection = new RevisionCollection
						revisionsArray[pageId] = revisionsCollection

					revisionsCollection.add revision

				
				getPages: (param = {})->
					pages

				createNewPage:(data = {})->
					page = new Pages.PageModel data
					page

			# REQUEST HANDLERS
			App.reqres.setHandler "get:page:revisions",(pageId)->
				API.getPageRevisions pageId

			App.commands.setHandler "revision:added",(pageId, revisionData)->
				API.addNewRevision pageId, revisionData

		