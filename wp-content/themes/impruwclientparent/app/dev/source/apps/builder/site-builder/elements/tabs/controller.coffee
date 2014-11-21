define ['app'
		'apps/builder/site-builder/elements/tabs/views'
		# 'apps/builder/site-builder/elements/tabs/settings/controller'
],(App)->
	App.module 'SiteBuilderApp.Element.Tabs',(Tabs,App)->

		class Tabs.Controller extends App.SiteBuilderApp.Element.Controller

			initialize : (options)->

				_.defaults options.modelData,
					element : 'Tabs'
					columncount : 2
					elements : []
					meta_id : 0

				super options

			bindEvents : ->
				# @listenTo 
				super()

			getTabView : ->
				new Tabs.Views.TabsView
					model : @layout.model

			renderElement : ->
				@removeSpinner()

				@view = @getTabView()

				@layout.elementRegion.show @view

