define ['app'
		'tpl!apps/builder/header/show/templates/mainview'],
		(App, mainviewTpl)->

			# Headerapp views
			App.module 'HeaderApp.Show.Views', (Views, App, Backbone, Marionette, $, _)->

				# Pages single view
				class SinglePageView extends Marionette.ItemView

					template : _.template ''

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

					onShow:->

						@$el.find('select#aj-imp-page-sel').selectpicker
												style 		: 'btn-mini btn-default'
												menuStyle	: 'dropdown'

				
			App.HeaderApp.Show.Views