define ['app'
		'text!apps/builder/site-builder/elements/table/templates/table.html'
		'apps/builder/site-builder/elements/table/views'		
		# 'apps/builder/site-builder/elements/table/settings/controller'
],(App,tableTemplate)->
	App.module 'SiteBuilderApp.Element.Table', (Table, App, Backbone, Marionette, $, _)->

		# menu controller
		class Table.Controller extends App.SiteBuilderApp.Element.Controller


			initialize : (options)->
				_.defaults options.modelData,
					element: 'Table'
					content	: tableTemplate
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
					$(html).find('td div, th div').removeAllAttr()
					@layout.model.set 'content', "#{$(html).html()}"
					@layout.model.save() if @layout.model.hasChanged()
				
				@layout.elementRegion.show @view



