define ['app'
		'text!apps/builder/site-builder/elements/table/templates/table.html'
		'apps/builder/site-builder/elements/table/views'		
		'apps/builder/site-builder/elements/table/settings/controller'
],(App,tableTemplate, tableTemplateNb)->
	App.module 'SiteBuilderApp.Element.Table', (Table, App, Backbone, Marionette, $, _)->

		# menu controller
		class Table.Controller extends App.SiteBuilderApp.Element.Controller

			initialize : (options)->
				_.defaults options.modelData,
					element: 'Table'
					content	: 
						'en' : tableTemplate
						'nb' : tableTemplate
					row : 3
					column : 3

				super(options)

			bindEvents: ->
				# start listening to model events
				#@listenTo @layout.model, "change:content", @renderElement
				super()

			_getTableView: ->
				new Table.Views.TableView
					model: @layout.model
					# collection : @rowCollection

			# setup templates for the element
			renderElement: ()=>
				@removeSpinner()
				# @rowCollection = new Backbone.Collection

				# @rowCollection.set @layout.model.get('content')['data']

				# console.log @rowCollection
				@view = @_getTableView()

				# listen to "text:element:blur" event
				# this will pass the current html for the text element.
				# set it to the model. If it is a different markup it will
				# change the model changed property to true
				# save the new markup if the model is changed
				@listenTo @view, "save:table", (tableHolder) =>
					html = $(tableHolder).clone()
					$(html).find('.rc-handle-container').remove()
					$(html).find('.ui-resizable-handle').remove()
					$(html).find('td div, th div').removeAllAttr()

					original_data =  @layout.model.get('content')

					if _.isObject original_data
	                  	data = original_data
	               	else
	                  	data = {}
	                  	data['en'] = original_data

	                data[WPML_DEFAULT_LANG] = $(html).html()

	                # stripslash each html content and save in json
	                newdata = {}
	                Object.getOwnPropertyNames(data).forEach (val, idx, array) ->
	                	newdata[val] = _.stripslashes data[WPML_DEFAULT_LANG]

	                @layout.model.set 'content', newdata
	                @layout.model.save()
				
				@layout.elementRegion.show @view



