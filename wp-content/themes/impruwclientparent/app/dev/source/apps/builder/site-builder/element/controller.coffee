
define ['app', 'controllers/builder-base-controller'
		'apps/builder/site-builder/element/views'], (App, AppController)->

			App.module 'SiteBuilderApp.Element', (Element, App, Backbone, Marionette, $, _)->

				# Controller class for showing header resion
				class Element.Controller extends AppController

					# initialize the controller. Get all required entities and show the view
					initialize:(opts)->

						{container, type, modelData} = opts

						options = 
							element : type
						
						_.defaults options, modelData

						element = App.request "create:new:element", options

						@layout = @_getView element

						# start listening to events
						@listenTo @layout, "show:setting:popup", (model)->
								ele = _.slugify model.get 'element'
								App.vent.trigger "show:#{ele}:settings:popup",model

						# listen to delete element event
						@listenTo @layout, "delete:element", (model)=>
												if confirm("Are you sure?")
													@deleteElement model

						@listenTo element, "destroy", => @layout.close()

						App.commands.execute "when:fetched", [element], =>
									@layout.triggerMethod "element:model:created"

						@add @layout, $(container)


					# Get view
					_getView : (elementModel)->
						new Element.Views.ElementView
										model : elementModel

					# show the view markup
					removeSpinner:()->
						#stop spinner if found
						if@layout.$el.find('.element-markup > span').length > 0
							@layout.$el.find('.element-markup > span').spin false


					# remove the element model
					deleteElement:(model)->
						model.destroy 
									wait : true


			App.SiteBuilderApp.Element.Controller		