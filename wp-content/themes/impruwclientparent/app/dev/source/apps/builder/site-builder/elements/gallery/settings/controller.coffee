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

						# @listenTo view, 'render', =>
						# 					@region.$el.css 'top', '50%'
						# 					@region.$el.css 'left', '50%'

						@listenTo view, "element:slider_id:changed",(id)=>
														@model.set "slider_id", parseInt id

						@listenTo view, "element:draggable:changed", (draggable)=>
														@model.set "draggable", draggable	
	
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


						

