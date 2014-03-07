define ['app','controllers/base-controller','apps/builder/site-builder/elements/gallery/settings/views'],
		(App, AppController)->

			App.module 'SiteBuilderApp.Element.Gallery.Settings', (Settings, App, Backbone, Marionette, $, _)->

				# menu controller
				class Settings.Controller extends AppController

					# initialize controller
					initialize:(opt ={})->
						{ @model } = opt
						@region = App.settingsRegion
						model  = App.request "get:element:settings:options", 'Gallery'
						view = @_getSettingView model,@model

						@listenTo view, 'render', =>
											@region.$el.css 'top',200
											@region.$el.css 'left',400

						@listenTo view, "element:gallery_id:changed",(id)=>
														@model.set "gallery_id", parseInt id

						@listenTo view, "element:no_of_columns:changed",(count)=>
														@model.set "no_of_columns", parseInt count

						@listenTo view, "element:draggable:changed", (draggable)=>
														@model.set "draggable", draggable	
	
						@listenTo view, "element:spacing:changed",(spacing, value)=>
																@model.set spacing, value

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


				App.vent.on "show:gallery:settings:popup", (model)->
										new Settings.Controller
														model : model


						

