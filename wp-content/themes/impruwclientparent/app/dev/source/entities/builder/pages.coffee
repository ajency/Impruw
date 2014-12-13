define [ "app", 'backbone' ], ( App, Backbone ) ->
	App.module "Entities.Pages", ( Pages, App, Backbone, Marionette, $, _ )->

		# Page Model
		class Pages.PageModel extends Backbone.Model

			# defaults for
			# defaults : ->
			# 	post_title : ''

			name : 'page'

			idAttribute : 'ID'

			destroy : (options) ->
				options = (if options then _.clone(options) else {})
				model = this
				success = options.success
				destroy = ->
					model.trigger "destroy", model, model.collection, options
					return

				options.success = (resp) ->
					destroy()  if options.wait or model.isNew()
					success model, resp, options  if success
					model.trigger "sync", model, resp, options  unless model.isNew()
					return

				if @isNew()
					options.success()
					return false
				# wrapError this, options
				# xhr = @sync("delete", this, options)
				params = 
					type : "POST"
					dataType: "json"
					url : AJAXURL
					data : 
						action : 'impruw-delete-page'
						page_id : model.id
				xhr = options.xhr = Backbone.ajax(_.extend(params, options))
				destroy()  unless options.wait
				xhr
			


		# Page collection
		class Pages.PageCollection extends Backbone.Collection

			# model
			model : Pages.PageModel

			url : ->
				"#{AJAXURL}?action=get-pages"

			parse : ( resp )->
				return resp.data if resp.code is 'OK'
				resp

		pages = new Pages.PageCollection
		pages.fetch
			reset : true

		# PUBLIC API FOR ENitity
		API =
			getPagesCollection : ->
				new Pages.PageCollection

			getPages : ->
				pages

			createNewPage : ( data = {} )->
				page = new Pages.PageModel data
				page

			getPageModelById : ( pageId )->
				pageModel = new Pages.PageModel 'ID' : parseInt pageId
				pageModel.fetch
					data :
						'ID' : pageId
						'action' : 'read-page'
				pageModel

		# REQUEST HANDLERS
		App.reqres.setHandler "get:editable:pages", ->
			API.getPages()

		App.reqres.setHandler "get:fetched:page", (id)->
			page = pages.get id
			page

		App.commands.setHandler 'add:page:to:collection',(model)->
			pages.add model , {merge: true}


		App.reqres.setHandler "create:page:model", ( data )->
			API.createNewPage data

		App.reqres.setHandler "get:page:model:by:id", ( pageId )->
			API.getPageModelById pageId

		App.reqres.setHandler "get:pages:collection", ->
			API.getPagesCollection()
