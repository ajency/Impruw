define ['app','controllers/base-controller','apps/builder/site-builder/elements/menu/settings/views'],
		(App, AppController)->

			App.module 'SiteBuilderApp.Element.Menu.Settings', (Settings, App, Backbone, Marionette, $, _)->

				# menu controller
				class Settings.Controller extends AppController

					# initialize controller
					initialize:(opt ={})->
						{ model } = opt
						@region = App.settingsRegion
						config  = App.request "get:element:settings:options", 'Menu'
						view = @_getSettingView model, config

						@listenTo view, 'render', =>
											@region.$el.css 'top',200
											@region.$el.css 'left',200

						@listenTo view, "element:style:changed",(style)=>
														model.set "style", style

						@listenTo view, "element:alignment:changed",(align)=>
														model.set "align", align	

						@show view

					# get settigns view
					_getSettingView:(model, config)->
						new Settings.Views.SettingsView
												model : model
												config: config


				App.vent.on "show:menu:settings:popup", (model)->
					new Settings.Controller
									model : model


						

