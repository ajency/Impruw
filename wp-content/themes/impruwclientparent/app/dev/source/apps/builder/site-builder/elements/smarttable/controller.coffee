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
								dt: 'demo'
								dd: 'demo'
								em: 'demo'
							,
								dt: 'demo'
								dd: 'demo'
								em: 'demo'						
						]
						nb : [
								dt: 'demo'
								dd: 'demo'
								em: 'demo'
							,
								dt: 'demo'
								dd: 'demo'
								em: 'demo'							
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
				@collection = new Backbone.Collection @layout.model.get('contents')[WPML_DEFAULT_LANG]
				window.WPML_OTHER_LANG =  _.without(Object.getOwnPropertyNames(ACTIVE_LANGUAGES),WPML_DEFAULT_LANG)[0]
				# content collection for other language
				@collectionOther = new Backbone.Collection @layout.model.get('contents')[WPML_OTHER_LANG]

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
					data[WPML_DEFAULT_LANG] = @collection.toJSON()
					data[WPML_OTHER_LANG] = @collectionOther.toJSON()
					
					# Backslashes fix
					_.each data, (value, key) ->
                    	_.each value, (val1, key1) ->
                        	_.each val1, (val2, key2) ->
                            data[key][key1][key2] = _.stripslashes val2

					@layout.model.set 'contents', data
					@layout.model.save()

				@listenTo @view, 'add:new:model:to:collection',->
					data = 
						en :
							dt: 'demo'
							dd: 'demo'
							em: 'demo'
						nb : 
							dt: 'demo'
							dd: 'demo'
							em: 'demo'

					@collection.add data[WPML_DEFAULT_LANG]

					@collectionOther.add data[WPML_OTHER_LANG]

					@view.trigger 'save:smart:table'



				@layout.elementRegion.show @view