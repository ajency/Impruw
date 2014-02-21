define ['app'
		'controllers/base-controller'
		'apps/media-manager/show/views'], (App, AppController)->

			#Login App module
			App.module "MediaManager.Show", (Show, App)->

				#Show Controller 
				class Show.Controller extends AppController

					# initialize
					initialize:()->
						@layout = @_getLayout()
						@show @layout

						#start media manager apps
						App.MediaManager.Upload.start
												region : @layout.uploadRegion
						App.MediaManager.AllMedia.start
												region : @layout.allMediaRegion

						App.getRegion('elementsBoxRegion').hide()
						
					onClose: ->
						#stop all sub apps
						App.MediaManager.Upload.stop()

						App.navigate ''
						App.getRegion('elementsBoxRegion').unhide()

					# gets the main login view
					_getLayout :(mediaCollection)->
						new Show.Views.OuterLayout
										collection : mediaCollection