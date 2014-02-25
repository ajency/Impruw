
define ['app', 'controllers/builder-base-controller'
		'apps/builder/site-builder/element/views'], (App, AppController)->

			App.module 'SiteBuilderApp.Element', (Element, App, Backbone, Marionette, $, _)->

				# Controller class for showing header resion
				class Element.Controller extends AppController

					# initialize the controller. Get all required entities and show the view
					initialize:(opts)->

						{container, modelData} = opts

						options = 
							draggable 		: true
							style 	  		: ''
							bottom_margin 	: ''
							top_margin 		: ''
							left_margin 	: ''
							right_margin 	: ''
											
						_.defaults modelData, options

						element = App.request "create:new:element", modelData

						# define the element layout view
						@layout = @_getView element

						# listen to shoiw settings popup event from view
						@listenTo @layout, "show:setting:popup", (model)->
								ele = _.slugify model.get 'element'
								App.vent.trigger "show:#{ele}:settings:popup",model

						# listen to delete element event
						@listenTo @layout, "delete:element", (model)=>
												if confirm("Are you sure?")
													@deleteElement model

						@listenTo @layout, "bind:element:events", @bindEvents

						# register to element model destroy event.
						# close the layout (i.e element)
						@listenTo element, "destroy", => @layout.close()

						@layout.elementRegion.on "show",(view)=>
								model = Marionette.getOption @layout, 'model'
								for margin in ['top_margin','left_margin','right_margin','bottom_margin']
									@layout.setMargin model.get margin

						if element.isNew()
							App.execute "when:fetched", element, =>
														@layout.triggerMethod "before:render:element"
														@renderElement()
							
						# add the element to container
						@add @layout, $(container)

						
					bindEvents:->
						@listenTo @layout.model, "change:draggable", @setDraggable
						@listenTo @layout.model, "change:top_margin", @setMargin
						@listenTo @layout.model, "change:bottom_margin",@setMargin
						@listenTo @layout.model, "change:left_margin",@setMargin
						@listenTo @layout.model, "change:right_margin",@setMargin
						
					# set draggable
					setDraggable:(model)=>
						@layout.setDraggable model.get 'draggable'

					# set draggable
					setMargin:(model)=>
						prop = _.chain(_.keys(model.changed)).first().value()
						prevMargin = model.previous prop
						@layout.setMargin model.get(prop),prevMargin

					# Get view
					_getView : (elementModel)->
						new Element.Views.ElementView
										model : elementModel

					# show the view markup
					removeSpinner:()->
						#stop spinner if found
						if @layout.$el.find('.element-markup > span').length > 0
							@layout.$el.find('.element-markup > span').spin false


					# remove the element model
					deleteElement:(model)->
						model.destroy 
								wait : true


			App.SiteBuilderApp.Element.Controller		