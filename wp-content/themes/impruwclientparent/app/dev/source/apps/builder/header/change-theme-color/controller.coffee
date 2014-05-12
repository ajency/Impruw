
define ['app', 'controllers/base-controller'
		'apps/builder/header/change-theme-color/views'], (App, AppController)->

			App.module 'ChangeThemeColorApp', (ChangeThemeColorApp, App, Backbone, Marionette, $, _)->

				# Controller class for showing header resion
				class ChangeThemeColorController extends AppController

					# initialize the controller. Get all required entities and show the view
					initialize:(opt = {})->

						@layout = @getLayout()


						@listenTo @layout, "show", @showColorSet
					
						
						@show  @layout,
								loading:true


					getLayout :->
						new ChangeThemeColorLayout
					
					showColorSet :->

						themeColorCollection = App.request "get:themes:color:collection"

						@themeColorSetView  = @getView themeColorCollection

						@listenTo @themeColorSetView,"itemview:change:theme:color", @changeThemeColorClick

						@layout.themecolorsetRegion.show @themeColorSetView 
					

					getView :(themeColorCollection)->
						new ChangeThemeColorApp.Views.ThemeColorSetView
								collection: themeColorCollection
					
					changeThemeColorClick :(iv,model)->
						
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



				class ChangeThemeColorLayout extends Marionette.Layout

					template : '<div id="theme-color-set"></div>'

					dialogOptions : 
						modal_title : 'Choose Colors for Your Theme'
						modal_size : 'medium-modal'
					
					regions :
						themecolorsetRegion : '#theme-color-set' 

			
				App.commands.setHandler "show:theme:color:set",(opts)->
					new ChangeThemeColorController opts
					



								
