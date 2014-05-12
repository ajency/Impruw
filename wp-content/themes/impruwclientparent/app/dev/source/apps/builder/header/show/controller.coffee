
define ['app', 'controllers/base-controller'
		'apps/builder/header/show/views'], (App, AppController)->

			App.module 'HeaderApp.Show', (Show, App, Backbone, Marionette, $, _)->

				# Controller class for showing header resion
				class Show.Controller extends AppController

					# initialize the controller. Get all required entities and show the view
					initialize:(opt = {})->

						@layout = @getLayout()

						@listenTo @layout, "add:new:page:clicked", ->
							App.execute "show:add:new:page", region : App.dialogRegion
						
						#change theme color click
						@listenTo @layout ,"show:theme:color:clicked",->

							App.execute "show:theme:color:set", region : App.dialogRegion
							
						
						@listenTo @layout, "get:theme:set:colors", ->
							
							themeColorCollection = App.request "get:themes:color:collection"

							App.execute "when:fetched", [themeColorCollection], =>
									@layout.triggerMethod "add:theme:color:sets", themeColorCollection

						@listenTo  @layout,"change:theme:color", @changeThemeColor
						
						@show  @layout,
								loading:true

					getLayout :->
						new Show.Views.MainView
					
					changeThemeColor :(model)->
						
						formdata = model.toJSON()
						
						options =
							url: AJAXURL,
							method: 'POST',
							data:
								action: 'change-theme-color'
								formdata: formdata
						
						$.ajax(options).done (response)->
							window.location.reload(true)
						.fail (resp)->
							console.log 'error' 



								
