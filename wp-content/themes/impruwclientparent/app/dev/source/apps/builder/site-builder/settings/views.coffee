define ['app'
		'text!apps/builder/site-builder/settings/templates/settings.html'],
		(App, settingsTpl)->


			App.module 'SiteBuilderApp.Settings.Views', (Views, App, Backbone, Marionette, $, _)->

				# settings view
				class Views.SettingView extends Marionette.ItemView

					template : settingsTpl

					className : 'modal-content settings-box'

					events:
						'click .close-settings' : (evt)-> 
										evt.preventDefault()
										App.settingsRegion.close()
							
			App.SiteBuilderApp.Settings.Views