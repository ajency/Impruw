define [ 'app'
		 'apps/builder/site-builder/elements/list/views'
		 'apps/builder/site-builder/elements/list/settings/controller' 
],( App )->
	App.module 'SiteBuilderApp.Element.List', ( List, App, Backbone, Marionette, $, _ )->

		# menu controller
		class List.Controller extends App.SiteBuilderApp.Element.Controller

			# intializer
			initialize : ( options )->

				_.defaults options.modelData,
					element : 'List'
					style : ''
					contents : 
						en : [
								data : 'demo'
							,
								data : 'demo'
							,
								data : 'demo'
							,
								data : 'demo'
						]
						nb : [
								data : 'demo'
							,
								data : 'demo'
							,
								data : 'demo'
							,
								data : 'demo'						
						]


				super options

			bindEvents : ->
				# start listening to model events
				@listenTo @layout.model, "change:style ", @renderElement
				super()

			_getListView : ->
				new List.Views.ListView
					model : @layout.model
					collection : @collection

			_generateCollections : ->
				# content collection for current language
				@collection = new Backbone.Collection @layout.model.get('contents')[WPML_DEFAULT_LANG]
				window.WPML_OTHER_LANG = if WPML_DEFAULT_LANG is 'en' then 'nb' else 'en'
					# _.without(Object.getOwnPropertyNames(ACTIVE_LANGUAGES),WPML_DEFAULT_LANG)[0]
				# content collection for other language
				@collectionOther = new Backbone.Collection @layout.model.get('contents')[WPML_OTHER_LANG]

				@listenTo @collection , 'remove',(model,collection,options)=>
					@collectionOther.remove @collectionOther.at options.index
					@view.trigger 'save:list'



			renderElement : ->
				@removeSpinner()

				@_generateCollections()

				@view = @_getListView() 

				@listenTo @view, 'itemview:save:list save:list',->
					data = @layout.model.get('contents')
					data[WPML_DEFAULT_LANG] = @collection.toJSON()
					data[WPML_OTHER_LANG] = @collectionOther.toJSON()
					@layout.model.set 'contents', data
					@layout.model.save()

				@listenTo @view, 'add:new:model:to:collection',->
					data = 
						en :
							data : 'demo'
						nb : 
							data : 'demo'

					@collection.add data[WPML_DEFAULT_LANG]

					@collectionOther.add data[WPML_OTHER_LANG]

					@view.trigger 'save:list'



				@layout.elementRegion.show @view