define ['app'
		'text!apps/builder/header/show/templates/mainview.html'],
		(App, mainviewTpl)->

			# Headerapp views
			App.module 'HeaderApp.Show.Views', (Views, App, Backbone, Marionette, $, _)->

				# Header main view
				class Views.MainView extends Marionette.Layout

					template : mainviewTpl

					className : 'navbar navbar-default'

					serializeData:->
						data = super()

						data.LOGOUTURL = LOGOUTURL
						data.DASHBOARDURL = DASHBOARDURL

						data

					events:

						'click #aj-imp-color-sel' :->
							@trigger "show:theme:color:clicked"		

					onPageTookOver : ->
			            @$el.find('.hide-on-lock').fadeOut()

			         onPageReleased : ->
			           @$el.find('.hide-on-lock').fadeIn()			





				


