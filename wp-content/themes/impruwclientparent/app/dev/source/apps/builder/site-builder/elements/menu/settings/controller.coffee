define ['app','controllers/base-controller','apps/builder/site-builder/elements/menu/settings/views'],
		(App, AppController)->

			App.module 'SiteBuilderApp.Element.Menu.Settings', (Settings, App, Backbone, Marionette, $, _)->

				# menu controller
				class Settings.Controller extends AppController

					# initialize controller
					initialize:(opt ={})->
						{ @model } = opt
						@region = App.settingsRegion

						model  = App.request "get:element:settings:options", 'Menu'
						
						view = @_getSettingView model,@model

						@listenTo view, 'render', =>
											@region.$el.css 'top',200
											@region.$el.css 'left',400

						@listenTo view, "element:style:changed",(style)=>
														@model.set "style", style

						@listenTo view, "element:menu:changed",(menuId)=>
														@model.set "menu_id", menuId

						@listenTo view, "element:draggable:changed", (draggable)=>
														@model.set "draggable", draggable	

						@listenTo view, "element:justified:changed", (justified)=>
														@model.set "justified", justified	

						@show view

					# time to save model to server
					onClose:->
						return if not @model.hasChanged()
						
						@model.save null,
								wait : true

					# get settigns view
					_getSettingView:(model,eleModel)->
						new Settings.Views.SettingsView
												eleModel : eleModel
												model 	 : model


				App.vent.on "show:menu:settings:popup", (model)->
					new Settings.Controller
									model : model


						

