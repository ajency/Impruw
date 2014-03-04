define ['app'
		'controllers/base-controller'
		'apps/slider-manager/new/newcontroller'
		'apps/slider-manager/grid/gridcontroller'], (App, AppController)->

			App.module 'SliderManager', (SliderManager, App, Backbone, Marionette, $, _)->

				# defineall routers required for the app in SliderManager.Router class
				class SliderManager.Router extends Marionette.AppRouter
					appRoutes :
						'slider-manager' : 'show'
						

				# Define the initial controller for the media-manager. this controller will 
				# be responsible for getting the initial layout, show the dialog in dialog region
				# also this controller will identify which all sub apps needs to be started
				class ShowController extends AppController

					# initialize
					initialize:(opt = {})->

						@layout = @_getLayout()
						
						@listenTo @layout, "show", =>
							App.execute "start:show:all:sliders", region : @layout.slidersGridRegion

						# listen to create new slider event from the region
						@listenTo @layout.slidersGridRegion, "create:new:slider", ->
							@layout.slidersGridRegion.hide()
							App.execute "start:create:new:slider", 
												region : @layout.newEditSliderRegion

						@listenTo @layout.newEditSliderRegion, "cancel:create:slider", ->
							@layout.slidersGridRegion.unhide()

						App.getRegion('elementsBoxRegion').hide()

						@show @layout

						
						
					onClose: ->
						# navigate back to original route. do not trigger the router 
						# only navigate
						App.navigate ''
						App.getRegion('elementsBoxRegion').unhide()

					# gets the main login view
					_getLayout :()->
						new OuterLayout
								

				# this is the outer layout for the slider manager
				# this layout contians all the region for the manager. 
				# define the region which can be later accessed with layout.{regionName} property
				# this is the main view for the dialog region. dialogOptions property is set to 
				# set the modal title
				class OuterLayout extends Marionette.Layout

					template: '<div id="slider-grid-region"></div>
								<div id="new-edit-slider"></div>'

					className : 'slider-mgr'

					regions : 
						slidersGridRegion 	: '#slider-grid-region'
						newEditSliderRegion	: '#new-edit-slider'

					dialogOptions : 
						modal_title : 'Slider Manager'

				
				#public API
				API = 
					show:()->
						new ShowController
									region 	: App.dialogRegion

					

				SliderManager.on "start", ->
					new SliderManager.Router
								controller : API	

				