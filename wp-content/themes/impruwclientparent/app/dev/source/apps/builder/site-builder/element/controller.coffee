
define ['app', 'controllers/builder-base-controller'
		'apps/builder/site-builder/element/views'], (App, AppController)->

			App.module 'SiteBuilderApp.Element', (Element, App, Backbone, Marionette, $, _)->

				# Controller class for showing header resion
				class Element.Controller extends AppController

					# initialize the controller. Get all required entities and show the view
					initialize:(opt = {})->

						{evt, type} 	= opt
						
						container 	= $(evt.target)

						options = 
							elementType : type
							draggable 	: true

						element = App.request "create:new:element", options

						@view = @_getView element,type

						# start listening to events
						@listenTo @view, "show:setting:popup", ->
								App.vent.trigger "show:settings:popup", element,x,y 

						@listenTo element, "element:model:fetched", @setupViews
						
						@add @view, container


					# Get view
					_getView : (elementModel, element)->
						new Element.Views.ElementView
										model : elementModel

					# show the view markup
					addElementMarkup:(view)->
						@view.$el.find('.element-markup').html view.$el
						view.render()
						view.triggerMethod "show"


			App.SiteBuilderApp.Element.Controller		