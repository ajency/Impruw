define ['app','controllers/base-controller','apps/builder/site-builder/elements/roomsummary/settings/views'],
		(App, AppController)->

			App.module 'SiteBuilderApp.Element.RoomSummary.Settings', (Settings, App, Backbone, Marionette, $, _)->

				# menu controller
				class Settings.Controller extends AppController

					# initialize controller
					initialize:(opt ={})->
						{ @model } = opt
						@region = App.settingsRegion
						model  = App.request "get:element:settings:options", 'RoomSummary'
						view = @_getSettingView model,@model

						@listenTo view, 'render', =>
											@region.$el.css 'top',200
											@region.$el.css 'left',400

						@listenTo view, "element:style:changed",(style)=>
														@model.set "style", style

						@listenTo view, "element:draggable:changed", (draggable)=>
														@model.set "draggable", draggable	
	
						@listenTo view, "element:spacing:changed",(spacing, value)=>
																@model.set spacing, value

						@listenTo view, "element:selection:changed",(room_id)=>
														#console.log room_id
														@model.set "room_id", room_id

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


				App.vent.on "show:roomsummary:settings:popup", (model)->
										new Settings.Controller
														model : model


						

