
define ['app', 'controllers/builder-base-controller'
		'apps/builder/site-builder/element/views'], (App, AppController)->

			App.module 'SiteBuilderApp.Element', (Element, App, Backbone, Marionette, $, _)->

				# Controller class for showing header resion
				class Element.Controller extends AppController

					# initialize the controller. Get all required entities and show the view
					initialize:(opt = {})->

						{container, type} = opt

						options = 
							element : type

						window.element = App.request "create:new:element", options

						@view = @_getView element

						# start listening to events
						@listenTo @view, "show:setting:popup", (model)->
								ele = _.slugify model.get 'element'
								App.vent.trigger "show:#{ele}:settings:popup",model

						# listen to delete element event
						@listenTo @view, "delete:element", (model)=>
												if confirm("Are you sure?")
													@deleteElement model

						App.commands.execute "when:fetched", [element], =>
									@view.triggerMethod "element:model:created"


						@add @view, $(container)


					# Get view
					_getView : (elementModel)->
						new Element.Views.ElementView
										model : elementModel

					# show the view markup
					addElementMarkup:(view)->
						#stop spinner if found
						if @view.$el.find('.element-markup > span').length > 0
							@view.$el.find('.element-markup > span').spin false

						@view.$el.find('.element-markup').empty().html view.$el
						view.render()
						view.triggerMethod "show"

					# remove the element model
					deleteElement:(model)->
						model.destroy()


			App.SiteBuilderApp.Element.Controller		