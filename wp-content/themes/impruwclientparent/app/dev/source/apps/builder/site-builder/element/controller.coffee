
define ['app', 'controllers/builder-base-controller'
		'apps/builder/site-builder/element/views'], (App, AppController)->

			App.module 'SiteBuilderApp.Element', (Element, App, Backbone, Marionette, $, _)->

				# Controller class for showing header resion
				class Element.Controller extends AppController

					# initialize the controller. Get all required entities and show the view
					initialize:(opt = {})->

						{evt, ui} 	= opt
	
						container 	= $(evt.target)
						type  		= ui.helper.attr 'data-element'

						# remove empty-column class if empty
						if $(evt.target).hasClass 'empty-column'
							$(evt.target).removeClass 'empty-column'

						options = 
							elementType : type
							draggable 	: true

						@element = App.request "create:new:element", options

						view = @_getView @element

						@listenTo view, "show:setting:popup", @showSettingPopup

						@listenTo view, "element:dropped", (evt, ui)->
							App.vent.trigger "element:dropped", evt, ui

						@add view, container

					# Get view
					_getView : (element)->
						new Element.Views.ElementView
												model : element

					# show settings popup for the element
					showSettingPopup:(x, y)->
						App.vent.trigger "show:settings:popup", @element,x,y 

			App.SiteBuilderApp.Element.Controller		