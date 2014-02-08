define ['app'
		'tpl!apps/builder/site-builder/new/templates/element'],
		(App, elementTpl)->

			# Headerapp views
			App.module 'SiteBuilderApp.NewElement.Views', (Views, App, Backbone, Marionette, $, _)->

				# Pages single view
				class Views.ElementView extends Marionette.ItemView

					template : elementTpl

					tagName : 'div'

					className : 'element-wrapper'

					# set the data-element attribute for element 
					onRender:->
						@$el.attr "data-element", @model.get('type')

				
			App.SiteBuilderApp.NewElement.Views