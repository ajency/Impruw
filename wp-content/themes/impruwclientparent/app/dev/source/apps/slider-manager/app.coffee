define ['app'
		'controllers/base-controller'
		'apps/slider-manager/new/newcontroller'
		'apps/slider-manager/edit-slider/editcontroller'
		'apps/slider-manager/grid/gridcontroller'], (App, AppController)->

			App.module 'SliderManager', (SliderManager, App, Backbone, Marionette, $, _)->

				# defineall routers required for the app in SliderManager.Router class
				class SliderManager.Router extends Marionette.AppRouter
					appRoutes :
						'slider-manager' : 'show'
						'slider-manager/edit/:id' : 'edit'
						

				# Define the main controller for the slider-manager. this controller will 
				# be responsible for getting the initial layout, show the dialog in dialog region
				# also this controller will identify which all sub apps needs to be started
				class SliderManagerController extends AppController

					# initialize
					initialize:(opt = {})->

						# hold reference to the global slider collection
						@sliderCollection = App.request "get:sliders"

						# get the main layout for slider manager app. Will have only one region
						@layout = @_getLayout()	

						# start liseting to events coming out from the layout main region.
						# and start the necesarry app
						# events are :
						#   'create:new:slider' => ./new
						#   'edit:slider', id   => ./edit
						#   'slider:deleted', slider => ./

						@listenTo @_getSliderManagerRegion(),"create:new:slider", =>
								@_startCreateSliderApp()
						
						@listenTo @_getSliderManagerRegion(),"edit:slider",(id)=>
								@_startEditSliderApp id

						@listenTo @_getSliderManagerRegion(),"cancel:create:slider cancel:edit:slider", =>
							@_startGridApp()

						# listen to "show" event of the main layout and start the grid app
						@listenTo @layout, "show", =>
							if opt.sliderId then id = opt.sliderId 
							@_startEditSliderApp id	

						# show the main layout
						@show @layout

					# function to return the main layout for the slider manager
					_getLayout:->
						new OuterLayout()

					# helper function to get the main region for slider manager
					_getSliderManagerRegion:->
						@layout.sliderManagerRegion

					# start the grid app to display the list of available sliders
					# this will accept the slider collection to display which is help by this 
					# controller
					_startGridApp:->
						App.execute "show:sliders:grid", 
											collection : @sliderCollection
											region :  @_getSliderManagerRegion()


					# start the create slider app
					# will pick the main region of layout and start
					_startCreateSliderApp:->
						App.execute "show:create:new:slider", 
											region :  @_getSliderManagerRegion()							

					# start the edit slider app
					_startEditSliderApp:(id)->
						App.execute "show:edit:slider", 
											sliderId : id
											region :  @_getSliderManagerRegion()

					onClose:->
						App.navigate ''



							
				# this is the outer layout for the slider manager
				# this layout contians all the region for the manager. 
				# define the region which can be later accessed with layout.{regionName} property
				# this is the main view for the dialog region. dialogOptions property is set to 
				# set the modal title
				class OuterLayout extends Marionette.Layout

					template: '<div id="slider-manager-region"></div>'

					className : 'slider-mgr'

					regions : 
						sliderManagerRegion : '#slider-manager-region'
						
					dialogOptions : 
						modal_title : 'Slider Manager'

				
				#public API
				API = 
					show:()->
						new SliderManagerController
									region 	: App.dialogRegion

					edit:(id)->
						new SliderManagerController
									region 	 : App.dialogRegion
									sliderId : id
					

				SliderManager.on "start", ->
					new SliderManager.Router
								controller : API	

				