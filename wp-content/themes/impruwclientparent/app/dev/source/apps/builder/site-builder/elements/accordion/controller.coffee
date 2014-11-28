define ['app'
		'bootbox'
		'apps/builder/site-builder/elements/accordion/views'
		# 'apps/builder/site-builder/elements/accordion/settings/controller'
],(App,bootbox)->
	App.module 'SiteBuilderApp.Element.Accordion',(Accordion,App)->

		class Accordion.Controller extends App.SiteBuilderApp.Element.Controller

			initialize : (options)->

				_.defaults options.modelData,
					element : 'Accordion'
					columncount : 2
					elements : []
					meta_id : 0
					style : 'default'

				super options

			bindEvents : ->
				# @listenTo 
				@listenTo @layout.model, "change:style", @changeStyle
				super()

			changeStyle : ( model )->
				prevStyle = model.previous( 'style' ) ? ''
				newStyle = model.get( 'style' )
				@layout.elementRegion.currentView.triggerMethod "style:changed", _.slugify( newStyle ), _.slugify( prevStyle )
				@layout.setHiddenField 'style', newStyle

			getTabView : ->
				new Accordion.Views.AccordionView
					model : @layout.model

			renderElement : ->
				@removeSpinner()

				@view = @getTabView()

				@layout.elementRegion.show @view

			deleteElement : ( model )->
				isDeletable = true
				@layout.elementRegion.currentView.$el.children('.panel-group').children('.panel').each (index,panel)=>
					if not $(panel).children('.panel-collapse').canBeDeleted()
						isDeletable = false
						return false
				console.log isDeletable
				if not isDeletable
					bootbox.confirm "<h4 class='delete-message'>" + _.polyglot.t( "All elements inside the Accordion will also be deleted. Do you want to continue?" ) + "</h4>", ( answer )->
						if answer is yes
							model.destroy()
							_.delay ->
								App.commands.execute "auto:save"
							, 700
				else
					bootbox.confirm "<h4 class='delete-message'>" + _.polyglot.t( 'Are you sure?' ) + "</h4>", ( result )=>
                     	if result is true
							model.destroy()


