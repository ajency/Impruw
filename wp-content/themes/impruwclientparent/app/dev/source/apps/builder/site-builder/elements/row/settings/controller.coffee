define ['app','controllers/base-controller','apps/builder/site-builder/elements/row/settings/views'],
		(App, AppController)->

			App.module 'SiteBuilderApp.Element.Row.Settings', (Settings, App, Backbone, Marionette, $, _)->

				# menu controller
				class Settings.Controller extends AppController

					# initialize controller
					initialize:(opt ={})->
						{ @model } = opt
						@region = App.settingsRegion
						config  = App.request "get:element:settings:options", 'Row'
						view = @_getSettingView @model, config

						@listenTo view, 'render', =>
											@region.$el.css 'top',200
											@region.$el.css 'left',400

						@listenTo view, "element:style:changed",(style)=>
														@model.set "style", style
														console.log @model

						@listenTo view, "element:draggable:changed", (draggable)=>
														@model.set "draggable", draggable	

						@show view


					# get settigns view
					_getSettingView:(model, config)->
						new Settings.Views.SettingsView
												model : model
												config: config


				App.vent.on "show:row:settings:popup", (model)->
					new Settings.Controller
									model : model


						

