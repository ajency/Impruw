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
						view = @_getSettingView config

						@listenTo view, 'render', =>
											@region.$el.css 'top',200
											@region.$el.css 'left',400

						@listenTo view, "element:style:changed",(style)=>
														@model.set "style", style

						@listenTo view, "element:draggable:changed", (draggable)=>
														@model.set "draggable", draggable	

						@listenTo view, "element:column:count:changed",(newCount)=>
														@model.set "columncount", newCount

						@show view


					# get settigns view
					_getSettingView:(config)->
						new Settings.Views.SettingsView
												model : config


				App.vent.on "show:row:settings:popup", (model)->
					new Settings.Controller
									model : model


						

