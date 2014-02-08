define ['app'
		'tpl!apps/builder/site-builder/show/templates/maintemplate'],
		(App, mainviewTpl)->


			App.module 'SiteBuilderApp.Show.View', (View, App, Backbone, Marionette, $, _)->

				class View.MainView extends Marionette.CompositeView

					template : mainviewTpl

					className : 'aj-imp-builder-area'

					onShow:->
						@$el.find('.droppable-column').sortable
												revert 		: 'invalid'
												items 		: '> .element-wrapper'
												connectWith : '.droppable-column'
												helper 		: 'clone'
												opacity		: .65
												receive 	: (evt, ui)=> @trigger "element:dropped", evt, ui
												
			return App.SiteBuilderApp.Show.View