define ['app'
		'text!apps/builder/site-builder/show/templates/maintemplate.html'],
		(App, mainviewTpl)->


			App.module 'SiteBuilderApp.Show.View', (View, App, Backbone, Marionette, $, _)->

				class View.MainView extends Marionette.CompositeView

					template : mainviewTpl

					className : 'aj-imp-builder-area'

					events : 
						'click .auto-save' :(evt) -> 
								evt.preventDefault()
								App.commands.execute "auto:save"

					onShow:->
						@$el.find('.droppable-column').sortable
												revert 		: 'invalid'
												items 		: '> .element-wrapper'
												connectWith : '.droppable-column,.column'
												start: (e, ui)->
        											ui.placeholder.height ui.item.height()
												#handle 		: '.aj-imp-drag-handle'
												helper 		: 'clone'
												opacity		: .65
												receive		: (evt, ui)=> 
													# trigger drop event if ui.item is Li tag
													if ui.item.prop("tagName") is 'LI'
														@trigger "element:dropped", $(evt.target), ui
												
			return App.SiteBuilderApp.Show.View