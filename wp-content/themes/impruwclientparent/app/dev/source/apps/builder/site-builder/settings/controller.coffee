
define ['app', 'controllers/base-controller'
		'apps/builder/site-builder/settings/views'], (App, AppController)->

			App.module 'SiteBuilderApp.Settings', (Settings, App, Backbone, Marionette, $, _)->

				# Controller class for showing header resion
				class Settings.Controller extends AppController

					# initialize the controller. Get all required entities and show the view
					initialize:(opt = {})->

						{ model, x, y } = opt

						elementBoxModel = App.request "get:collection:model", 'elementbox', model.get 'element'

						view = new Settings.Views.SettingView
													model : elementBoxModel
													viewModel : model	

						@listenTo view, 'render', =>
											@region.$el.css 'top',x
											@region.$el.css 'left',y												

						@show  view


			App.SiteBuilderApp.Settings.Controller		