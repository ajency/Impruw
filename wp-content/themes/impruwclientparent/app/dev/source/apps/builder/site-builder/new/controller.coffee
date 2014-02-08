
define ['app', 'controllers/builder-base-controller'
		'apps/builder/site-builder/new/views'], (App, AppController)->

			App.module 'SiteBuilderApp.NewElement', (NewElement, App, Backbone, Marionette, $, _)->

				# Controller class for showing header resion
				class NewElement.Controller extends AppController

					# initialize the controller. Get all required entities and show the view
					initialize:(opt = {})->

						{evt, ui} 	= opt
	
						sectionID 	= $(evt.target).attr 'id'
						type  		= ui.item.attr 'data-element'

						options = 
							type 		: type
							position 	: sectionID
							draggable 	: true
							parent 		: 0

						element = App.request "create:new:element", options

						view = @_getView element

						@add view, $ "#"+sectionID

					# get view
					_getView : (element)->
						new NewElement.Views.ElementView
												model : element


			App.SiteBuilderApp.NewElement.Controller		