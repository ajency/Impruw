define ['app'
		'text!apps/builder/header/show/templates/mainview.html'],
		(App, mainviewTpl)->

			# Headerapp views
			App.module 'HeaderApp.Show.Views', (Views, App, Backbone, Marionette, $, _)->

				# Pages single view
				class SinglePageView extends Marionette.ItemView

					template : ''

					tagName : 'option'

					onRender:->
						@$el.attr 'value',@model.get 'ID'
						@$el.text @model.get 'post_title'

				# Header main view
				class Views.MainView extends Marionette.CompositeView

					itemView : SinglePageView

					itemViewContainer : 'select#aj-imp-page-sel'

					template : mainviewTpl

					className : 'navbar navbar-default'

					events:
						'change select#aj-imp-page-sel' : (evt)-> 
									@trigger 'editable:page:changed', $(evt.target).val()

						'click .add-new-page' : ->
							@trigger "add:new:page:clicked"

					onShow:->
						@$el.find('select#aj-imp-page-sel').val App.request "get:current:editable:page"
						@$el.find('select#aj-imp-page-sel').selectpicker
												style 		: 'btn-mini btn-default'
												menuStyle	: 'dropdown'

					setHomePage:->
						@$el.find('select#aj-imp-page-sel').selectpicker 'val', 10

				
			App.HeaderApp.Show.Views