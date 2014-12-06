define ['app'
		'bootbox'
		'apps/builder/site-builder/elements/tabs/views'
		'apps/builder/site-builder/elements/tabs/settings/controller'
],(App,bootbox)->
	App.module 'SiteBuilderApp.Element.Tabs',(Tabs,App)->

		class Tabs.Controller extends App.SiteBuilderApp.Element.Controller

			initialize : (options)->

				_.defaults options.modelData,
					element : 'Tabs'
					justified: true
					columncount : 2
					elements : []
					meta_id : 0
					style : 'default'

				options.modelData.justified = _.toBoolean options.modelData.justified

				super options

			bindEvents : ->
				# @listenTo 
				@listenTo @layout.model, "change:style", @changeStyle
				@listenTo @layout.model, 'change:justified', @changeJustified
				super()

			changeStyle : ( model )->
				prevStyle = model.previous( 'style' ) ? ''
				newStyle = model.get( 'style' )
				@layout.elementRegion.currentView.triggerMethod "style:changed", _.slugify( newStyle ), _.slugify( prevStyle )
				@layout.setHiddenField 'style', newStyle

			changeJustified : (model , justified)->
				@layout.elementRegion.currentView.triggerMethod 'set:justified', justified
				@layout.setHiddenField 'justified', justified

			getTabView : ->
				new Tabs.Views.TabsView
					model : @layout.model

			renderElement : ->
				@removeSpinner()

				@view = @getTabView()

				@layout.elementRegion.show @view

			deleteElement : ( model )->
				if not @layout.elementRegion.currentView.$el.find('.tab-content').canBeDeleted()

					bootbox.confirm "All elements inside the Tab will also be deleted. Do you want to continue?", ( answer )->
						if answer is yes
							model.destroy()
							_.delay ->
								App.commands.execute "auto:save"
							, 700
				else
					model.destroy()


