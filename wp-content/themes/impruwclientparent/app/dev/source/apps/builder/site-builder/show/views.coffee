define ['app'
		'text!apps/builder/site-builder/show/templates/maintemplate.html'
		'text!apps/builder/site-builder/show/templates/builder.html'],
		(App, mainviewTpl, builderTpl)->


			App.module 'SiteBuilderApp.Show.View', (View, App, Backbone, Marionette, $, _)->

				class View.MainView extends Marionette.Layout

					template : mainviewTpl

					className : 'aj-imp-builder-area'

					templateHelpers:(data = {})->
						data.SITEURL = SITEURL + '/'
						data.pages = @collection.toJSON()
						data

					events : 
						'click .auto-save' :(evt) -> 
								evt.preventDefault()
								App.commands.execute "auto:save"

						'change select#builder-page-sel' : (evt)-> 
							@trigger 'editable:page:changed', $(evt.target).val()

					initialize:->
						App.reqres.setHandler "get:current:editable:page:name", @getCurrentPageName
						App.reqres.setHandler "get:current:editable:page", @getCurrentPageId

					# return the name of the currently editable page
					getCurrentPageName:=>
						pageId = @getCurrentPageId()
						name = @$el.find('select#builder-page-sel').find("option[value='#{pageId}']").text()
						name

					# returns the page id of the currently selected page
					getCurrentPageId:=>
						pageId = @$el.find('select#builder-page-sel').val()
						parseInt pageId

					# trigger the editable page changed event on show
					onShow:->
						@$el.find('select#builder-page-sel').selectpicker
												style 		: 'btn-xs btn-default'
												menuStyle	: 'dropdown'	

						_.delay =>
							value = @$el.find('select#builder-page-sel').selectpicker 'val'
							@trigger 'editable:page:changed', value
						, 250


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
