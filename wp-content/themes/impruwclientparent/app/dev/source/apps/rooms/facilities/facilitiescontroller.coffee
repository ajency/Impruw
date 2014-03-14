define ['app' 
		 'controllers/base-controller'
		 'apps/rooms/facilities/facilitiesviews'], (App , AppController)->

			App.module 'FacilitiesApp', (FacilitiesApp, App, Backbone, Marionette, $, _)->

				class FacilitiesApp.FacilitiesController extends AppController

					initialize:(opt)->
						
						# get the facilities collection
						collection = App.request "get:all:facilities"
						
							 
						# get the composite view 
						cview = @_getFacilitiesView collection

						# display the view on the region 
						@show cview,
								loading : true

					_getFacilitiesView:(collection)->
						new FacilitiesApp.Views.FacilitiesView
													collection 	: collection

				App.commands.setHandler "show:facilities", (opts) ->

					new FacilitiesApp.FacilitiesController
													region : opts.region
					





