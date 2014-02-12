
define ['app', 'controllers/builder-base-controller'
		'apps/builder/site-builder/element/views'], (App, AppController)->

			App.module 'SiteBuilderApp.Element', (Element, App, Backbone, Marionette, $, _)->

				# Controller class for showing header resion
				class Element.Controller extends AppController

					# initialize the controller. Get all required entities and show the view
					initialize:(opt = {})->

						{evt, ui} 	= opt
	
						sectionID 	= $(evt.target).attr 'id'
						type  		= ui.item.attr 'data-element'

						options = 
							elementType : type
							position 	: sectionID
							draggable 	: true

						@element = App.request "create:new:element", options

						view = @_getView @element

						@listenTo view, "show:setting:popup", @showSettingPopup

						@add view, $ "#"+sectionID

					# Get view
					_getView : (element)->
						new Element.Views.ElementView
												model : element

					# show settings popup for the element
					showSettingPopup:(x, y)->
						App.vent.trigger "show:settings:popup", @element,x,y 

			App.SiteBuilderApp.Element.Controller		