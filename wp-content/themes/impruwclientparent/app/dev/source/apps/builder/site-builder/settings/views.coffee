define ['app'
		'tpl!apps/builder/site-builder/settings/templates/settings'],
		(App, settingsTpl)->


			App.module 'SiteBuilderApp.Settings.Views', (Views, App, Backbone, Marionette, $, _)->

				# settings view
				class Views.SettingView extends Marionette.ItemView

					template : settingsTpl
							
			App.SiteBuilderApp.Settings.Views