define ['app'
		'text!apps/builder/site-builder/show/templates/maintemplate.html'
		'text!apps/builder/site-builder/show/templates/builder.html'],
		(App, mainviewTpl, builderTpl)->


			App.module 'SiteBuilderApp.Show.View', (View, App, Backbone, Marionette, $, _)->

				class View.MainView extends Marionette.Layout

					template : mainviewTpl

					className : 'aj-imp-builder-area'

					templateHelpers:(data = {})->
						data.SITEURL = SITEURL
						data

					events : 
						'click .auto-save' :(evt) -> 
								evt.preventDefault()
								App.commands.execute "auto:save"	


				class View.Builder extends Marionette.ItemView

					template: builderTpl

					onShow:->
						@$el.find('.droppable-column').sortable
												revert 		: 'invalid'
												items 		: '> .element-wrapper'
												connectWith : '.droppable-column,.column'
												start 		: (e, ui)->
																w = ui.item.width()
																h = if ui.item.height() > 200 then 200 else ui.item.height()
																ui.placeholder.height h
																window.dragging = true
																return
												stop 		:(e, ui)-> 
																window.dragging = false
																return
												handle 		: '.aj-imp-drag-handle'
												helper 		: 'clone'
												opacity		: .65
												tolerance	: 'pointer'
												receive		: @elementDropped

					elementDropped:(evt, ui)=> 
						# trigger drop event if ui.item is Li tag
						if ui.item.prop("tagName") is 'LI'
							type  = ui.item.attr 'data-element'
							metaId = ui.item.attr 'data-meta-id'
							metaId = if metaId isnt undefined then parseInt(metaId) else 0
							@trigger "add:new:element", $(evt.target), type, metaId
