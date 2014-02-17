define ['app', 'apps/builder/site-builder/elements/menu/settings/settings.html'],
		(App, settingTpl)->

			# Headerapp views
			App.module 'SiteBuilderApp.Element.Menu.Settings.Views', (Views, App, Backbone, Marionette, $, _)->

				class SettingView extends Marionette.ItemView

					template : settingsTpl

					