define [ 'app'
		 'apps/builder/site-builder/elements/smarttable/views'
		 'apps/builder/site-builder/elements/smarttable/settings/controller' 
],( App )->
	App.module 'SiteBuilderApp.Element.SmartTable', ( SmartTable, App, Backbone, Marionette, $, _ )->

		# menu controller
		class SmartTable.Controller extends App.SiteBuilderApp.Element.Controller

			# intializer
			initialize : ( options )->

				_.defaults options.modelData,
					element : 'SmartTable'
					style : 'Testimonials'
					innerStyle : 'Default'
					contents : 
						en : [
								dt: 'Fried Spring Rolls'			
								dd: 'chicken or vegetable'
								em: '$2.95'
							,
								dt : 'Gai of Nuur Satay'			
								dd : 'skewered chicken or beef with a peanut sauce'
								em : '$4.95'							
						]
						nb : [
								dt: 'Fried Spring Rolls_N'			
								dd: 'chicken or vegetable_N'
								em: '$2.95'
							,
								dt : 'Gai of Nuur Satay_N'			
								dd : 'skewered chicken or beef with a peanut sauce_N'
								em : '$4.95'							
						]


				super options

			bindEvents : ->
				# start listening to model events
				@listenTo @layout.model, "change:style change:innerStyle", @renderElement
				super()

			_getSmartTableView : ( model, template )->
				new SmartTable.Views.TableView
					model : model
					# template : template
					collection : @collection

			_generateCollections : ->
				# content collection for current language
				@collection = new Backbone.Collection @layout.model.get('contents')['en']

				# content collection for other language
				@collectionOther = new Backbone.Collection @layout.model.get('contents')['nb']

				@listenTo @collection , 'remove',(model,collection,options)=>
					@collectionOther.remove @collectionOther.at options.index
					@view.trigger 'save:smart:table'



			renderElement : ->
				@removeSpinner()

				@_generateCollections()
				# template = @_getElementTemplate @layout.model
				@view = @_getSmartTableView @layout.model #, template

				@listenTo @view, 'itemview:save:smart:table save:smart:table',->
					data = @layout.model.get('contents')
					data['en'] = @collection.toJSON()
					data['nb'] = @collectionOther.toJSON()
					@layout.model.set 'contents', data
					@layout.model.save()

				@listenTo @view, 'add:new:model:to:collection',->
					data = 
						en :
							dt : 'New Title'
							dd : 'New description'
							em : 'demo'
						nb : 
							dt : 'New Title_N'
							dd : 'New description_N'
							em : 'demo_N'

					@collection.add data['en']

					@collectionOther.add data['nb']

					@view.trigger 'save:smart:table'



				@layout.elementRegion.show @view