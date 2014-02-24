define ['app','controllers/base-controller','apps/builder/site-builder/elements/logo/settings/views'],
		(App, AppController)->

			App.module 'SiteBuilderApp.Element.Logo.Settings', (Settings, App, Backbone, Marionette, $, _)->

				# menu controller
				class Settings.Controller extends AppController

					# initialize controller
					initialize:(opt ={})->
						{ @model } = opt
						@region = App.settingsRegion
						model  = App.request "get:element:settings:options", 'Logo'
						view = @_getSettingView model,@model

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
					_getSettingView:(model,eleModel)->
						new Settings.Views.SettingsView
												eleModel : eleModel
												model 	 : model

					# time to save model to server
					onClose:->
						return if not @model.hasChanged()
						
						@model.save null,
								wait : true


				App.vent.on "show:logo:settings:popup", (model)->
					new Settings.Controller
									model : model


						

