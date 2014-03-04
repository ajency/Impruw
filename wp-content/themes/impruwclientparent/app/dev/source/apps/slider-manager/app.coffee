define ['app'
		'controllers/base-controller'
		'text!apps/slider-manager/templates/outer.html'], (App, AppController, outerTpl)->

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

						# create an empty collection which will hold the selected images
						@selectedMediaCollection = App.request "get:empty:media:collection"

						@layout = @_getLayout()
						@show @layout

						# start media manager apps. conditional strating of apps is possible
						# each app needs a region as the argument. Each app will be functional only
						# for that region
						App.Media.Upload.start region : @layout.uploadRegion
						App.Media.Grid.start region : @layout.gridRegion
						App.Media.Selected.start 
										region : @layout.selectedMediaRegion
										collection : @selectedMediaCollection

						@listenTo @layout.gridRegion, "media:element:clicked",(media)=>
																	@selectedMediaCollection.add media


						App.getRegion('elementsBoxRegion').hide()
						
					onClose: ->
						#stop all sub apps
						App.Media.Upload.stop()
						App.Media.Grid.stop()
						

						# navigate back to original route. do not trigger the router 
						# only navigate
						App.navigate ''
						App.getRegion('elementsBoxRegion').unhide()

					# gets the main login view
					_getLayout :()->
						new OuterLayout
								

				# this is the outer layout for the media manager
				# this layout contians all the region for the manager. 
				# define the region which can be later accessed with layout.{regionName} property
				# this is the main view for the dialog region. dialogOptions property is set to 
				# set the modal title
				class OuterLayout extends Marionette.Layout

					template: outerTpl

					regions : 
						uploadRegion 		: '#upload-region'
						gridRegion			: '#grid-region'
						selectedMediaRegion : '#selected-media-region'

					dialogOptions : 
						modal_title : 'Slider Manager'

					events: 
						'click button.media-manager-select' : ->
												@trigger "media:selected"

				
				#public API
				API = 
					show:()->
						new ShowController
									region 	: App.dialogRegion
									statApp : 'all-media'

					editMedia:(model, region)->
						


				SliderManager.on "start", ->
					new SliderManager.Router
								controller : API	

				